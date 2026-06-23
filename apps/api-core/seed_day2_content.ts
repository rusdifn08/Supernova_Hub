import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Day 2 Week 1 module contents with interactive Q&A
const day2Contents: Record<string, string> = {};

day2Contents["Day 2 - LLM Engineering Building Blocks: Models, Tools & Techniques"] = `# LLM Engineering Building Blocks: Models, Tools & Techniques

## Overview

Welcome to **Day 2**! Today we dive into the core building blocks every AI Engineer must understand. By the end of this module, you'll have a mental model of the entire LLM ecosystem.

---

## The Three Pillars of LLM Engineering

### 1. Models
The AI "brains" — from massive cloud models to compact local ones:

| Category | Examples | When to Use |
|----------|----------|-------------|
| **Frontier** | GPT-5, Claude 4, Gemini 2 | Maximum quality, complex reasoning |
| **Mid-tier** | GPT-4o-mini, Claude Haiku | Cost-effective production use |
| **Open-Source** | LLaMA 3, Mistral, Phi-3 | Privacy, customization, fine-tuning |

### 2. Tools & Frameworks
Software that connects you to models:

\`\`\`
Models → APIs → Frameworks → Your Application
         ↑         ↑
     OpenAI SDK  LangChain
     Ollama      LiteLLM
     HuggingFace Gradio
\`\`\`

### 3. Techniques
Methods to get better results:
- **Prompt Engineering** — Crafting effective instructions
- **RAG** — Augmenting LLMs with external knowledge
- **Fine-Tuning** — Specializing models for your domain
- **Agents** — Autonomous multi-step problem solving

---

## How LLMs Actually Work (Simplified)

\`\`\`
Input Text → Tokenizer → Neural Network → Probability Distribution → Output Token
                              ↑
                    Billions of Parameters
                    (learned patterns)
\`\`\`

LLMs predict the **next token** based on everything that came before. That's it! But this simple mechanism produces remarkably intelligent behavior.

### Key Insight:
> LLMs don't "understand" — they predict. But their predictions are so accurate that the distinction becomes philosophical.

---

## The API Landscape

### Cloud APIs (Pay-per-token)
\`\`\`python
# OpenAI
from openai import OpenAI
client = OpenAI()  # Uses OPENAI_API_KEY

# Anthropic  
from anthropic import Anthropic
client = Anthropic()  # Uses ANTHROPIC_API_KEY

# Google
import google.generativeai as genai
genai.configure(api_key="...")
\`\`\`

### Local APIs (Free, private)
\`\`\`python
# Ollama (OpenAI-compatible)
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
\`\`\`

---

## 💡 Knowledge Check

> **Q1:** What's the main difference between frontier and open-source models?
> 
> *Think about it before reading the answer below...*
>
> **A1:** Frontier models (GPT-5, Claude) run in the cloud, are proprietary, and offer the highest quality. Open-source models (LLaMA, Mistral) can run locally, be modified, and are free — but may have lower quality on some tasks.

> **Q2:** Why would a company choose an open-source model over GPT-5?
>
> **A2:** Data privacy (no data leaves their servers), cost savings (no per-token fees at scale), customization (fine-tuning for specific domains), and avoiding vendor lock-in.

---

## Key Takeaways

1. LLM engineering has three pillars: **Models**, **Tools**, and **Techniques**
2. LLMs work by **predicting the next token** — simple concept, powerful results
3. Choose between **cloud** (quality) and **local** (privacy/cost) based on your needs
4. The ecosystem is evolving rapidly — stay hands-on!
`;

