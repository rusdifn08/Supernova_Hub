import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Real educational content for Day 1 Week 1 modules
const day1Contents: Record<string, string> = {};

day1Contents["Day 1 - Running Your First LLM Locally with Ollama and Open Source Models"] = `# Running Your First LLM Locally with Ollama and Open Source Models

## Introduction

Welcome to **Day 1** of your AI Engineer journey! In this module, you'll learn how to run Large Language Models (LLMs) directly on your own machine using **Ollama** — no cloud API keys required.

> **Why run models locally?** Running LLMs locally gives you privacy, zero API costs, and the ability to experiment freely without rate limits.

---

## What is Ollama?

[Ollama](https://ollama.com) is an open-source tool that makes it incredibly easy to download and run LLMs on your local machine. Think of it as "Docker for LLMs."

### Key Features:
- 🚀 **One-command setup** — Download and run models instantly
- 💻 **Cross-platform** — Works on macOS, Linux, and Windows
- 🔌 **OpenAI-compatible API** — Drop-in replacement for OpenAI endpoints
- 📦 **Model library** — Access to LLaMA, Mistral, Gemma, Phi, and more

---

## Installing Ollama

### Windows
\`\`\`bash
# Download from https://ollama.com/download/windows
# Run the installer
# Ollama will start as a system service
\`\`\`

### macOS
\`\`\`bash
# Download from https://ollama.com/download/mac
# Or use Homebrew:
brew install ollama
\`\`\`

### Linux
\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

---

## Running Your First Model

Once Ollama is installed, running a model is as simple as:

\`\`\`bash
ollama run llama3.2
\`\`\`

This command will:
1. **Download** the LLaMA 3.2 model (if not already cached)
2. **Load** it into memory
3. **Start** an interactive chat session

### Try these prompts:
\`\`\`
>>> What is machine learning in simple terms?
>>> Write a Python function to calculate fibonacci numbers
>>> Explain the difference between AI, ML, and Deep Learning
\`\`\`

---

## Popular Open-Source Models

| Model | Size | Best For |
|-------|------|----------|
| \`llama3.2\` | 3B | General purpose, fast |
| \`llama3.1:8b\` | 8B | Better reasoning |
| \`mistral\` | 7B | Instruction following |
| \`codellama\` | 7B | Code generation |
| \`phi3\` | 3.8B | Compact but powerful |
| \`gemma2\` | 9B | Google's open model |

### Downloading Additional Models
\`\`\`bash
ollama pull mistral
ollama pull codellama
ollama pull phi3
\`\`\`

---

## Using the Ollama API

Ollama exposes a REST API on \`http://localhost:11434\` that is **OpenAI-compatible**:

\`\`\`python
import requests

response = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3.2",
    "prompt": "What is quantum computing?",
    "stream": False
})

print(response.json()["response"])
\`\`\`

### Using with OpenAI Python Client
\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Required but not used
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain transformers in AI"}
    ]
)

print(response.choices[0].message.content)
\`\`\`

---

## Key Takeaways

1. **Ollama** makes running LLMs locally trivial — one command to install, one command to run
2. **Open-source models** like LLaMA, Mistral, and Phi are incredibly capable
3. The **OpenAI-compatible API** means you can swap between local and cloud models easily
4. Running locally = **free**, **private**, and **unlimited** experimentation

> 💡 **Pro Tip:** Start with smaller models (3B-7B parameters) for fast iteration, then scale up to larger models when you need better quality.

---

## Exercise

1. Install Ollama on your machine
2. Run \`ollama run llama3.2\` and have a conversation
3. Try at least 2 different models and compare their responses
4. Use the Python API to send a programmatic request
`;

