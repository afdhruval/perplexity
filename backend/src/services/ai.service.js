import { initChatModel } from "langchain";
import { HumanMessage } from "langchain";

process.env.GOOGLE_API_KEY = "AIzaSyDj2yJ0wFxEQYmzlcV - VY_vAN7V6r78QNE"

const model = await initChatModel("google-genai:gemini-2.5-flash-lite");

export async function generateMessage(message) {

    const response = await model.invoke([
        new HumanMessage(message)
    ])

    return response.text
}