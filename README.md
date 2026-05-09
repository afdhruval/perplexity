# CoreOS AI — Multi-LLM Realtime GenAI Search Engine

CoreOS AI is a production-grade Multi-LLM AI Assistant & Search Engine inspired by Perplexity AI and ChatGPT.

It combines:

* Multi-LLM Architecture
* Realtime AI Routing
* Retrieval-Augmented Generation (RAG)
* Smart API-based Realtime Intelligence
* Google OAuth Authentication
* Context-aware AI responses
* Streaming AI Responses
* Realtime Search Intelligence
* API-first Architecture

to deliver fast, intelligent, and realtime AI-powered experiences.

---

# 🚀 Project Vision

Traditional Search Engines → Links

CoreOS AI → Direct Intelligent Answers

CoreOS AI is designed to:

* understand user intent
* fetch realtime information
* reduce hallucinations
* provide contextual AI responses
* optimize speed and token usage
* support multiple AI models dynamically
* support scalable AI infrastructure
* support realtime API integrations

---

# 🧠 Core Features

## 🔥 Multi-LLM Architecture

CoreOS dynamically routes requests across multiple LLM providers.

### Integrated Models

## Google AI

### Gemini 2.5 Flash

Used for:

* fast responses
* large context handling
* realtime chat
* reasoning
* production chat performance

### Gemini 2.5 Flash-Lite

Used for:

* lightweight tasks
* query classification
* token optimization
* ultra-fast responses

---

## OpenAI

### GPT-4o Mini

Used for:

* structured responses
* coding tasks
* debugging
* high-quality formatting
* advanced assistant tasks

---

## Groq

### Llama 3.1 8B Instant

Used for:

* ultra-fast responses
* low-latency AI
* lightweight conversations
* streaming responses

---

## Mistral AI

### Mistral Small

Used for:

* reasoning support
* alternative inference routing
* balanced performance

---

# ⚡ Smart Query Routing

CoreOS intelligently classifies user queries into categories.

## Query Types

* General Knowledge
* Realtime Queries
* Web Research
* Coding Queries
* Casual Conversations
* Crypto Queries
* Cricket / IPL Queries

This prevents unnecessary searches and improves:

* speed
* token optimization
* response quality
* realtime accuracy

---

# 🌐 Realtime Intelligence Layer

CoreOS uses API-first realtime architecture instead of relying only on pretrained AI knowledge.

---

# 🏏 Cricbuzz Cricket API Integration

## Provider

RapidAPI

## API

Cricbuzz Cricket API

## Features

* Live IPL scores
* Match scorecards
* Recent matches
* Upcoming matches
* Match summaries
* Team statistics
* Live match status

## Endpoints Used

```txt
/matches/v1/live
/matches/v1/recent
/matches/v1/upcoming
/mcenter/v1/{matchId}/hscard
```

## Headers

```txt
x-rapidapi-host
x-rapidapi-key
```

---

# 💰 CoinGecko API Integration

## Features

* Bitcoin prices
* Ethereum prices
* Solana prices
* Realtime crypto market updates
* Token price tracking

## Endpoints Used

```txt
/api/v3/simple/price
```

## Supported Coins

* Bitcoin
* Ethereum
* Solana

---

# 🔎 Tavily Search Integration

## Purpose

Used as:

* fallback search engine
* web research system
* internet retrieval layer
* external knowledge fetcher

## Features

* realtime web search
* article retrieval
* search summarization
* contextual search results

---

# 🧠 Retrieval-Augmented Generation (RAG)

CoreOS implements RAG architecture.

## Purpose

* retrieve relevant context
* reduce hallucinations
* improve factual accuracy
* support intelligent answers
* support contextual responses

## Flow

```txt
User Query
   ↓
Retriever
   ↓
Relevant Context
   ↓
LLM Processing
   ↓
Final Response
```

---

# 🔐 Authentication System

CoreOS uses Google OAuth Authentication with Passport.js.

## Technologies Used

* Passport.js
* passport-google-oauth20
* JWT Authentication
* Express Sessions

## Features

* Google Login
* Secure JWT generation
* OAuth callback handling
* Protected authentication flow
* User session management

## OAuth Routes

```txt
/auth/google
/auth/google/callback
```

---

# 💬 Conversational AI Features

CoreOS supports:

* multi-turn conversations
* contextual memory
* dynamic chat routing
* AI streaming responses
* model switching
* realtime conversations

---

# ⚡ Performance Optimizations

The system is optimized for:

* low latency
* fast responses
* streaming output
* reduced token usage
* scalable AI routing
* efficient API handling
* compact prompts
* minimized search overhead

---

# 🏗️ Complete Tech Stack

# Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript
* Axios
* React Hooks

---

# Backend

* Node.js
* Express.js
* REST APIs
* Middleware Architecture

---

# AI & LLM Providers

* Gemini API
* OpenAI API
* Groq API
* Mistral AI

---

# AI Frameworks

* LangChain

---

# Authentication

* Passport.js
* JWT
* Google OAuth 2.0

---

# Database

* MongoDB
* Mongoose

---

# Realtime APIs

* Cricbuzz Cricket API
* CoinGecko API
* Tavily Search API

---

# 📦 Major NPM Packages Used

## Backend Packages

