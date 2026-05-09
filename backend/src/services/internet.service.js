import { tavily } from "@tavily/core";
import "dotenv/config";

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

/**
 * Search the internet using Tavily.
 * Returns up to 4 results with trimmed content for low latency.
 */
export const searchInternet = async (query) => {
    return await tvly.search(query, {
        maxResults: 4,
        searchDepth: "basic",
        includeAnswer: false,
    });
};