day2Contents["Day 2 - Your 8-Week Journey: From Chat Completions API to LLM Engineer"] = `# Your 8-Week Journey: From Chat Completions API to LLM Engineer

## The Learning Path

This course is structured as an 8-week intensive bootcamp. Here's what each week covers and why it matters.

---

## Week-by-Week Breakdown

### 📅 Week 1: Foundations & First API Calls
**Goal:** Get comfortable with LLMs and APIs

| Day | Topic | You'll Build |
|-----|-------|-------------|
| 1 | Ollama, setup, first calls | Local LLM runner |
| 2 | Building blocks, models | Mental model of LLM ecosystem |
| 3 | Frontier models deep-dive | Model comparison tool |
| 4 | Transformers, tokens | Tokenizer explorer |
| 5 | Brochure generator | AI-powered web scraper |

### 📅 Week 2: Applications & Tools
**Goal:** Build real UIs and use advanced features

- Gradio for data science UIs
- Tool calling and function execution
- Multi-modal AI (images, audio, text)
- Agentic workflows

### 📅 Week 3: Open-Source Ecosystem
**Goal:** Master Hugging Face and open-source models

- Hugging Face platform and libraries
- Google Colab and GPU computing
- Running inference on various models
- Building meeting minutes from audio

### 📅 Week 4: Model Selection & Code Generation
**Goal:** Choose the right model for each task

- AI benchmarks and leaderboards
- Python to C++/Rust code translation
- Performance optimization with AI

### 📅 Week 5: RAG
**Goal:** Build production-ready retrieval systems

- Vector embeddings and databases
- LangChain RAG pipelines
- Evaluation metrics (MRR, nDCG)
- Advanced techniques (re-ranking, query expansion)

### 📅 Weeks 6-7: Fine-Tuning & Capstone
**Goal:** Train your own models

- Dataset curation and preprocessing
- QLoRA fine-tuning on Google Colab
- Comparing fine-tuned vs frontier models

### 📅 Week 8: Multi-Agent Systems
**Goal:** Build autonomous AI systems

- Agent architectures
- MCP (Model Context Protocol)
- Multi-agent collaboration

---

## 💡 Knowledge Check

> **Q:** After this course, what will differentiate you from someone who just uses ChatGPT?
>
> **A:** You'll be able to build production AI systems, choose the right model for each task, fine-tune models, build RAG pipelines, and create autonomous agents. You'll go from *user* to *builder*.

---

## Key Takeaways

1. The course follows a **logical progression**: basics → apps → open-source → selection → RAG → fine-tuning → agents
2. Each week builds on the previous one
3. By week 8, you'll have built **8 real projects** for your portfolio
`;

day2Contents["Day 2 - Frontier Models: OpenAI GPT, Claude, Gemini & Grok Compared"] = `# Frontier Models: OpenAI GPT, Claude, Gemini & Grok Compared

## The Big Four (Plus More)

Let's compare the leading frontier models as of 2025-2026.

---

## Model Comparison

| Model | Company | Strengths | Weaknesses |
|-------|---------|-----------|------------|
| **GPT-5** | OpenAI | Reasoning, coding, multimodal | Cost, occasional hallucinations |
| **Claude 4** | Anthropic | Safety, long context (200K), writing | Slower, conservative |
| **Gemini 2** | Google | Multimodal native, huge context | Less consistent coding |
| **Grok** | xAI | Real-time data, humor | Smaller ecosystem |
| **DeepSeek v3** | DeepSeek | Open-source, cost-effective | Fewer features |

---

## Practical Differences

### Context Window Sizes
\`\`\`
GPT-5:        128K tokens (~96K words)
Claude 4:     200K tokens (~150K words) ← Largest!
Gemini 2:     1M tokens (~750K words)  ← Experimental
Grok:         128K tokens (~96K words)
\`\`\`

### Pricing (per 1M tokens, approximate)
\`\`\`
GPT-5:        $5 input / $15 output
GPT-4o-mini:  $0.15 input / $0.60 output  ← Budget choice
Claude 4:     $3 input / $15 output
Gemini 2:     $3.50 input / $10.50 output
\`\`\`

### When to Use Each

\`\`\`python
# GPT-5: Best for complex reasoning and coding
response = openai_client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Solve this algorithm problem..."}]
)

# Claude: Best for long documents and careful analysis
response = anthropic_client.messages.create(
    model="claude-4-sonnet",
    max_tokens=4096,
    messages=[{"role": "user", "content": f"Analyze this 100-page document: {long_text}"}]
)

# GPT-4o-mini: Best for high-volume, cost-sensitive tasks
response = openai_client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Classify this email as spam or not spam"}]
)
\`\`\`

---

## 💡 Knowledge Check

> **Q1:** You need to analyze a 150-page legal contract. Which model should you choose and why?
>
> **A1:** Claude 4 — it has the largest reliable context window (200K tokens) and excels at careful, detailed analysis of long documents.

> **Q2:** You're building a chatbot that handles 10,000 customer queries per day. Cost is a concern. Which model?
>
> **A2:** GPT-4o-mini — it's the most cost-effective at \$0.15/1M input tokens and handles simple tasks well.

> **Q3:** You need real-time information about a current event. Which model would help?
>
> **A3:** Grok — it has access to real-time data from X (Twitter) and the web.

---

## Key Takeaways

1. **No single model wins everything** — choose based on your specific task
2. **Cost vs. quality** is the primary tradeoff
3. **Context window** matters for long documents
4. Use **cheaper models** for simple tasks, **expensive** ones for complex reasoning
`;