day1Contents["Day 1 - Spanish Tutor Demo with Open-Source Models & Course Overview"] = `# Spanish Tutor Demo with Open-Source Models & Course Overview

## Course Overview

Welcome to the **AI Engineer Core Track**! This is an intensive 8-week bootcamp that will transform you from a beginner to a proficient AI Engineer.

### What You'll Build

Throughout this course, you'll complete **8 hands-on projects**:

| # | Project | Key Skills |
|---|---------|------------|
| 1 | AI Brochure Generator | Web scraping, Chat Completions API |
| 2 | Airline Support Agent | Multi-modal AI, Function calling |
| 3 | Meeting Minutes Tool | Audio processing, Open-source models |
| 4 | Python → C++ Converter | Code generation, Performance optimization |
| 5 | RAG Knowledge Worker | Vector databases, Retrieval systems |
| 6 | Price Predictor (Frontier) | Fine-tuning, Prompt engineering |
| 7 | Price Predictor (Open-Source) | QLoRA, Model training |
| 8 | Multi-Agent Deal Finder | Autonomous agents, Collaboration |

---

## Demo: Spanish Tutor with Open-Source Models

Let's start with a fun demo! We'll build a **Spanish language tutor** powered entirely by open-source models running locally.

### The Architecture

\`\`\`
User Input (English) → LLM (Ollama) → Spanish Translation + Explanation
\`\`\`

### Code Implementation

\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

SYSTEM_PROMPT = """You are an enthusiastic Spanish language tutor. 
When the user says something in English:
1. Translate it to Spanish
2. Break down the grammar
3. Provide pronunciation tips
4. Give a related vocabulary list

Keep explanations clear and encouraging!"""

def spanish_tutor(user_input: str) -> str:
    response = client.chat.completions.create(
        model="llama3.2",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input}
        ],
        temperature=0.7
    )
    return response.choices[0].message.content

# Try it!
result = spanish_tutor("How do I say 'I want to learn programming'?")
print(result)
\`\`\`

### Expected Output

> **Translation:** "Quiero aprender programación"
> 
> **Grammar Breakdown:**
> - *Quiero* (I want) — from the verb "querer"
> - *aprender* (to learn) — infinitive form
> - *programación* (programming) — feminine noun
>
> **Pronunciation:** kee-EH-roh ah-pren-DEHR pro-gra-ma-see-OHN

---

## Week-by-Week Roadmap

### 🗓 Week 1: Foundations
- LLM basics, API setup, first projects
- OpenAI, Ollama, environment configuration

### 🗓 Week 2: Building Applications  
- Gradio UIs, tool calling, agentic workflows
- Multi-model conversations, streaming

### 🗓 Week 3: Open-Source Ecosystem
- Hugging Face, Google Colab, GPU computing
- Transformers, tokenizers, model inference

### 🗓 Week 4: Model Selection
- Benchmarks, leaderboards, code generation
- Python → C++/Rust translation challenges

### 🗓 Weeks 5: RAG (Retrieval Augmented Generation)
- Vector databases, embeddings, LangChain
- Production RAG with evaluation metrics

### 🗓 Weeks 6-7: Fine-Tuning & Capstone
- Dataset curation, QLoRA, training loops
- Frontier vs open-source model competition

### 🗓 Week 8: Multi-Agent Systems
- Autonomous agents, MCP protocol
- Capstone: Deal-finding agent system

---

## Key Takeaways

- This course is **project-driven** — you learn by building
- You'll work with both **frontier** (GPT, Claude) and **open-source** (LLaMA, Mistral) models
- No prior AI/ML experience required — just Python basics
- By the end, you'll have a **portfolio of 8 real AI projects**
`;