```bash
npm install express
npm install mongoose
npm install cors
npm install dotenv
npm install axios
npm install jsonwebtoken
npm install bcryptjs
npm install passport
npm install passport-google-oauth20
npm install express-session
npm install cookie-parser
npm install multer
npm install socket.io
npm install @google/generative-ai
npm install openai
npm install groq-sdk
npm install @mistralai/mistralai
npm install langchain
npm install @langchain/core
npm install @langchain/community
npm install tavily
```

---

## Frontend Packages

```bash
npm install react
npm install react-dom
npm install react-router-dom
npm install axios
npm install tailwindcss
npm install lucide-react
npm install socket.io-client
npm install framer-motion
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
# DATABASE
MONGO_URI=your_mongodb_uri

# JWT
JWT_SECRET=your_jwt_secret

# GOOGLE OAUTH
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI PROVIDERS
GOOGLE_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
MISTRAL_API_KEY=your_mistral_api_key

# SEARCH
TAVILY_API_KEY=your_tavily_api_key

# RAPID API
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com

# COINGECKO
COINGECKO_API_KEY=your_coingecko_api_key
```

---

# 🏛️ System Architecture

```txt
User Query
    ↓
Smart Query Classifier
    ↓
Realtime Detection Layer
    ↓
API / RAG Retrieval
    ↓
Multi-LLM Routing
    ↓
Context Aggregation
    ↓
Streaming Final Response
```

---

# 🧠 Multi-LLM Routing Strategy

| Query Type                 | Model Used            |
| -------------------------- | --------------------- |
| Fast General Chat          | Gemini 2.5 Flash      |
| Lightweight Queries        | Gemini 2.5 Flash-Lite |
| Coding & Structured Output | GPT-4o Mini           |
| Ultra Fast Responses       | Llama 3.1 8B Instant  |
| Reasoning Support          | Mistral Small         |

---

# 🔄 Realtime Query Flow

## Cricket Query Example

```txt
User asks:
Current IPL score

↓
Query Detection

↓
Cricbuzz API

↓
Extract Important Data

↓
LLM Response Generation

↓
Final Answer
```

---

# 💰 Crypto Query Flow

```txt
User asks:
Bitcoin price right now

↓
Crypto Query Detection

↓
CoinGecko API

↓
Realtime Price Extraction

↓
LLM Response
```

---

# 🔍 News / Research Flow

```txt
User asks:
Latest AI news

↓
Tavily Search

↓
Search Summarization

↓
LLM Context Processing

↓
Final Answer
```

---

# 🔐 Google OAuth Flow

```txt
User clicks Google Login

↓
/auth/google

↓
Google OAuth Consent

↓
/auth/google/callback

↓
JWT Generation

↓
Authenticated Session
```

---

# 📁 Project Structure

```txt
CoreOS/
│
├── backend/
│   ├── services/
│   ├── sockets/
│   ├── validators/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── app.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── pages/
│   │   ├── service/
│   │   ├── hooks/
│   │   └── assets/
│   │
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# 🛠️ Installation & Setup

# 1. Clone Repository

```bash
git clone https://github.com/afdhruval/perplexity.git
cd perplexity
```

---

# 2. Install Backend Dependencies

```bash
npm install
```

---

# 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# 4. Setup Environment Variables

Create `.env`

Add all required API keys.

---

# 5. Run Backend

```bash
npm run dev
```

---

# 6. Run Frontend

```bash
cd frontend
npm run dev
```

---

# 💡 Example Queries

## Realtime Queries

```txt
Current IPL score
```

```txt
Bitcoin price right now
```

```txt
Latest AI news
```

---

## Coding Queries

```txt
Explain React hooks
```

```txt
Fix this Node.js error
```

---

## Research Queries

```txt
Explain Retrieval-Augmented Generation
```

---

# 🔥 Advanced Engineering Highlights

* Multi-LLM orchestration
* Realtime AI architecture
* Smart query routing
* API-first realtime intelligence
* RAG-powered retrieval system
* Streaming AI responses
* Token optimization
* Google OAuth integration
* Production-grade backend structure
* Scalable AI architecture
* Context-aware conversations
* Dynamic model switching

---

# 🧩 Engineering Concepts Used

* Retrieval-Augmented Generation (RAG)
* Multi-LLM orchestration
* Prompt engineering
* API-based realtime systems
* Query classification
* JWT authentication
* OAuth 2.0
* Streaming architecture
* Context aggregation
* AI response optimization
* Low-latency systems
* Realtime retrieval systems

---

# 🎯 Use Cases

* AI Search Engine
* AI Research Assistant
* Realtime Information Assistant
* AI Chatbot Platform
* Coding Assistant
* Crypto Assistant
* Sports Realtime Assistant
* Knowledge Assistant
* GenAI Demonstration Platform

---

# 🚀 Future Improvements

* Voice assistant support
* PDF RAG support
* Pinecone vector database integration
* AI agents
* Web scraping pipelines
* Advanced memory systems
* Team collaboration
* Multi-user chat rooms
* AI workflow automation

---

# 👨‍💻 Author

Dhruval

---

# 🏁 Final Note

CoreOS AI demonstrates real-world implementation of:

* Multi-LLM Systems
* RAG Architecture
* Realtime AI Engineering
* Smart Query Routing
* Production-grade AI Infrastructure
* Modern AI Application Design
* Scalable AI Backend Systems
* Realtime API Integrations
* AI Search Architecture

It is designed as a scalable foundation for next-generation AI-powered assistant systems.