day2Contents["Day 2 - Open-Source LLMs: LLaMA, Mistral, DeepSeek, and Ollama"] = `# Open-Source LLMs: LLaMA, Mistral, DeepSeek, and Ollama

## Why Open-Source Matters

Open-source models have exploded in capability. Many now rival frontier models on specific tasks — and they're free!

---

## The Major Open-Source Models

### 🦙 LLaMA (Meta)
- **Latest:** LLaMA 3.2 (1B, 3B, 11B, 90B)
- **Strengths:** Excellent base model, huge community, many fine-tunes
- **License:** Open (commercial use allowed)

### 🌪️ Mistral
- **Latest:** Mistral Large 2, Mistral 7B
- **Strengths:** Great instruction following, efficient architecture
- **License:** Apache 2.0

### 🔍 DeepSeek
- **Latest:** DeepSeek V3, DeepSeek Coder
- **Strengths:** Strong reasoning, excellent at coding
- **License:** Open (with restrictions on some models)

### 💎 Phi (Microsoft)
- **Latest:** Phi-3 (3.8B, 14B)
- **Strengths:** Best quality-per-parameter, runs on phones
- **License:** MIT

### ✨ Qwen (Alibaba)
- **Latest:** Qwen 2.5 (0.5B to 72B)
- **Strengths:** Multilingual, strong coding
- **License:** Apache 2.0

---

## Running with Ollama

\`\`\`bash
# Download and run models
ollama run llama3.2          # Meta's LLaMA
ollama run mistral           # Mistral 7B
ollama run deepseek-coder    # DeepSeek for coding
ollama run phi3              # Microsoft Phi-3
ollama run qwen2.5           # Alibaba Qwen

# List downloaded models
ollama list

# Remove a model
ollama rm mistral
\`\`\`

---

## Comparing Models in Python

\`\`\`python
from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

models = ["llama3.2", "mistral", "phi3"]
question = "Write a Python function to find prime numbers up to N"

for model in models:
    print(f"\\n{'='*50}")
    print(f"Model: {model}")
    print('='*50)
    
    response = ollama.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": question}],
        temperature=0
    )
    print(response.choices[0].message.content)
\`\`\`

---

## Model Size Guide

| Size | RAM Needed | Quality | Speed | Use Case |
|------|-----------|---------|-------|----------|
| 1-3B | 4GB | Basic | ⚡ Fast | Mobile, edge devices |
| 7-8B | 8GB | Good | 🔵 Medium | Development, testing |
| 13-14B | 16GB | Great | 🟡 Moderate | Production (small scale) |
| 30-34B | 32GB | Excellent | 🔴 Slow | High-quality tasks |
| 70B+ | 64GB+ | Near-frontier | 🔴 Very slow | Maximum local quality |

---

## 💡 Knowledge Check

> **Q1:** You have a laptop with 8GB RAM. Which model sizes can you run?
>
> **A1:** Models up to 7-8B parameters. Try \`llama3.2\` (3B) for speed or \`mistral\` (7B) for better quality.

> **Q2:** Your company needs to process sensitive medical records with AI. Should you use GPT-5 or an open-source model? Why?
>
> **A2:** Open-source model running locally — medical data should never leave your servers for privacy/HIPAA compliance. Use LLaMA or Mistral via Ollama.

> **Q3:** What's the advantage of Phi-3 over LLaMA 3 at similar sizes?
>
> **A3:** Phi-3 achieves better quality-per-parameter due to its training on high-quality synthetic data, making it ideal for resource-constrained environments.

---

## Key Takeaways

1. Open-source models are **free, private, and customizable**
2. **Ollama** makes running them as easy as one command
3. Choose model size based on your **available RAM** and quality needs
4. Open-source is **mandatory** for sensitive data processing
5. The gap between open-source and frontier is **shrinking fast**
`;