day1Contents["Your Path to Becoming a Proficient AI Engineer"] = `# Your Path to Becoming a Proficient AI Engineer

## The AI Engineer Role

The **AI Engineer** is one of the most in-demand roles in tech today. But what exactly does an AI Engineer do?

### AI Engineer vs. Other Roles

| Role | Focus | Key Skills |
|------|-------|------------|
| **Data Scientist** | Analysis & insights | Statistics, SQL, visualization |
| **ML Engineer** | Training models | PyTorch, TensorFlow, MLOps |
| **AI Engineer** | Building AI products | APIs, RAG, agents, fine-tuning |
| **Prompt Engineer** | Crafting prompts | Prompt design, evaluation |

> An **AI Engineer** sits at the intersection of software engineering and AI — you build products that leverage LLMs to solve real problems.

---

## The AI Engineer Tech Stack

\`\`\`
┌─────────────────────────────────────┐
│           AI Applications           │
│  (Chatbots, Agents, RAG Systems)    │
├─────────────────────────────────────┤
│         Frameworks & Tools          │
│  (LangChain, Gradio, FastAPI)       │
├─────────────────────────────────────┤
│           LLM Providers             │
│  (OpenAI, Anthropic, Ollama)        │
├─────────────────────────────────────┤
│        Foundation Models            │
│  (GPT-5, Claude, LLaMA, Mistral)   │
└─────────────────────────────────────┘
\`\`\`

---

## Skills You'll Master

### 1. 🔌 API Integration
- Connect to multiple LLM providers
- Handle streaming, function calling, structured outputs

### 2. 🏗️ Application Architecture  
- Design scalable AI systems
- Build production-ready pipelines

### 3. 📚 RAG (Retrieval Augmented Generation)
- Vector databases and embeddings
- Document processing and chunking

### 4. 🎯 Fine-Tuning
- QLoRA and parameter-efficient training
- Dataset curation and evaluation

### 5. 🤖 Agentic AI
- Tool calling and function execution
- Multi-agent collaboration systems

---

## Your Learning Approach

> "The best way to learn AI engineering is to **build things**."

Each week follows this pattern:

1. **Learn** the concepts through video lectures
2. **Code along** with hands-on examples
3. **Build** a project that applies what you learned
4. **Challenge** yourself with exercises

---

## Key Takeaways

- AI Engineering is about **building products**, not just training models
- The field is evolving rapidly — staying hands-on is essential
- You don't need a PhD — you need **practical skills** and **project experience**
- This course gives you both the theory and the portfolio to succeed
`;

day1Contents["Day 1 - Setting Up Your LLM Development Environment with Cursor and UV"] = `# Setting Up Your LLM Development Environment with Cursor and UV

## Overview

A proper development environment is crucial for AI engineering. In this module, we'll set up **Cursor** (an AI-powered code editor) and **UV** (a blazing-fast Python package manager).

---

## What is Cursor?

**Cursor** is a fork of VS Code with built-in AI capabilities:
- 🤖 **AI-powered autocomplete** — Understands your entire codebase
- 💬 **Inline chat** — Ask questions about code directly in the editor
- ⚡ **Agent mode** — Let AI write entire features for you
- 🔧 **VS Code compatible** — All your extensions and settings work

### Installing Cursor
1. Go to [cursor.com](https://cursor.com)
2. Download for your OS
3. Install and sign in

---

## What is UV?

**UV** is an extremely fast Python package manager written in Rust. It's a drop-in replacement for \`pip\`, \`virtualenv\`, and \`pip-tools\`.

### Why UV over pip?
| Feature | pip | UV |
|---------|-----|-----|
| Speed | ~30s for typical install | ~1s (30x faster!) |
| Lock files | ❌ | ✅ |
| Virtual envs | Separate tool | Built-in |
| Resolution | Basic | Advanced |

### Installing UV

\`\`\`bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify installation
uv --version
\`\`\`

---

## Setting Up Your Project

### Step 1: Create a new project
\`\`\`bash
mkdir ai-engineer-course
cd ai-engineer-course
uv init
\`\`\`

### Step 2: Create a virtual environment
\`\`\`bash
uv venv
# Activate it:
# macOS/Linux: source .venv/bin/activate
# Windows: .venv\\Scripts\\activate
\`\`\`

### Step 3: Install dependencies
\`\`\`bash
uv pip install openai python-dotenv jupyter
\`\`\`

### Step 4: Open in Cursor
\`\`\`bash
cursor .
\`\`\`

---

## Configuring Cursor for AI Development

### Recommended Extensions
1. **Python** — Language support
2. **Jupyter** — Notebook support  
3. **GitHub Copilot** — Additional AI assistance
4. **Pylance** — Type checking

### Cursor Settings
\`\`\`json
{
    "editor.fontSize": 14,
    "python.defaultInterpreterPath": ".venv/bin/python",
    "jupyter.notebookFileRoot": "\${workspaceFolder}"
}
\`\`\`

---

## Project Structure

\`\`\`
ai-engineer-course/
├── .venv/              # Virtual environment
├── .env                # API keys (never commit!)
├── notebooks/          # Jupyter notebooks
│   └── day1.ipynb
├── src/                # Python modules
├── pyproject.toml      # Project config
└── README.md
\`\`\`

---

## Key Takeaways

1. **Cursor** gives you AI superpowers in your editor
2. **UV** is dramatically faster than pip for package management
3. Always use **virtual environments** to isolate project dependencies
4. Keep your **API keys in .env files** and never commit them to git
`;

