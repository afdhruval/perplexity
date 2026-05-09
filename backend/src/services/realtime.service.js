import "dotenv/config";

// ─────────────────────────────────────────────
//  QUERY CLASSIFIER
//  Returns one of: CRICKET | CRYPTO | REALTIME | GENERAL | CODING | CASUAL
// ─────────────────────────────────────────────

const CRICKET_KEYWORDS = [
  "ipl", "cricket", "live score", "scorecard", "csk", "mi ", " mi", "rcb",
  "gt ", " gt", "srh", "kkr", "dc ", " dc", "pbks", "lsg", "rr ",
  "t20", "test match", "odi", "match score", "innings", "wicket",
  "runs scored", "bowling", "batting", "cricbuzz", "recent match", "upcoming match",
];

const CRYPTO_KEYWORDS = [
  "bitcoin", "ethereum", "solana", "crypto", " btc", "btc ", "eth ", " eth",
  "token price", "crypto market", "coin price", "dogecoin", "matic",
  "binance", "chainlink", "litecoin", "xrp", "ripple", "avalanche",
  "defi", "nft price", "staking", "crypto portfolio",
];

const REALTIME_KEYWORDS = [
  "latest", "today", "current", "right now", "live", "breaking",
  "yesterday", "this week", "news", "update", "price", "score",
  "stock", "weather", "forecast", "trending", "recently",
];

const CODING_KEYWORDS = [
  "code", "function", "algorithm", "debug", "error", "bug", "class",
  "variable", "loop", "array", "object", "api", "react", "node",
  "javascript", "python", "css", "html", "typescript", "sql", "regex",
  "recursion", "component", "hook", "flexbox", "grid",
];

export function classifyQuery(query) {
  const q = query.toLowerCase();

  if (CRICKET_KEYWORDS.some((kw) => q.includes(kw))) return "CRICKET";
  if (CRYPTO_KEYWORDS.some((kw) => q.includes(kw))) return "CRYPTO";
  if (CODING_KEYWORDS.some((kw) => q.includes(kw))) return "CODING";
  if (REALTIME_KEYWORDS.some((kw) => q.includes(kw))) return "REALTIME";

  // Short casual messages (≤ 8 words) with no special signals
  const wordCount = q.trim().split(/\s+/).length;
  if (wordCount <= 8) return "CASUAL";

  return "GENERAL";
}

// ─────────────────────────────────────────────
//  CRICKET API  (Cricbuzz via RapidAPI)
// ─────────────────────────────────────────────

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const CRICBUZZ_HOST = "cricbuzz-cricket.p.rapidapi.com";