day2Contents["Day 2 - Chat Completions API: HTTP Endpoints vs OpenAI Python Client"] = `# Chat Completions API: HTTP Endpoints vs OpenAI Python Client

## Two Ways to Talk to LLMs

You can interact with LLMs via raw HTTP requests or the Python SDK. Understanding both is essential.

---

## Method 1: Raw HTTP Requests

\`\`\`python
import requests
import os

response = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "You are helpful."},
            {"role": "user", "content": "Hello!"}
        ],
        "temperature": 0.7
    }
)

data = response.json()
print(data["choices"][0]["message"]["content"])
print(f"Tokens used: {data['usage']['total_tokens']}")
\`\`\`

### When to use raw HTTP:
- Understanding what's happening under the hood
- Languages without an official SDK
- Custom retry/error handling logic

---

## Method 2: OpenAI Python Client

\`\`\`python
from openai import OpenAI

client = OpenAI()  # Reads OPENAI_API_KEY automatically

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
print(f"Tokens used: {response.usage.total_tokens}")
\`\`\`

### Advantages of the SDK:
- ✅ Automatic retries on network errors
- ✅ Type hints and autocomplete
- ✅ Streaming support built-in
- ✅ Cleaner, more readable code

---

## Streaming Responses

### With SDK (recommended)
\`\`\`python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
\`\`\`

---

## 💡 Knowledge Check

> **Q1:** Which method would you choose for a production Python application and why?
>
> **A1:** The OpenAI Python Client — it handles retries, provides type safety, and results in cleaner code. Raw HTTP is mainly useful for learning or non-Python environments.

> **Q2:** What does \`stream=True\` do and when would you use it?
>
> **A2:** It returns tokens one-by-one as they're generated instead of waiting for the full response. Use it for chat interfaces where you want to show text appearing in real-time (like ChatGPT does).

---

## Key Takeaways

1. Raw HTTP requests show you **exactly** what's being sent/received
2. The Python SDK is **always preferred** for production code
3. **Streaming** creates better user experiences in chat applications
4. Both methods use the same underlying API — same results, different ergonomics
`;