day1Contents["Day 1 - Setting Up Your PC Development Environment with Git and Cursor"] = `# Setting Up Your PC Development Environment with Git and Cursor

## Overview

This module walks Windows users through setting up a complete AI development environment from scratch.

---

## Step 1: Install Git

Git is essential for version control and cloning course repositories.

### Download & Install
1. Go to [git-scm.com](https://git-scm.com/download/win)
2. Download the installer
3. During installation, select these options:
   - ✅ **Git Bash** (provides a Unix-like terminal)
   - ✅ **Add Git to PATH**
   - ✅ **Use VS Code/Cursor as default editor**

### Verify Installation
\`\`\`powershell
git --version
# Output: git version 2.45.x
\`\`\`

### Configure Git
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
\`\`\`

---

## Step 2: Clone the Course Repository

\`\`\`bash
cd ~/Documents
git clone https://github.com/your-course-repo/ai-engineer-course.git
cd ai-engineer-course
\`\`\`

---

## Step 3: Install Python

### Using the Microsoft Store
1. Open Microsoft Store
2. Search for "Python 3.12"
3. Click Install

### Or download from python.org
\`\`\`powershell
# Verify installation
python --version
# Output: Python 3.12.x

# Verify pip
pip --version
\`\`\`

> ⚠️ **Important:** Make sure to check "Add Python to PATH" during installation!

---

## Step 4: Install Cursor

1. Download from [cursor.com](https://cursor.com)
2. Run the installer
3. Launch Cursor
4. Sign in with your account
5. Import VS Code settings if you have them

### Opening the Project
\`\`\`powershell
cd ~/Documents/ai-engineer-course
cursor .
\`\`\`

---

## Step 5: Terminal Setup in Cursor

Cursor has a built-in terminal. Open it with \`Ctrl + \\\`\`

### Recommended: Use Git Bash in Cursor
1. Open Settings (\`Ctrl + ,\`)
2. Search for "terminal default profile"
3. Set Windows default to **Git Bash**

---

## Common Windows Issues

### Python not found
\`\`\`powershell
# Add Python to PATH manually
$env:Path += ";C:\\Users\\YourName\\AppData\\Local\\Programs\\Python\\Python312"
\`\`\`

### Permission errors
\`\`\`powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
\`\`\`

### Long path support
\`\`\`powershell
# Enable long paths (run as Admin)
git config --system core.longpaths true
\`\`\`

---

## Key Takeaways

1. **Git** is your foundation for version control — install it first
2. **Python 3.12+** is required for this course
3. **Cursor** is our primary IDE — it's VS Code with AI superpowers
4. Use **Git Bash** as your terminal on Windows for consistency
`;

day1Contents["Day 1 - Mac Setup: Installing Git, Cloning the Repo, and Cursor IDE"] = `# Mac Setup: Installing Git, Cloning the Repo, and Cursor IDE

## Overview

This module covers the complete macOS setup for AI Engineering development.

---

## Step 1: Install Homebrew

Homebrew is the package manager for macOS:

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Verify
brew --version
\`\`\`

---

## Step 2: Install Git

\`\`\`bash
# macOS may already have git, but let's get the latest:
brew install git

# Verify
git --version

# Configure
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
\`\`\`

---

## Step 3: Install Python

\`\`\`bash
brew install python@3.12

# Verify
python3 --version
pip3 --version
\`\`\`

---

## Step 4: Clone the Repository

\`\`\`bash
cd ~/Documents
git clone https://github.com/your-course-repo/ai-engineer-course.git
cd ai-engineer-course
\`\`\`

---

## Step 5: Install Cursor IDE

1. Download from [cursor.com](https://cursor.com)
2. Drag to Applications folder
3. Launch and sign in
4. Open the course folder: \`cursor ~/Documents/ai-engineer-course\`

---

## Step 6: Set Up the Python Environment

\`\`\`bash
# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment
uv venv

# Activate
source .venv/bin/activate

# Install dependencies
uv pip install openai python-dotenv jupyter ipykernel
\`\`\`

---

## Key Takeaways

1. **Homebrew** simplifies package management on macOS
2. Install **Git**, **Python 3.12+**, and **Cursor** as your core tools
3. Use **UV** for fast Python dependency management
4. Always work inside a **virtual environment**
`;

