import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { searchInternet } from "./internet.service.js";
const getModelInstance = (modelId) => {
  try {
    if (modelId.includes("gemini")) {
      return new ChatGoogleGenerativeAI({
        model:
          modelId === "gemini-3-flash-preview"
            ? "gemini-3-flash-preview"
            : "gemini-flash-latest",
        apiKey: process.env.GOOGLE_API_KEY,
        maxOutputTokens: 1000,
      });
    } else if (modelId.includes("mistral")) {
      return new ChatMistralAI({
        model:
          modelId === "mistral-small"
            ? "mistral-small-latest"
            : "mistral-large-latest",
        apiKey: process.env.MISTRAL_API_KEY,
      });
    } else if (modelId.includes("gpt")) {
      return new ChatOpenAI({
        model: modelId,
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  } catch (e) {
    console.error(`Error initializing model ${modelId}:`, e.message);
  }

  return new ChatGoogleGenerativeAI({
    model: "gemini-3-flash-preview",
    apiKey: process.env.GOOGLE_API_KEY,
  });
};

export async function generateMessage(messages, modelId = "gemini-3-flash-preview") {
  try {
    const userQuery = messages[messages.length - 1]?.content || "";

    let searchData = "";

    // 🔥 Detect real-time queries
    if (
      userQuery.toLowerCase().includes("latest") ||
      userQuery.toLowerCase().includes("today") ||
      userQuery.toLowerCase().includes("current")
    ) {
      const result = await searchInternet(userQuery);

      // convert to readable text
      searchData = result.results
        .map((r) => `Title: ${r.title}\nContent: ${r.content}`)
        .join("\n\n");
    }

    const model = getModelInstance(modelId);

    const systemPrompt = new SystemMessage(`
You are COROS, a real-time assistant.

IMPORTANT:
- If search data is provided, answer ONLY using that
- Do NOT use old knowledge
- If data is missing, say you don't have latest info
`);

    const finalMessages = [
      systemPrompt,
      ...(searchData ? [new SystemMessage(`Latest Data:\n${searchData}`)] : []),
      ...messages.map((msg) => {
        if (msg.role === "user") return new HumanMessage(msg.content);
        return new AIMessage(msg.content);
      }),
    ];

    const response = await model.invoke(finalMessages);

    return response.content;
  } catch (error) {
    // Catch error instead of immediately returning
    console.error("Primary model failed, attempting fallback...");

    // Final Fallback attempts
    try {
      console.log("Applying final fallback (Gemini Flash)...");
      const fallbackModel = new ChatGoogleGenerativeAI({
        model: "gemini-3-flash-preview",
        apiKey: process.env.GOOGLE_API_KEY,
      });
      const chatMessages = messages.map(
        (m) => new HumanMessage(m.content || ""),
      );
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
    const model = getModelInstance("mistral-small");
    const response = await model.invoke([
      new SystemMessage(
        "Summarize the following message in 2-4 words for a chat title. Return ONLY the title.",
      ),
      new HumanMessage(message || "New Conversation"),
    ]);
    return response.content.toString().replace(/["']/g, "");
  } catch (err) {
    return "Untitled Exploration";
  }
}