day2Contents["Day 2 - Using the OpenAI Python Client with Multiple LLM Providers"] = `# Using the OpenAI Python Client with Multiple LLM Providers

## One Client, Many Models

The OpenAI Python client isn't just for OpenAI! Many providers offer OpenAI-compatible APIs.

---

## The Universal Pattern

\`\`\`python
from openai import OpenAI

# OpenAI (default)
openai_client = OpenAI()

# Ollama (local)
ollama_client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

# OpenRouter (many models)
openrouter_client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

# Together AI
together_client = OpenAI(
    base_url="https://api.together.xyz/v1",
    api_key=os.getenv("TOGETHER_API_KEY")
)
\`\`\`

---

## Building a Multi-Provider Function

\`\`\`python
def ask_llm(prompt: str, provider: str = "openai", model: str = None) -> str:
    """Send a prompt to any LLM provider."""
    
    providers = {
        "openai": {"client": OpenAI(), "default_model": "gpt-4o-mini"},
        "ollama": {"client": OpenAI(base_url="http://localhost:11434/v1", api_key="ollama"), "default_model": "llama3.2"},
        "openrouter": {"client": OpenAI(base_url="https://openrouter.ai/api/v1", api_key=os.getenv("OPENROUTER_API_KEY")), "default_model": "meta-llama/llama-3-8b-instruct"},
    }
    
    config = providers[provider]
    response = config["client"].chat.completions.create(
        model=model or config["default_model"],
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

# Usage
print(ask_llm("What is AI?", provider="openai"))
print(ask_llm("What is AI?", provider="ollama"))
\`\`\`

---

## Why This Matters

1. **No vendor lock-in** — Switch providers with one line change
2. **Cost optimization** — Use cheap models for simple tasks
3. **Fallback strategy** — If OpenAI is down, fall back to Ollama
4. **A/B testing** — Compare model outputs easily

---

## 💡 Knowledge Check

> **Q:** Your app uses GPT-4o for everything. Your monthly API bill is $5,000. How would you reduce costs using multiple providers?
>
> **A:** Analyze your requests: route simple tasks (classification, extraction) to GPT-4o-mini ($0.15/M tokens), use local Ollama for development/testing, and reserve GPT-5 only for complex reasoning tasks. This could reduce costs by 70-80%.

---

## Key Takeaways

1. The OpenAI client is a **universal interface** for many LLM providers
2. Just change \`base_url\` and \`api_key\` to switch providers
3. Build **provider-agnostic** code from the start
4. Use **multiple models** strategically to optimize cost and quality
`;

day2Contents["Day 2 - Running Ollama Locally with OpenAI-Compatible Endpoints"] = `# Running Ollama Locally with OpenAI-Compatible Endpoints

## Ollama as a Local API Server

Ollama doesn't just provide a CLI — it runs a full API server that's compatible with OpenAI's API format.

---

## The Ollama API

When Ollama runs, it starts a server on \`http://localhost:11434\`:

### Native Ollama API
\`\`\`python
import requests

# Generate text
response = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3.2",
    "prompt": "Explain quantum computing",
    "stream": False
})
print(response.json()["response"])

# Chat format
response = requests.post("http://localhost:11434/api/chat", json={
    "model": "llama3.2",
    "messages": [
        {"role": "system", "content": "You are a physics professor."},
        {"role": "user", "content": "What is quantum entanglement?"}
    ],
    "stream": False
})
print(response.json()["message"]["content"])
\`\`\`

### OpenAI-Compatible API
\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="not-needed"  # Required param but unused
)

# Exact same code as OpenAI!
response = client.chat.completions.create(
    model="llama3.2",
    messages=[
        {"role": "system", "content": "You are a physics professor."},
        {"role": "user", "content": "What is quantum entanglement?"}
    ]
)
print(response.choices[0].message.content)
\`\`\`

---

## Managing Models

\`\`\`bash
# List running models
curl http://localhost:11434/api/tags | python -m json.tool

# Check if Ollama is running
curl http://localhost:11434/

# Model info
ollama show llama3.2
\`\`\`

---

## Performance Tips

| Tip | Impact |
|-----|--------|
| Use quantized models (Q4) | 2-3x less RAM |
| Keep model loaded (\`keep_alive\`) | Instant response after first call |
| Use GPU if available | 5-10x faster inference |
| Smaller context = faster | Reduce \`num_ctx\` for speed |

---

## 💡 Knowledge Check

> **Q1:** What port does Ollama run on by default?
>
> **A1:** Port **11434**. The API is at \`http://localhost:11434\`.

> **Q2:** Can you use the exact same Python code for both OpenAI and Ollama? How?
>
> **A2:** Yes! Use the OpenAI Python client with \`base_url="http://localhost:11434/v1"\`. The only difference is the base URL and model name.

> **Q3:** You have a 16GB RAM laptop. What's the largest model you can comfortably run?
>
> **A3:** A 13B parameter model (quantized). The rule of thumb: you need about 1GB RAM per 1B parameters for quantized models.

---

## Key Takeaways

1. Ollama provides both **native** and **OpenAI-compatible** APIs
2. The OpenAI-compatible endpoint means **zero code changes** when switching
3. Use quantized models and GPU for **better performance**
4. Ollama is the easiest way to run LLMs **locally and privately**
`;