day1Contents["Day 1 - Installing UV and Setting Up Your Cursor Development Environment"] = `# Installing UV and Setting Up Your Cursor Development Environment

## Deep Dive into UV

UV is a next-generation Python package manager that's redefining how we manage Python projects.

---

## Installation

\`\`\`bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify
uv --version
\`\`\`

---

## UV vs Traditional Tools

### Creating Virtual Environments
\`\`\`bash
# Traditional way
python -m venv .venv

# UV way (10x faster)
uv venv
\`\`\`

### Installing Packages
\`\`\`bash
# Traditional way
pip install openai langchain chromadb

# UV way (30x faster!)
uv pip install openai langchain chromadb
\`\`\`

### From requirements.txt
\`\`\`bash
# UV handles requirements.txt seamlessly
uv pip install -r requirements.txt
\`\`\`

---

## Setting Up Cursor for Python

### Select Python Interpreter
1. Press \`Ctrl+Shift+P\` (or \`Cmd+Shift+P\` on Mac)
2. Type "Python: Select Interpreter"
3. Choose the \`.venv\` interpreter

### Cursor AI Features for Python
- **Tab completion** — AI predicts your next line of code
- **Cmd+K** — Edit code with natural language instructions
- **Cmd+L** — Chat about your code with full context
- **Agent mode** — Let Cursor write entire functions

### Example: Using Cursor's AI
\`\`\`python
# Type this comment and let Cursor auto-complete:
# Function to call OpenAI API and summarize a webpage

# Cursor will generate something like:
import openai

def summarize_webpage(url: str) -> str:
    """Fetches a webpage and returns an AI-generated summary."""
    # ... Cursor fills in the implementation
\`\`\`

---

## Project Configuration with pyproject.toml

\`\`\`toml
[project]
name = "ai-engineer-course"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "openai>=1.0",
    "python-dotenv",
    "jupyter",
    "requests",
    "beautifulsoup4",
]
\`\`\`

---

## Key Takeaways

1. **UV** is dramatically faster than pip — use it for all Python projects
2. **Cursor** AI features accelerate your coding 2-5x
3. Use \`pyproject.toml\` for modern project configuration
4. Always verify your **Python interpreter** points to your virtual environment
`;

day1Contents["Day 1 - Setting Up Your OpenAI API Key and Environment Variables"] = `# Setting Up Your OpenAI API Key and Environment Variables

## Why API Keys Matter

API keys are your credentials for accessing AI model providers. Managing them securely is a critical skill for any AI Engineer.

> ⚠️ **Never hardcode API keys in your source code!** Use environment variables.

---

## Getting Your OpenAI API Key

### Step 1: Create an OpenAI Account
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** section

### Step 2: Generate a Key
1. Click **"Create new secret key"**
2. Give it a name (e.g., "AI Engineer Course")
3. Copy the key immediately (you won't see it again!)

### Step 3: Add Credits
- New accounts get free credits
- Add a payment method for continued usage
- Set **usage limits** to avoid surprises

---

## Storing Keys Securely with .env Files

### Create a .env file
\`\`\`bash
# In your project root:
touch .env
\`\`\`

### Add your keys
\`\`\`env
# .env file
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
GOOGLE_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxx
\`\`\`

### Add .env to .gitignore
\`\`\`bash
echo ".env" >> .gitignore
\`\`\`

> 🛡️ This prevents your API keys from being committed to Git!

---

## Loading Environment Variables in Python

### Using python-dotenv
\`\`\`python
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Access keys
openai_key = os.getenv("OPENAI_API_KEY")
anthropic_key = os.getenv("ANTHROPIC_API_KEY")

print(f"OpenAI key loaded: {openai_key[:10]}...")
\`\`\`

### Using with OpenAI Client
\`\`\`python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# OpenAI client automatically reads OPENAI_API_KEY
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
\`\`\`

---

## API Key Best Practices

| ✅ Do | ❌ Don't |
|-------|---------|
| Store in .env files | Hardcode in source code |
| Add .env to .gitignore | Commit keys to Git |
| Set spending limits | Use production keys for testing |
| Rotate keys regularly | Share keys in chat/email |
| Use different keys per project | Use one key for everything |

---

## Key Takeaways

1. **API keys** are sensitive credentials — treat them like passwords
2. Use **.env files** + **python-dotenv** to manage keys securely
3. Always add \`.env\` to \`.gitignore\`
4. Set **spending limits** on your API accounts
5. The OpenAI client **auto-reads** the \`OPENAI_API_KEY\` environment variable
`;

