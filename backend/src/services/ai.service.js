import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const getModelInstance = (modelId) => {
    try {
        if (modelId.includes('gemini')) {
            // Using "model" and "apiKey" which is standard for recent @langchain/google-genai
            return new ChatGoogleGenerativeAI({
                model: modelId.includes('flash') ? "gemini-1.5-flash" : "gemini-1.5-pro",
                apiKey: process.env.GOOGLE_API_KEY,
                maxOutputTokens: 2048,
            });
        } else if (modelId.includes('mistral')) {
            return new ChatMistralAI({
                model: modelId === 'mistral-small' ? 'mistral-small-latest' : 'mistral-large-latest',
                apiKey: process.env.MISTRAL_API_KEY,
            });
        } else if (modelId.includes('gpt')) {
            return new ChatOpenAI({
                model: modelId,
                apiKey: process.env.OPENAI_API_KEY
            });
        }
    } catch (e) {
        console.error(`Error initializing model ${modelId}:`, e.message);
    }
    
    // Default safe fallback
    return new ChatGoogleGenerativeAI({
        model: "gemini-1.5-flash",
        apiKey: process.env.GOOGLE_API_KEY,
    });
};

export async function generateMessage(messages, modelId = 'gemini-1.5-flash') {
    try {
        console.log(`Starting generation with model: ${modelId}`);
        const model = getModelInstance(modelId);
        
        // System prompt for premium styling
        const systemPrompt = new SystemMessage("You are COREOS AI... a premium discovery assistant. Provide clear, well-spaced, and friendly answers with emojis. Format with clean markdown.");
        
        const chatMessages = [
            systemPrompt,
            ...messages.map(msg => {
                const content = msg.content || "";
                if (msg.role === "user") return new HumanMessage(content);
                if (msg.role === "ai" || msg.role === "assistant") return new AIMessage(content);
                return new HumanMessage(content);
            })
        ];

        const response = await model.invoke(chatMessages);
        
        let content = response.content;
        if (Array.isArray(content)) {
            content = content.map(c => c.text || JSON.stringify(c)).join("");
        }

        return content || "No content generated.";

    } catch (error) {
        console.error(`⚠ Primary AI (${modelId}) failed:`, error.message);
        
        // Final Fallback attempts
        try {
            console.log("Applying final fallback (Gemini Flash)...");
            const fallbackModel = new ChatGoogleGenerativeAI({
                model: "gemini-1.5-flash",
                apiKey: process.env.GOOGLE_API_KEY,
            });
            const chatMessages = messages.map(m => new HumanMessage(m.content || ""));
            const fallbackResponse = await fallbackModel.invoke(chatMessages);
            return fallbackResponse.content;
        } catch (err) {
            console.error("🔥 Universal AI failure:", err.message);
            return "This model is out of chat, use our latest models like Mistral and Gemini ✨";
        }
    }
}

export async function generateChattitle(message) {
    try {
        const model = getModelInstance('mistral-small');
        const response = await model.invoke([
            new SystemMessage("Summarize the following message in 2-4 words for a chat title. Return ONLY the title."),
            new HumanMessage(message || "New Conversation")
        ]);
        return response.content.toString().replace(/["']/g, '');
    } catch (err) {
        return "Untitled Exploration";
    }
}