async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: "AI Engineer Core Track" } },
    include: { modules: { orderBy: { orderIndex: 'asc' } } }
  });

  if (!course) { console.error("Course not found!"); return; }

  // Step 1: Re-add the missing Module 1 with proper content
  const existingMod1 = course.modules.find(m => m.title === "Day 1 - Running Your First LLM Locally with Ollama and Open Source Models");
  if (!existingMod1) {
    await prisma.courseModule.create({
      data: {
        courseId: course.id,
        title: "Day 1 - Running Your First LLM Locally with Ollama and Open Source Models",
        duration: "10:44",
        orderIndex: 1,
        contentMd: `# Running Your First LLM Locally with Ollama and Open Source Models

## Introduction

Welcome to **Day 1** of your AI Engineer journey! In this module, you'll learn how to run Large Language Models (LLMs) directly on your own machine using **Ollama**.

> **Why run models locally?** Privacy, zero API costs, and unlimited experimentation.

---

## What is Ollama?

[Ollama](https://ollama.com) is an open-source tool that makes it easy to download and run LLMs locally. Think of it as "Docker for LLMs."

### Key Features:
- 🚀 **One-command setup** — Download and run models instantly
- 💻 **Cross-platform** — Works on macOS, Linux, and Windows
- 🔌 **OpenAI-compatible API** — Drop-in replacement for OpenAI endpoints

---

## Installing Ollama

### Windows
\\\`\\\`\\\`bash
# Download from https://ollama.com/download/windows
# Run the installer — Ollama starts as a system service
\\\`\\\`\\\`

### macOS
\\\`\\\`\\\`bash
brew install ollama
\\\`\\\`\\\`

### Linux
\\\`\\\`\\\`bash
curl -fsSL https://ollama.com/install.sh | sh
\\\`\\\`\\\`

---

## Running Your First Model

\\\`\\\`\\\`bash
ollama run llama3.2
\\\`\\\`\\\`

This downloads LLaMA 3.2 and starts an interactive chat. Try:
- "What is machine learning?"
- "Write a Python fibonacci function"
- "Explain AI vs ML vs Deep Learning"

---

## Popular Models

| Model | Size | Best For |
|-------|------|----------|
| llama3.2 | 3B | General, fast |
| mistral | 7B | Instructions |
| codellama | 7B | Code generation |
| phi3 | 3.8B | Compact + powerful |

---

## Using the API

\\\`\\\`\\\`python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Explain transformers in AI"}]
)
print(response.choices[0].message.content)
\\\`\\\`\\\`

---

## 💡 Knowledge Check

> **Q1:** What command downloads and runs LLaMA 3.2?
>
> **A1:** \\\`ollama run llama3.2\\\`

> **Q2:** What port does Ollama's API run on?
>
> **A2:** Port **11434** — accessible at http://localhost:11434

---

## Key Takeaways

1. **Ollama** = one command to run LLMs locally
2. Open-source models like LLaMA and Mistral are **free and capable**
3. The **OpenAI-compatible API** lets you swap local/cloud models easily
4. Start with small models (3B-7B) for fast iteration`
      }
    });
    console.log("✅ Re-created Module 1: Running Your First LLM Locally");
  } else {
    console.log("Module 1 already exists, skipping.");
  }

  // Step 2: Update Day 2 modules with educational content
  let updated = 0;
  for (const mod of course.modules) {
    const content = day2Contents[mod.title];
    if (content) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { contentMd: content }
      });
      console.log(`✅ Updated: ${mod.title}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} Day 2 modules with interactive educational content.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