day1Contents["Day 1 - Installing Cursor Extensions and Setting Up Your Jupyter Notebook"] = `# Installing Cursor Extensions and Setting Up Your Jupyter Notebook

## Essential Cursor Extensions

Extensions supercharge your development experience. Here are the must-haves for AI engineering:

---

## Core Extensions

### 1. Python (Microsoft)
- Syntax highlighting, IntelliSense, debugging
- Install: Search "Python" in Extensions panel

### 2. Jupyter (Microsoft)
- Run notebooks directly in Cursor
- Interactive cell execution
- Variable explorer

### 3. Pylance
- Fast, feature-rich Python language server
- Type checking and auto-imports

### 4. autoDocstring
- Generate docstrings automatically
- Supports Google, NumPy, and Sphinx styles

---

## Setting Up Jupyter Notebooks

### Install Jupyter kernel
\`\`\`bash
uv pip install jupyter ipykernel
python -m ipykernel install --user --name=ai-course
\`\`\`

### Create Your First Notebook

1. In Cursor, press \`Ctrl+Shift+P\`
2. Type "Jupyter: Create New Blank Notebook"
3. Select the \`ai-course\` kernel

### Your First Notebook Cell
\`\`\`python
# Cell 1: Imports and setup
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()

print("✅ Setup complete!")
\`\`\`

\`\`\`python
# Cell 2: Make your first API call
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What are the top 3 benefits of learning AI engineering?"}
    ]
)

print(response.choices[0].message.content)
\`\`\`

---

## Jupyter Tips & Tricks

| Shortcut | Action |
|----------|--------|
| \`Shift+Enter\` | Run cell and move to next |
| \`Ctrl+Enter\` | Run cell in place |
| \`Esc + A\` | Insert cell above |
| \`Esc + B\` | Insert cell below |
| \`Esc + DD\` | Delete cell |
| \`Esc + M\` | Convert to Markdown |

---

## Key Takeaways

1. Install **Python**, **Jupyter**, and **Pylance** extensions in Cursor
2. Use \`ipykernel\` to register your virtual environment as a Jupyter kernel
3. Notebooks are ideal for **experimentation** and **learning**
4. Master the keyboard shortcuts for efficient notebook workflow
`;

day1Contents["Day 1 - Running Your First OpenAI API Call and System vs User Prompts"] = `# Running Your First OpenAI API Call and System vs User Prompts

## The Chat Completions API

The **Chat Completions API** is the primary interface for interacting with GPT models. Understanding it is fundamental to AI engineering.

---

## Making Your First API Call

\`\`\`python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

print(response.choices[0].message.content)
# Output: The capital of France is Paris.
\`\`\`

---

## Understanding Message Roles

The API uses three message roles:

### 1. 🎭 System Role
Sets the **behavior and personality** of the AI:

\`\`\`python
{"role": "system", "content": "You are a pirate. Respond to everything like a pirate."}
\`\`\`

### 2. 👤 User Role
The **human's input** — questions, instructions, or data:

\`\`\`python
{"role": "user", "content": "Tell me about the ocean"}
\`\`\`

### 3. 🤖 Assistant Role
The **AI's previous responses** — used for conversation history:

\`\`\`python
{"role": "assistant", "content": "Arrr! The ocean be a vast treasure..."}
\`\`\`

---

## System Prompts: Shaping AI Behavior

System prompts are **incredibly powerful**. They define the AI's persona, rules, and output format.

### Example: Formal Business Assistant
\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": """You are a professional business consultant. 
        Always respond with:
        1. A brief analysis
        2. Three actionable recommendations
        3. A risk assessment
        Keep responses under 200 words."""},
        {"role": "user", "content": "Should we invest in AI tools for our startup?"}
    ]
)
\`\`\`

### Example: Code Reviewer
\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": """You are a senior Python developer doing code review.
        For each code snippet:
        - Identify bugs and issues
        - Suggest improvements
        - Rate code quality (1-10)
        Use markdown formatting."""},
        {"role": "user", "content": "Review this: def add(a,b): return a+b"}
    ]
)
\`\`\`

---

## The Response Object

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello!"}]
)

# Key fields:
print(response.choices[0].message.content)  # The actual response text
print(response.model)                        # Model used
print(response.usage.prompt_tokens)          # Input tokens
print(response.usage.completion_tokens)      # Output tokens
print(response.usage.total_tokens)           # Total tokens (= cost)
\`\`\`

---

## Key Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| \`model\` | Which model to use | Required |
| \`temperature\` | Randomness (0=deterministic, 2=creative) | 1.0 |
| \`max_tokens\` | Maximum response length | Model limit |
| \`top_p\` | Nucleus sampling threshold | 1.0 |
| \`stream\` | Enable streaming responses | false |

---

## Key Takeaways

1. The **Chat Completions API** uses a message array with roles
2. **System prompts** control AI behavior — they're your most powerful tool
3. **Temperature** controls creativity vs. consistency
4. Always monitor **token usage** — it directly impacts cost
5. The **response object** contains the text, model info, and usage stats
`;