async function cricbuzzFetch(endpoint) {
  const url = `https://${CRICBUZZ_HOST}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "x-rapidapi-host": CRICBUZZ_HOST,
      "x-rapidapi-key": RAPIDAPI_KEY,
    },
  });
  if (!res.ok) throw new Error(`Cricbuzz ${res.status}: ${res.statusText}`);
  return res.json();
}

/**
 * Detect what kind of cricket data to fetch based on the query.
 * Returns structured, human-readable cricket data string.
 */
export async function getCricketData(query) {
  const q = query.toLowerCase();

  try {
    let data;
    let endpoint;

    if (q.includes("live") || q.includes("live score") || q.includes("playing")) {
      endpoint = "/matches/v1/live";
    } else if (
      q.includes("recent") ||
      q.includes("yesterday") ||
      q.includes("last match") ||
      q.includes("result")
    ) {
      endpoint = "/matches/v1/recent";
    } else if (
      q.includes("upcoming") ||
      q.includes("schedule") ||
      q.includes("next match")
    ) {
      endpoint = "/matches/v1/upcoming";
    } else {
      // Default: live first, fallback recent
      endpoint = "/matches/v1/live";
    }

    data = await cricbuzzFetch(endpoint);

    return parseCricketResponse(data, endpoint);
  } catch (err) {
    console.error("[CricketAPI] Error:", err.message);
    return null;
  }
}

function parseCricketResponse(data, endpoint) {
  try {
    const typeMap = data.typeMatches || [];
    const allMatches = [];

    for (const typeBlock of typeMap) {
      for (const seriesBlock of typeBlock.seriesMatches || []) {
        const seriesInfo = seriesBlock.seriesAdWrapper?.seriesInfo || {};
        const matches = seriesBlock.seriesAdWrapper?.matches || [];
        for (const m of matches) {
          const mi = m.matchInfo || {};
          const ms = m.matchScore || {};

          const team1 = mi.team1?.teamName || "Team 1";
          const team2 = mi.team2?.teamName || "Team 2";
          const status = mi.status || "";
          const matchDesc = mi.matchDesc || "";
          const venueCity = mi.venueInfo?.city || "";
          const series = seriesInfo.name || "";

          // Scores
          const t1s = ms.team1Score;
          const t2s = ms.team2Score;
          const score1 = t1s
            ? `${team1}: ${t1s.inngs1?.runs || 0}/${t1s.inngs1?.wickets || 0} (${t1s.inngs1?.overs || 0} ov)`
            : "";
          const score2 = t2s
            ? `${team2}: ${t2s.inngs1?.runs || 0}/${t2s.inngs1?.wickets || 0} (${t2s.inngs1?.overs || 0} ov)`
            : "";

          allMatches.push(
            [
              `📍 **${series}** | ${matchDesc}${venueCity ? ` @ ${venueCity}` : ""}`,
              score1 ? `🏏 ${score1}` : null,
              score2 ? `🏏 ${score2}` : null,
              `📊 Status: ${status}`,
            ]
              .filter(Boolean)
              .join("\n")
          );
        }
      }
    }

    if (!allMatches.length) {
      const label = endpoint.includes("live")
        ? "No live matches right now."
        : endpoint.includes("recent")
        ? "No recent matches found."
        : "No upcoming matches found.";
      return label;
    }

    const label = endpoint.includes("live")
      ? "🔴 **LIVE MATCHES**"
      : endpoint.includes("recent")
      ? "🕐 **RECENT MATCHES**"
      : "📅 **UPCOMING MATCHES**";

    return `${label}\n\n${allMatches.slice(0, 5).join("\n\n---\n\n")}`;
  } catch (e) {
    console.error("[CricketParser] Error:", e.message);
    return null;
  }
}

// ─────────────────────────────────────────────
//  CRYPTO API  (CoinGecko)
// ─────────────────────────────────────────────

const COINGECKO_KEY = process.env.COINGECKO_API_KEY;
const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

// Map common terms → CoinGecko IDs
const COIN_ID_MAP = {
  bitcoin: "bitcoin",
  btc: "bitcoin",
  ethereum: "ethereum",
  eth: "ethereum",
  solana: "solana",
  sol: "solana",
  dogecoin: "dogecoin",
  doge: "dogecoin",
  matic: "matic-network",
  polygon: "matic-network",
  chainlink: "chainlink",
  link: "chainlink",
  litecoin: "litecoin",
  ltc: "litecoin",
  xrp: "ripple",
  ripple: "ripple",
  avalanche: "avalanche-2",
  avax: "avalanche-2",
  binance: "binancecoin",
  bnb: "binancecoin",
};

function detectCoins(query) {
  const q = query.toLowerCase();
  const found = new Set();
  for (const [keyword, id] of Object.entries(COIN_ID_MAP)) {
    if (q.includes(keyword)) found.add(id);
  }
  if (!found.size) {
    // Default: bitcoin + ethereum
    found.add("bitcoin");
    found.add("ethereum");
  }
  return [...found];
}

export async function getCryptoData(query) {
  try {
    const coins = detectCoins(query);
    const ids = coins.join(",");

    const url = `${COINGECKO_BASE}/simple/price?vs_currencies=usd,inr&ids=${ids}&include_24hr_change=true&include_market_cap=true`;

    const res = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": COINGECKO_KEY,
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error(`CoinGecko ${res.status}: ${res.statusText}`);
    const data = await res.json();

    return parseCryptoResponse(data);
  } catch (err) {
    console.error("[CryptoAPI] Error:", err.message);
    return null;
  }
}

function parseCryptoResponse(data) {
  const lines = ["💰 **Live Crypto Prices**\n"];

  const COIN_NAMES = {
    bitcoin: "Bitcoin (BTC)",
    ethereum: "Ethereum (ETH)",
    solana: "Solana (SOL)",
    dogecoin: "Dogecoin (DOGE)",
    "matic-network": "Polygon (MATIC)",
    chainlink: "Chainlink (LINK)",
    litecoin: "Litecoin (LTC)",
    ripple: "XRP (Ripple)",
    "avalanche-2": "Avalanche (AVAX)",
    binancecoin: "BNB (Binance)",
  };

  for (const [id, info] of Object.entries(data)) {
    const name = COIN_NAMES[id] || id;
    const usd = info.usd?.toLocaleString("en-US", { style: "currency", currency: "USD" }) || "N/A";
    const inr = info.inr?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }) || "";
    const change = info.usd_24h_change;
    const changeStr = change != null ? `${change > 0 ? "▲" : "▼"} ${Math.abs(change).toFixed(2)}% (24h)` : "";
    const arrow = change > 0 ? "📈" : change < 0 ? "📉" : "➡️";

    lines.push(`${arrow} **${name}**`);
    lines.push(`   USD: **${usd}**${inr ? ` | INR: ${inr}` : ""}  ${changeStr}`);
  }

  return lines.join("\n");
}