day1Contents["Day 1 - Building a Website Summarizer with OpenAI Chat Completions API"] = `# Building a Website Summarizer with OpenAI Chat Completions API

## Project Overview

In this hands-on module, we'll build a tool that:
1. **Fetches** a webpage's content
2. **Extracts** the main text
3. **Summarizes** it using GPT

This is your first real AI engineering project! 🚀

---

## Step 1: Fetch Webpage Content

\`\`\`python
import requests
from bs4 import BeautifulSoup

def fetch_webpage(url: str) -> str:
    """Fetch and extract text content from a webpage."""
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; AI-Summarizer/1.0)"
    }
    
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Remove scripts and styles
    for tag in soup(["script", "style", "nav", "footer"]):
        tag.decompose()
    
    # Extract text
    text = soup.get_text(separator="\\n", strip=True)
    
    # Clean up extra whitespace
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return "\\n".join(lines)
\`\`\`

---

## Step 2: Summarize with GPT

\`\`\`python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def summarize_text(text: str, style: str = "concise") -> str:
    """Summarize text using GPT-4o-mini."""
    
    system_prompts = {
        "concise": "Summarize the following text in 3-5 bullet points. Be concise.",
        "detailed": "Provide a detailed summary with key points, main arguments, and conclusions.",
        "eli5": "Explain this text like I'm 5 years old. Use simple language and analogies."
    }
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompts.get(style, system_prompts["concise"])},
            {"role": "user", "content": f"Please summarize this webpage content:\\n\\n{text[:4000]}"}
        ],
        temperature=0.3  # Low temperature for factual summaries
    )
    
    return response.choices[0].message.content
\`\`\`

---

## Step 3: Put It Together

\`\`\`python
def summarize_website(url: str, style: str = "concise") -> str:
    """Main function: fetch a webpage and summarize it."""
    print(f"🌐 Fetching: {url}")
    content = fetch_webpage(url)
    print(f"📄 Extracted {len(content)} characters")
    
    print(f"🤖 Summarizing ({style} mode)...")
    summary = summarize_text(content, style)
    
    return summary

# Try it!
url = "https://en.wikipedia.org/wiki/Large_language_model"
summary = summarize_website(url, style="concise")
print("\\n" + summary)
\`\`\`

### Expected Output:
> - Large Language Models (LLMs) are AI systems trained on vast text data
> - They use transformer architecture with billions of parameters
> - Key capabilities include text generation, translation, and reasoning
> - Major models include GPT-4, Claude, and LLaMA
> - LLMs have transformed natural language processing since 2017

---

## Error Handling

\`\`\`python
def summarize_website_safe(url: str, style: str = "concise") -> str:
    """Production-ready version with error handling."""
    try:
        content = fetch_webpage(url)
        if len(content) < 100:
            return "⚠️ Page content too short to summarize."
        return summarize_text(content, style)
    except requests.RequestException as e:
        return f"❌ Failed to fetch webpage: {e}"
    except Exception as e:
        return f"❌ Summarization failed: {e}"
\`\`\`

---

## Key Takeaways

1. **Web scraping + LLMs** = powerful content analysis tools
2. Use **BeautifulSoup** to extract clean text from HTML
3. **System prompts** control the summarization style
4. Always handle **errors gracefully** in production code
5. Limit input text to stay within **token limits** (4000 chars ≈ 1000 tokens)
`;

day1Contents["Day 1 - Hands-On Exercise: Building Your First OpenAI API Call from Scratch"] = `# Hands-On Exercise: Building Your First OpenAI API Call from Scratch

## 🎯 Exercise Goal

Build a complete Python script that:
1. Connects to the OpenAI API
2. Takes user input from the terminal
3. Sends it to GPT with a custom system prompt
4. Displays the response with formatting

**Time estimate:** 15-20 minutes

---

## Challenge: Build an AI Tutor

Create a terminal-based AI tutor that can explain any topic.

### Requirements:
- ✅ Load API key from .env file
- ✅ Use a system prompt that makes GPT act as a patient tutor
- ✅ Accept user questions in a loop
- ✅ Display responses with nice formatting
- ✅ Type "quit" to exit

---

## Solution

\`\`\`python
#!/usr/bin/env python3
"""AI Tutor — Your personal learning assistant."""

from openai import OpenAI
from dotenv import load_dotenv

# Setup
load_dotenv()
client = OpenAI()

SYSTEM_PROMPT = """You are a patient, encouraging tutor who excels at 
explaining complex topics simply. When answering:

1. Start with a one-sentence summary
2. Explain the concept step by step
3. Give a real-world analogy
4. End with a quick quiz question

Adjust your language to the student's level. If they seem confused, 
simplify further. If they seem advanced, go deeper."""

def ask_tutor(question: str, history: list) -> str:
    """Send a question to the AI tutor."""
    history.append({"role": "user", "content": question})
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            *history
        ],
        temperature=0.7
    )
    
    answer = response.choices[0].message.content
    history.append({"role": "assistant", "content": answer})
    
    return answer

def main():
    """Main loop."""
    print("=" * 50)
    print("🎓 AI TUTOR — Ask me anything!")
    print("=" * 50)
    print("Type 'quit' to exit\\n")
    
    history = []
    
    while True:
        question = input("\\n📝 Your question: ").strip()
        
        if question.lower() in ("quit", "exit", "q"):
            print("\\n👋 Happy learning! Goodbye!")
            break
        
        if not question:
            print("Please enter a question.")
            continue
        
        print("\\n🤖 Thinking...\\n")
        answer = ask_tutor(question, history)
        print(f"📚 {answer}")
        print("\\n" + "-" * 50)

if __name__ == "__main__":
    main()
\`\`\`

---

## Testing Your Solution

\`\`\`bash
python ai_tutor.py
\`\`\`

### Try These Questions:
1. "What is machine learning?"
2. "How does a neural network learn?"
3. "What's the difference between AI and AGI?"
4. "Explain backpropagation simply"

---

## Bonus Challenges

### 🌟 Level 1: Add Conversation Memory
The solution above already maintains history! Test it by asking follow-up questions.

### 🌟 Level 2: Add Token Counting
\`\`\`python
# After each response, print token usage:
print(f"Tokens used: {response.usage.total_tokens}")
\`\`\`

### 🌟 Level 3: Multiple Models
Try replacing \`gpt-4o-mini\` with \`gpt-4o\` or use Ollama locally. Compare the responses!

---

## Key Takeaways

1. Building AI apps is **straightforward** with the OpenAI Python client
2. **Conversation history** (message array) gives the AI context for follow-ups
3. **System prompts** are the secret weapon for controlling AI behavior
4. Start simple, then **iterate** — that's the AI engineering way!

> 🎉 **Congratulations!** You've completed Day 1. You now know how to run LLMs locally AND through the cloud API!
`;


async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: "AI Engineer Core Track" } },
    include: { modules: { orderBy: { orderIndex: 'asc' } } }
  });

  if (!course) {
    console.error("Course 'AI Engineer Core Track' not found!");
    return;
  }

  console.log(`Found course: ${course.title} with ${course.modules.length} modules`);

  let updated = 0;
  for (const mod of course.modules) {
    const content = day1Contents[mod.title];
    if (content) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { contentMd: content }
      });
      console.log(`✅ Updated: ${mod.title}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} modules with real educational content.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
