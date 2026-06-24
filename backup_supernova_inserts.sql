--
-- PostgreSQL database dump
--


-- Dumped from database version 15.18
-- Dumped by pg_dump version 15.18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."WorkspaceNote" DROP CONSTRAINT IF EXISTS "WorkspaceNote_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserModuleProgress" DROP CONSTRAINT IF EXISTS "UserModuleProgress_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserModuleProgress" DROP CONSTRAINT IF EXISTS "UserModuleProgress_moduleId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserCourse" DROP CONSTRAINT IF EXISTS "UserCourse_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserCourse" DROP CONSTRAINT IF EXISTS "UserCourse_courseId_fkey";
ALTER TABLE IF EXISTS ONLY public."ReadingBook" DROP CONSTRAINT IF EXISTS "ReadingBook_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."ProductivityItem" DROP CONSTRAINT IF EXISTS "ProductivityItem_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."FinanceTransaction" DROP CONSTRAINT IF EXISTS "FinanceTransaction_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."FinanceCategory" DROP CONSTRAINT IF EXISTS "FinanceCategory_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."ExpHistory" DROP CONSTRAINT IF EXISTS "ExpHistory_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."CourseModule" DROP CONSTRAINT IF EXISTS "CourseModule_courseId_fkey";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."UserModuleProgress_userId_moduleId_key";
DROP INDEX IF EXISTS public."UserCourse_userId_courseId_key";
ALTER TABLE IF EXISTS ONLY public."WorkspaceNote" DROP CONSTRAINT IF EXISTS "WorkspaceNote_pkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."UserModuleProgress" DROP CONSTRAINT IF EXISTS "UserModuleProgress_pkey";
ALTER TABLE IF EXISTS ONLY public."UserCourse" DROP CONSTRAINT IF EXISTS "UserCourse_pkey";
ALTER TABLE IF EXISTS ONLY public."ReadingBook" DROP CONSTRAINT IF EXISTS "ReadingBook_pkey";
ALTER TABLE IF EXISTS ONLY public."ProductivityItem" DROP CONSTRAINT IF EXISTS "ProductivityItem_pkey";
ALTER TABLE IF EXISTS ONLY public."FinanceTransaction" DROP CONSTRAINT IF EXISTS "FinanceTransaction_pkey";
ALTER TABLE IF EXISTS ONLY public."FinanceCategory" DROP CONSTRAINT IF EXISTS "FinanceCategory_pkey";
ALTER TABLE IF EXISTS ONLY public."ExpHistory" DROP CONSTRAINT IF EXISTS "ExpHistory_pkey";
ALTER TABLE IF EXISTS ONLY public."Course" DROP CONSTRAINT IF EXISTS "Course_pkey";
ALTER TABLE IF EXISTS ONLY public."CourseModule" DROP CONSTRAINT IF EXISTS "CourseModule_pkey";
DROP TABLE IF EXISTS public."WorkspaceNote";
DROP TABLE IF EXISTS public."UserModuleProgress";
DROP TABLE IF EXISTS public."UserCourse";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."ReadingBook";
DROP TABLE IF EXISTS public."ProductivityItem";
DROP TABLE IF EXISTS public."FinanceTransaction";
DROP TABLE IF EXISTS public."FinanceCategory";
DROP TABLE IF EXISTS public."ExpHistory";
DROP TABLE IF EXISTS public."CourseModule";
DROP TABLE IF EXISTS public."Course";
DROP TYPE IF EXISTS public."ProductivityType";
--
-- Name: ProductivityType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ProductivityType" AS ENUM (
    'TODO',
    'WEEKLY',
    'HABIT'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Course; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Course" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    thumbnail text,
    "totalDuration" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: CourseModule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CourseModule" (
    id text NOT NULL,
    "courseId" text NOT NULL,
    title text NOT NULL,
    duration text NOT NULL,
    "orderIndex" integer NOT NULL,
    "contentMd" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ExpHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ExpHistory" (
    id text NOT NULL,
    "userId" text NOT NULL,
    amount integer NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: FinanceCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FinanceCategory" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    name text NOT NULL,
    icon text NOT NULL,
    color text NOT NULL,
    bg text NOT NULL,
    border text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: FinanceTransaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FinanceTransaction" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    amount double precision NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ProductivityItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProductivityItem" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."ProductivityType" NOT NULL,
    title text NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    day text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastCompleted" timestamp(3) without time zone,
    streak integer DEFAULT 0 NOT NULL
);


--
-- Name: ReadingBook; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ReadingBook" (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    "totalPages" integer DEFAULT 0 NOT NULL,
    "readPages" integer DEFAULT 0 NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "currentChapter" text,
    status text DEFAULT 'PLAN_TO_READ'::text NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    exp integer DEFAULT 0 NOT NULL,
    gold integer DEFAULT 50 NOT NULL,
    level integer DEFAULT 1 NOT NULL,
    "maxExp" integer DEFAULT 1000 NOT NULL,
    "playerClass" text DEFAULT 'Novice Scholar'::text NOT NULL
);


--
-- Name: UserCourse; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserCourse" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "courseId" text NOT NULL,
    "progressPercent" double precision DEFAULT 0.0 NOT NULL,
    status text DEFAULT 'LEARNING'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UserModuleProgress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserModuleProgress" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "moduleId" text NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    "completedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: WorkspaceNote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."WorkspaceNote" (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Course" VALUES ('a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents', 'An intensive 8-week bootcamp covering LLM Engineering, RAG, Agentic Workflows, and QLoRA.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop', '33h 27m', '2026-06-23 07:35:42.172', '2026-06-23 07:35:42.172');
INSERT INTO public."Course" VALUES ('68605e1d-cabf-49fe-8972-57a5820b4b5c', 'AI Engineer Agentic Track: The Complete Agent & MCP Course', 'Learn how to build autonomous agents, multi-agent systems, and integrate with the Model Context Protocol (MCP).', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop', '24h 15m', '2026-06-23 07:46:43.046', '2026-06-23 07:46:43.046');
INSERT INTO public."Course" VALUES ('12869644-eae2-4391-8682-e01076756fa1', 'The AI Engineer Course 2026', 'The ultimate guide to AI Engineering for the modern era. Master the latest techniques and models.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop', '40h 0m', '2026-06-23 07:46:43.063', '2026-06-23 07:46:43.063');
INSERT INTO public."Course" VALUES ('12f34d37-b611-453e-b5a5-ed9ab58e6490', 'AI for Accounting Professionals', 'Automate your accounting workflows, build custom AI tools, and modernize your financial analysis.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop', '12h 30m', '2026-06-23 07:46:43.076', '2026-06-23 07:46:43.076');
INSERT INTO public."Course" VALUES ('ca0086a6-27a7-4103-809f-5854b91a3afb', 'Physics for Beginners', 'A comprehensive introduction to the fundamentals of physics. Learn mechanics, thermodynamics, and electromagnetism.', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600&auto=format&fit=crop', '18h 45m', '2026-06-23 07:46:43.088', '2026-06-23 07:46:43.088');
INSERT INTO public."Course" VALUES ('e7507ab9-267f-4d89-90bc-6d0d8bb6438c', 'Quantum Physics from Beginner to Expert', 'Dive deep into the quantum realm. Understand wave-particle duality, quantum entanglement, and quantum computing.', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop', '35h 20m', '2026-06-23 07:46:43.1', '2026-06-23 07:46:43.1');


--
-- Data for Name: CourseModule; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."CourseModule" VALUES ('4ec95750-d6ed-4d92-9236-44e688eeeb1c', '12869644-eae2-4391-8682-e01076756fa1', 'Module 4: Introduction to The', '45m', 4, '# Module 4

## Module Content

Welcome to **Module 4**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 4

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.07', '2026-06-23 07:46:43.07');
INSERT INTO public."CourseModule" VALUES ('b161b3c2-5a86-4575-a110-7cf53f2cf57a', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Setting Up Your LLM Development Environment with Cursor and UV', '5:54', 4, '# Setting Up Your LLM Development Environment with Cursor and UV

## Overview

A proper development environment is crucial for AI engineering. In this module, we''ll set up **Cursor** (an AI-powered code editor) and **UV** (a blazing-fast Python package manager).

---

## What is Cursor?

**Cursor** is a fork of VS Code with built-in AI capabilities:
- ?? **AI-powered autocomplete** — Understands your entire codebase
- ?? **Inline chat** — Ask questions about code directly in the editor
- ? **Agent mode** — Let AI write entire features for you
- ?? **VS Code compatible** — All your extensions and settings work

### Installing Cursor
1. Go to [cursor.com](https://cursor.com)
2. Download for your OS
3. Install and sign in

---

## What is UV?

**UV** is an extremely fast Python package manager written in Rust. It''s a drop-in replacement for `pip`, `virtualenv`, and `pip-tools`.

### Why UV over pip?
| Feature | pip | UV |
|---------|-----|-----|
| Speed | ~30s for typical install | ~1s (30x faster!) |
| Lock files | ? | ? |
| Virtual envs | Separate tool | Built-in |
| Resolution | Basic | Advanced |

### Installing UV

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify installation
uv --version
```

---

## Setting Up Your Project

### Step 1: Create a new project
```bash
mkdir ai-engineer-course
cd ai-engineer-course
uv init
```

### Step 2: Create a virtual environment
```bash
uv venv
# Activate it:
# macOS/Linux: source .venv/bin/activate
# Windows: .venv\Scripts\activate
```

### Step 3: Install dependencies
```bash
uv pip install openai python-dotenv jupyter
```

### Step 4: Open in Cursor
```bash
cursor .
```

---

## Configuring Cursor for AI Development

### Recommended Extensions
1. **Python** — Language support
2. **Jupyter** — Notebook support  
3. **GitHub Copilot** — Additional AI assistance
4. **Pylance** — Type checking

### Cursor Settings
```json
{
    "editor.fontSize": 14,
    "python.defaultInterpreterPath": ".venv/bin/python",
    "jupyter.notebookFileRoot": "${workspaceFolder}"
}
```

---

## Project Structure

```
ai-engineer-course/
+-- .venv/              # Virtual environment
+-- .env                # API keys (never commit!)
+-- notebooks/          # Jupyter notebooks
¦   +-- day1.ipynb
+-- src/                # Python modules
+-- pyproject.toml      # Project config
+-- README.md
```

---

## Key Takeaways

1. **Cursor** gives you AI superpowers in your editor
2. **UV** is dramatically faster than pip for package management
3. Always use **virtual environments** to isolate project dependencies
4. Keep your **API keys in .env files** and never commit them to git
', '2026-06-23 07:36:04.942', '2026-06-23 08:08:17.277');
INSERT INTO public."CourseModule" VALUES ('a1d274cb-e5b9-4683-a606-f74a319d1238', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Setting Up Your PC Development Environment with Git and Cursor', '9:50', 5, '# Setting Up Your PC Development Environment with Git and Cursor

## Overview

This module walks Windows users through setting up a complete AI development environment from scratch.

---

## Step 1: Install Git

Git is essential for version control and cloning course repositories.

### Download & Install
1. Go to [git-scm.com](https://git-scm.com/download/win)
2. Download the installer
3. During installation, select these options:
   - ? **Git Bash** (provides a Unix-like terminal)
   - ? **Add Git to PATH**
   - ? **Use VS Code/Cursor as default editor**

### Verify Installation
```powershell
git --version
# Output: git version 2.45.x
```

### Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## Step 2: Clone the Course Repository

```bash
cd ~/Documents
git clone https://github.com/your-course-repo/ai-engineer-course.git
cd ai-engineer-course
```

---

## Step 3: Install Python

### Using the Microsoft Store
1. Open Microsoft Store
2. Search for "Python 3.12"
3. Click Install

### Or download from python.org
```powershell
# Verify installation
python --version
# Output: Python 3.12.x

# Verify pip
pip --version
```

> ?? **Important:** Make sure to check "Add Python to PATH" during installation!

---

## Step 4: Install Cursor

1. Download from [cursor.com](https://cursor.com)
2. Run the installer
3. Launch Cursor
4. Sign in with your account
5. Import VS Code settings if you have them

### Opening the Project
```powershell
cd ~/Documents/ai-engineer-course
cursor .
```

---

## Step 5: Terminal Setup in Cursor

Cursor has a built-in terminal. Open it with `Ctrl + \``

### Recommended: Use Git Bash in Cursor
1. Open Settings (`Ctrl + ,`)
2. Search for "terminal default profile"
3. Set Windows default to **Git Bash**

---

## Common Windows Issues

### Python not found
```powershell
# Add Python to PATH manually
$env:Path += ";C:\Users\YourName\AppData\Local\Programs\Python\Python312"
```

### Permission errors
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Long path support
```powershell
# Enable long paths (run as Admin)
git config --system core.longpaths true
```

---

## Key Takeaways

1. **Git** is your foundation for version control — install it first
2. **Python 3.12+** is required for this course
3. **Cursor** is our primary IDE — it''s VS Code with AI superpowers
4. Use **Git Bash** as your terminal on Windows for consistency
', '2026-06-23 07:36:04.944', '2026-06-23 08:08:17.279');
INSERT INTO public."CourseModule" VALUES ('a2ce5174-f2d7-446a-8598-4867621d9287', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Installing UV and Setting Up Your Cursor Development Environment', '7:52', 7, '# Installing UV and Setting Up Your Cursor Development Environment

## Deep Dive into UV

UV is a next-generation Python package manager that''s redefining how we manage Python projects.

---

## Installation

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify
uv --version
```

---

## UV vs Traditional Tools

### Creating Virtual Environments
```bash
# Traditional way
python -m venv .venv

# UV way (10x faster)
uv venv
```

### Installing Packages
```bash
# Traditional way
pip install openai langchain chromadb

# UV way (30x faster!)
uv pip install openai langchain chromadb
```

### From requirements.txt
```bash
# UV handles requirements.txt seamlessly
uv pip install -r requirements.txt
```

---

## Setting Up Cursor for Python

### Select Python Interpreter
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Python: Select Interpreter"
3. Choose the `.venv` interpreter

### Cursor AI Features for Python
- **Tab completion** — AI predicts your next line of code
- **Cmd+K** — Edit code with natural language instructions
- **Cmd+L** — Chat about your code with full context
- **Agent mode** — Let Cursor write entire functions

### Example: Using Cursor''s AI
```python
# Type this comment and let Cursor auto-complete:
# Function to call OpenAI API and summarize a webpage

# Cursor will generate something like:
import openai

def summarize_webpage(url: str) -> str:
    """Fetches a webpage and returns an AI-generated summary."""
    # ... Cursor fills in the implementation
```

---

## Project Configuration with pyproject.toml

```toml
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
```

---

## Key Takeaways

1. **UV** is dramatically faster than pip — use it for all Python projects
2. **Cursor** AI features accelerate your coding 2-5x
3. Use `pyproject.toml` for modern project configuration
4. Always verify your **Python interpreter** points to your virtual environment
', '2026-06-23 07:36:04.952', '2026-06-23 08:08:17.282');
INSERT INTO public."CourseModule" VALUES ('2f70e195-e80d-47a9-8a7d-abac9cb6be8c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Running Your First OpenAI API Call and System vs User Prompts', '11:41', 10, '# Running Your First OpenAI API Call and System vs User Prompts

## The Chat Completions API

The **Chat Completions API** is the primary interface for interacting with GPT models. Understanding it is fundamental to AI engineering.

---

## Making Your First API Call

```python
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
```

---

## Understanding Message Roles

The API uses three message roles:

### 1. ?? System Role
Sets the **behavior and personality** of the AI:

```python
{"role": "system", "content": "You are a pirate. Respond to everything like a pirate."}
```

### 2. ?? User Role
The **human''s input** — questions, instructions, or data:

```python
{"role": "user", "content": "Tell me about the ocean"}
```

### 3. ?? Assistant Role
The **AI''s previous responses** — used for conversation history:

```python
{"role": "assistant", "content": "Arrr! The ocean be a vast treasure..."}
```

---

## System Prompts: Shaping AI Behavior

System prompts are **incredibly powerful**. They define the AI''s persona, rules, and output format.

### Example: Formal Business Assistant
```python
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
```

### Example: Code Reviewer
```python
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
```

---

## The Response Object

```python
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
```

---

## Key Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `model` | Which model to use | Required |
| `temperature` | Randomness (0=deterministic, 2=creative) | 1.0 |
| `max_tokens` | Maximum response length | Model limit |
| `top_p` | Nucleus sampling threshold | 1.0 |
| `stream` | Enable streaming responses | false |

---

## Key Takeaways

1. The **Chat Completions API** uses a message array with roles
2. **System prompts** control AI behavior — they''re your most powerful tool
3. **Temperature** controls creativity vs. consistency
4. Always monitor **token usage** — it directly impacts cost
5. The **response object** contains the text, model info, and usage stats
', '2026-06-23 07:36:04.96', '2026-06-23 08:08:17.291');
INSERT INTO public."CourseModule" VALUES ('a95a2453-3a38-4e2a-9999-75a3363215b1', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Building a Website Summarizer with OpenAI Chat Completions API', '10:14', 11, '# Building a Website Summarizer with OpenAI Chat Completions API

## Project Overview

In this hands-on module, we''ll build a tool that:
1. **Fetches** a webpage''s content
2. **Extracts** the main text
3. **Summarizes** it using GPT

This is your first real AI engineering project! ??

---

## Step 1: Fetch Webpage Content

```python
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
    text = soup.get_text(separator="\n", strip=True)
    
    # Clean up extra whitespace
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return "\n".join(lines)
```

---

## Step 2: Summarize with GPT

```python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def summarize_text(text: str, style: str = "concise") -> str:
    """Summarize text using GPT-4o-mini."""
    
    system_prompts = {
        "concise": "Summarize the following text in 3-5 bullet points. Be concise.",
        "detailed": "Provide a detailed summary with key points, main arguments, and conclusions.",
        "eli5": "Explain this text like I''m 5 years old. Use simple language and analogies."
    }
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompts.get(style, system_prompts["concise"])},
            {"role": "user", "content": f"Please summarize this webpage content:\n\n{text[:4000]}"}
        ],
        temperature=0.3  # Low temperature for factual summaries
    )
    
    return response.choices[0].message.content
```

---

## Step 3: Put It Together

```python
def summarize_website(url: str, style: str = "concise") -> str:
    """Main function: fetch a webpage and summarize it."""
    print(f"?? Fetching: {url}")
    content = fetch_webpage(url)
    print(f"?? Extracted {len(content)} characters")
    
    print(f"?? Summarizing ({style} mode)...")
    summary = summarize_text(content, style)
    
    return summary

# Try it!
url = "https://en.wikipedia.org/wiki/Large_language_model"
summary = summarize_website(url, style="concise")
print("\n" + summary)
```

### Expected Output:
> - Large Language Models (LLMs) are AI systems trained on vast text data
> - They use transformer architecture with billions of parameters
> - Key capabilities include text generation, translation, and reasoning
> - Major models include GPT-4, Claude, and LLaMA
> - LLMs have transformed natural language processing since 2017

---

## Error Handling

```python
def summarize_website_safe(url: str, style: str = "concise") -> str:
    """Production-ready version with error handling."""
    try:
        content = fetch_webpage(url)
        if len(content) < 100:
            return "?? Page content too short to summarize."
        return summarize_text(content, style)
    except requests.RequestException as e:
        return f"? Failed to fetch webpage: {e}"
    except Exception as e:
        return f"? Summarization failed: {e}"
```

---

## Key Takeaways

1. **Web scraping + LLMs** = powerful content analysis tools
2. Use **BeautifulSoup** to extract clean text from HTML
3. **System prompts** control the summarization style
4. Always handle **errors gracefully** in production code
5. Limit input text to stay within **token limits** (4000 chars ˜ 1000 tokens)
', '2026-06-23 07:36:04.964', '2026-06-23 08:08:17.293');
INSERT INTO public."CourseModule" VALUES ('29bd1460-3651-4530-a9a6-ca4f9d5f7f1c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Hands-On Exercise: Building Your First OpenAI API Call from Scratch', '5:34', 12, '# Hands-On Exercise: Building Your First OpenAI API Call from Scratch

## ?? Exercise Goal

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
- ? Load API key from .env file
- ? Use a system prompt that makes GPT act as a patient tutor
- ? Accept user questions in a loop
- ? Display responses with nice formatting
- ? Type "quit" to exit

---

## Solution

```python
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

Adjust your language to the student''s level. If they seem confused, 
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
    print("?? AI TUTOR — Ask me anything!")
    print("=" * 50)
    print("Type ''quit'' to exit\n")
    
    history = []
    
    while True:
        question = input("\n?? Your question: ").strip()
        
        if question.lower() in ("quit", "exit", "q"):
            print("\n?? Happy learning! Goodbye!")
            break
        
        if not question:
            print("Please enter a question.")
            continue
        
        print("\n?? Thinking...\n")
        answer = ask_tutor(question, history)
        print(f"?? {answer}")
        print("\n" + "-" * 50)

if __name__ == "__main__":
    main()
```

---

## Testing Your Solution

```bash
python ai_tutor.py
```

### Try These Questions:
1. "What is machine learning?"
2. "How does a neural network learn?"
3. "What''s the difference between AI and AGI?"
4. "Explain backpropagation simply"

---

## Bonus Challenges

### ?? Level 1: Add Conversation Memory
The solution above already maintains history! Test it by asking follow-up questions.

### ?? Level 2: Add Token Counting
```python
# After each response, print token usage:
print(f"Tokens used: {response.usage.total_tokens}")
```

### ?? Level 3: Multiple Models
Try replacing `gpt-4o-mini` with `gpt-4o` or use Ollama locally. Compare the responses!

---

## Key Takeaways

1. Building AI apps is **straightforward** with the OpenAI Python client
2. **Conversation history** (message array) gives the AI context for follow-ups
3. **System prompts** are the secret weapon for controlling AI behavior
4. Start simple, then **iterate** — that''s the AI engineering way!

> ?? **Congratulations!** You''ve completed Day 1. You now know how to run LLMs locally AND through the cloud API!
', '2026-06-23 07:36:04.967', '2026-06-23 08:08:17.296');
INSERT INTO public."CourseModule" VALUES ('8fcf9287-ddc1-4090-a531-0968b08330c7', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - LLM Engineering Building Blocks: Models, Tools & Techniques', '9:22', 13, '# LLM Engineering Building Blocks: Models, Tools & Techniques

## Overview

Welcome to **Day 2**! Today we dive into the core building blocks every AI Engineer must understand. By the end of this module, you''ll have a mental model of the entire LLM ecosystem.

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

```
Models ? APIs ? Frameworks ? Your Application
         ?         ?
     OpenAI SDK  LangChain
     Ollama      LiteLLM
     HuggingFace Gradio
```

### 3. Techniques
Methods to get better results:
- **Prompt Engineering** — Crafting effective instructions
- **RAG** — Augmenting LLMs with external knowledge
- **Fine-Tuning** — Specializing models for your domain
- **Agents** — Autonomous multi-step problem solving

---

## How LLMs Actually Work (Simplified)

```
Input Text ? Tokenizer ? Neural Network ? Probability Distribution ? Output Token
                              ?
                    Billions of Parameters
                    (learned patterns)
```

LLMs predict the **next token** based on everything that came before. That''s it! But this simple mechanism produces remarkably intelligent behavior.

### Key Insight:
> LLMs don''t "understand" — they predict. But their predictions are so accurate that the distinction becomes philosophical.

---

## The API Landscape

### Cloud APIs (Pay-per-token)
```python
# OpenAI
from openai import OpenAI
client = OpenAI()  # Uses OPENAI_API_KEY

# Anthropic  
from anthropic import Anthropic
client = Anthropic()  # Uses ANTHROPIC_API_KEY

# Google
import google.generativeai as genai
genai.configure(api_key="...")
```

### Local APIs (Free, private)
```python
# Ollama (OpenAI-compatible)
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
```

---

## ?? Knowledge Check

> **Q1:** What''s the main difference between frontier and open-source models?
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
', '2026-06-23 07:36:04.969', '2026-06-23 08:16:14.309');
INSERT INTO public."CourseModule" VALUES ('b64f0168-3b65-4f26-aa60-2f10b6e5d9ce', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Frontier Models: OpenAI GPT, Claude, Gemini & Grok Compared', '6:14', 15, '# Frontier Models: OpenAI GPT, Claude, Gemini & Grok Compared

## The Big Four (Plus More)

Let''s compare the leading frontier models as of 2025-2026.

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
```
GPT-5:        128K tokens (~96K words)
Claude 4:     200K tokens (~150K words) ? Largest!
Gemini 2:     1M tokens (~750K words)  ? Experimental
Grok:         128K tokens (~96K words)
```

### Pricing (per 1M tokens, approximate)
```
GPT-5:        $5 input / $15 output
GPT-4o-mini:  $0.15 input / $0.60 output  ? Budget choice
Claude 4:     $3 input / $15 output
Gemini 2:     $3.50 input / $10.50 output
```

### When to Use Each

```python
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
```

---

## ?? Knowledge Check

> **Q1:** You need to analyze a 150-page legal contract. Which model should you choose and why?
>
> **A1:** Claude 4 — it has the largest reliable context window (200K tokens) and excels at careful, detailed analysis of long documents.

> **Q2:** You''re building a chatbot that handles 10,000 customer queries per day. Cost is a concern. Which model?
>
> **A2:** GPT-4o-mini — it''s the most cost-effective at $0.15/1M input tokens and handles simple tasks well.

> **Q3:** You need real-time information about a current event. Which model would help?
>
> **A3:** Grok — it has access to real-time data from X (Twitter) and the web.

---

## Key Takeaways

1. **No single model wins everything** — choose based on your specific task
2. **Cost vs. quality** is the primary tradeoff
3. **Context window** matters for long documents
4. Use **cheaper models** for simple tasks, **expensive** ones for complex reasoning
', '2026-06-23 07:36:04.974', '2026-06-23 08:16:14.315');
INSERT INTO public."CourseModule" VALUES ('e556c46e-0339-4569-87e8-e107b4911f7b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Open-Source LLMs: LLaMA, Mistral, DeepSeek, and Ollama', '12:03', 16, '# Open-Source LLMs: LLaMA, Mistral, DeepSeek, and Ollama

## Why Open-Source Matters

Open-source models have exploded in capability. Many now rival frontier models on specific tasks — and they''re free!

---

## The Major Open-Source Models

### ?? LLaMA (Meta)
- **Latest:** LLaMA 3.2 (1B, 3B, 11B, 90B)
- **Strengths:** Excellent base model, huge community, many fine-tunes
- **License:** Open (commercial use allowed)

### ??? Mistral
- **Latest:** Mistral Large 2, Mistral 7B
- **Strengths:** Great instruction following, efficient architecture
- **License:** Apache 2.0

### ?? DeepSeek
- **Latest:** DeepSeek V3, DeepSeek Coder
- **Strengths:** Strong reasoning, excellent at coding
- **License:** Open (with restrictions on some models)

### ?? Phi (Microsoft)
- **Latest:** Phi-3 (3.8B, 14B)
- **Strengths:** Best quality-per-parameter, runs on phones
- **License:** MIT

### ? Qwen (Alibaba)
- **Latest:** Qwen 2.5 (0.5B to 72B)
- **Strengths:** Multilingual, strong coding
- **License:** Apache 2.0

---

## Running with Ollama

```bash
# Download and run models
ollama run llama3.2          # Meta''s LLaMA
ollama run mistral           # Mistral 7B
ollama run deepseek-coder    # DeepSeek for coding
ollama run phi3              # Microsoft Phi-3
ollama run qwen2.5           # Alibaba Qwen

# List downloaded models
ollama list

# Remove a model
ollama rm mistral
```

---

## Comparing Models in Python

```python
from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

models = ["llama3.2", "mistral", "phi3"]
question = "Write a Python function to find prime numbers up to N"

for model in models:
    print(f"\n{''=''*50}")
    print(f"Model: {model}")
    print(''=''*50)
    
    response = ollama.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": question}],
        temperature=0
    )
    print(response.choices[0].message.content)
```

---

## Model Size Guide

| Size | RAM Needed | Quality | Speed | Use Case |
|------|-----------|---------|-------|----------|
| 1-3B | 4GB | Basic | ? Fast | Mobile, edge devices |
| 7-8B | 8GB | Good | ?? Medium | Development, testing |
| 13-14B | 16GB | Great | ?? Moderate | Production (small scale) |
| 30-34B | 32GB | Excellent | ?? Slow | High-quality tasks |
| 70B+ | 64GB+ | Near-frontier | ?? Very slow | Maximum local quality |

---

## ?? Knowledge Check

> **Q1:** You have a laptop with 8GB RAM. Which model sizes can you run?
>
> **A1:** Models up to 7-8B parameters. Try `llama3.2` (3B) for speed or `mistral` (7B) for better quality.

> **Q2:** Your company needs to process sensitive medical records with AI. Should you use GPT-5 or an open-source model? Why?
>
> **A2:** Open-source model running locally — medical data should never leave your servers for privacy/HIPAA compliance. Use LLaMA or Mistral via Ollama.

> **Q3:** What''s the advantage of Phi-3 over LLaMA 3 at similar sizes?
>
> **A3:** Phi-3 achieves better quality-per-parameter due to its training on high-quality synthetic data, making it ideal for resource-constrained environments.

---

## Key Takeaways

1. Open-source models are **free, private, and customizable**
2. **Ollama** makes running them as easy as one command
3. Choose model size based on your **available RAM** and quality needs
4. Open-source is **mandatory** for sensitive data processing
5. The gap between open-source and frontier is **shrinking fast**
', '2026-06-23 07:36:04.977', '2026-06-23 08:16:14.318');
INSERT INTO public."CourseModule" VALUES ('ae47dc99-147c-4091-b997-888774dbcb0f', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Chat Completions API: HTTP Endpoints vs OpenAI Python Client', '10:11', 17, '# Chat Completions API: HTTP Endpoints vs OpenAI Python Client

## Two Ways to Talk to LLMs

You can interact with LLMs via raw HTTP requests or the Python SDK. Understanding both is essential.

---

## Method 1: Raw HTTP Requests

```python
import requests
import os

response = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv(''OPENAI_API_KEY'')}",
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
print(f"Tokens used: {data[''usage''][''total_tokens'']}")
```

### When to use raw HTTP:
- Understanding what''s happening under the hood
- Languages without an official SDK
- Custom retry/error handling logic

---

## Method 2: OpenAI Python Client

```python
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
```

### Advantages of the SDK:
- ? Automatic retries on network errors
- ? Type hints and autocomplete
- ? Streaming support built-in
- ? Cleaner, more readable code

---

## Streaming Responses

### With SDK (recommended)
```python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

---

## ?? Knowledge Check

> **Q1:** Which method would you choose for a production Python application and why?
>
> **A1:** The OpenAI Python Client — it handles retries, provides type safety, and results in cleaner code. Raw HTTP is mainly useful for learning or non-Python environments.

> **Q2:** What does `stream=True` do and when would you use it?
>
> **A2:** It returns tokens one-by-one as they''re generated instead of waiting for the full response. Use it for chat interfaces where you want to show text appearing in real-time (like ChatGPT does).

---

## Key Takeaways

1. Raw HTTP requests show you **exactly** what''s being sent/received
2. The Python SDK is **always preferred** for production code
3. **Streaming** creates better user experiences in chat applications
4. Both methods use the same underlying API — same results, different ergonomics
', '2026-06-23 07:36:04.981', '2026-06-23 08:16:14.32');
INSERT INTO public."CourseModule" VALUES ('3e0bf76b-8f35-40bd-b12d-d8cf8415dcd0', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Using the OpenAI Python Client with Multiple LLM Providers', '7:41', 18, '# Using the OpenAI Python Client with Multiple LLM Providers

## One Client, Many Models

The OpenAI Python client isn''t just for OpenAI! Many providers offer OpenAI-compatible APIs.

---

## The Universal Pattern

```python
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
```

---

## Building a Multi-Provider Function

```python
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
```

---

## Why This Matters

1. **No vendor lock-in** — Switch providers with one line change
2. **Cost optimization** — Use cheap models for simple tasks
3. **Fallback strategy** — If OpenAI is down, fall back to Ollama
4. **A/B testing** — Compare model outputs easily

---

## ?? Knowledge Check

> **Q:** Your app uses GPT-4o for everything. Your monthly API bill is $5,000. How would you reduce costs using multiple providers?
>
> **A:** Analyze your requests: route simple tasks (classification, extraction) to GPT-4o-mini ($0.15/M tokens), use local Ollama for development/testing, and reserve GPT-5 only for complex reasoning tasks. This could reduce costs by 70-80%.

---

## Key Takeaways

1. The OpenAI client is a **universal interface** for many LLM providers
2. Just change `base_url` and `api_key` to switch providers
3. Build **provider-agnostic** code from the start
4. Use **multiple models** strategically to optimize cost and quality
', '2026-06-23 07:36:04.984', '2026-06-23 08:16:14.323');
INSERT INTO public."CourseModule" VALUES ('17441e77-f86e-48b3-bea5-5a76faab3695', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Base, Chat, and Reasoning Models: Understanding LLM Types', '10:44', 20, '# Day 3 - Base, Chat, and Reasoning Models: Understanding LLM Types

## Module Content

Welcome to **Day 3 - Base, Chat, and Reasoning Models: Understanding LLM Types**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:44
- Module index: 20

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:04.989', '2026-06-23 07:36:04.989');
INSERT INTO public."CourseModule" VALUES ('8abf0ebc-af0f-4e91-9f51-8aca0456eb27', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Frontier Models: GPT, Claude, Gemini & Their Strengths and Pitfalls', '12:56', 21, '# Day 3 - Frontier Models: GPT, Claude, Gemini & Their Strengths and Pitfalls

## Module Content

Welcome to **Day 3 - Frontier Models: GPT, Claude, Gemini & Their Strengths and Pitfalls**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:56
- Module index: 21

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:04.991', '2026-06-23 07:36:04.991');
INSERT INTO public."CourseModule" VALUES ('e02c17af-5e76-40f9-8e41-6da64d91f702', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Testing ChatGPT-5 and Frontier LLMs Through the Web UI', '9:43', 22, '# Day 3 - Testing ChatGPT-5 and Frontier LLMs Through the Web UI

## Module Content

Welcome to **Day 3 - Testing ChatGPT-5 and Frontier LLMs Through the Web UI**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:43
- Module index: 22

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:04.993', '2026-06-23 07:36:04.993');
INSERT INTO public."CourseModule" VALUES ('85cfe172-8062-4ee5-8b73-73195bed3bae', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Testing Claude, Gemini, Grok & DeepSeek with ChatGPT Deep Research', '11:33', 23, '# Day 3 - Testing Claude, Gemini, Grok & DeepSeek with ChatGPT Deep Research

## Module Content

Welcome to **Day 3 - Testing Claude, Gemini, Grok & DeepSeek with ChatGPT Deep Research**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:33
- Module index: 23

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:04.997', '2026-06-23 07:36:04.997');
INSERT INTO public."CourseModule" VALUES ('5fdb61a1-6f97-4e7e-8ca9-b0b50f461b52', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Agentic AI in Action: Deep Research, Claude Code, and Agent Mode', '11:22', 24, '# Day 3 - Agentic AI in Action: Deep Research, Claude Code, and Agent Mode

## Module Content

Welcome to **Day 3 - Agentic AI in Action: Deep Research, Claude Code, and Agent Mode**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:22
- Module index: 24

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05', '2026-06-23 07:36:05');
INSERT INTO public."CourseModule" VALUES ('47998c8c-8d7a-4748-a078-4a6c0c509c58', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Frontier Models Showdown: Building an LLM Competition Game', '10:14', 25, '# Day 3 - Frontier Models Showdown: Building an LLM Competition Game

## Module Content

Welcome to **Day 3 - Frontier Models Showdown: Building an LLM Competition Game**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:14
- Module index: 25

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.002', '2026-06-23 07:36:05.002');
INSERT INTO public."CourseModule" VALUES ('953d1f6c-6cae-4e91-8557-4573cb225213', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Understanding Transformers: The Architecture Behind GPT and LLMs', '12:46', 26, '# Day 4 - Understanding Transformers: The Architecture Behind GPT and LLMs

## Module Content

Welcome to **Day 4 - Understanding Transformers: The Architecture Behind GPT and LLMs**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:46
- Module index: 26

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.005', '2026-06-23 07:36:05.005');
INSERT INTO public."CourseModule" VALUES ('f5d5387c-1be4-402a-ae58-f51ab1843a73', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - From LSTMs to Transformers: Attention, Emergent Intelligence & Agentic A', '9:08', 27, '# Day 4 - From LSTMs to Transformers: Attention, Emergent Intelligence & Agentic A

## Module Content

Welcome to **Day 4 - From LSTMs to Transformers: Attention, Emergent Intelligence & Agentic A**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:08
- Module index: 27

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.008', '2026-06-23 07:36:05.008');
INSERT INTO public."CourseModule" VALUES ('a06800e9-dd1b-485c-9689-c709d7d3ac73', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Parameters: From Millions to Trillions in GPT, LLaMA & DeepSeek', '8:26', 28, '# Day 4 - Parameters: From Millions to Trillions in GPT, LLaMA & DeepSeek

## Module Content

Welcome to **Day 4 - Parameters: From Millions to Trillions in GPT, LLaMA & DeepSeek**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:26
- Module index: 28

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.01', '2026-06-23 07:36:05.01');
INSERT INTO public."CourseModule" VALUES ('324e4762-9eb6-4e63-b813-f584a4ba552d', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - What Are Tokens? From Characters to GPT''s Tokenizer', '4:02', 29, '# Day 4 - What Are Tokens? From Characters to GPT''s Tokenizer

## Module Content

Welcome to **Day 4 - What Are Tokens? From Characters to GPT''s Tokenizer**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 4:02
- Module index: 29

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.013', '2026-06-23 07:36:05.013');
INSERT INTO public."CourseModule" VALUES ('9ffe11f3-be8e-4f80-8206-e0104297f56b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Understanding Tokenization: How GPT Breaks Down Text into Tokens', '8:13', 30, '# Day 4 - Understanding Tokenization: How GPT Breaks Down Text into Tokens

## Module Content

Welcome to **Day 4 - Understanding Tokenization: How GPT Breaks Down Text into Tokens**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:13
- Module index: 30

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.016', '2026-06-23 07:36:05.016');
INSERT INTO public."CourseModule" VALUES ('72fd0a18-65f1-4fc9-bf35-0963e18e73c6', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Tokenizing with tiktoken and Understanding the Illusion of Memory', '10:56', 31, '# Day 4 - Tokenizing with tiktoken and Understanding the Illusion of Memory

## Module Content

Welcome to **Day 4 - Tokenizing with tiktoken and Understanding the Illusion of Memory**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:56
- Module index: 31

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.018', '2026-06-23 07:36:05.018');
INSERT INTO public."CourseModule" VALUES ('ecd9a65e-5f16-43f6-bd27-6b18650cb548', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Context Windows, API Costs, and Token Limits in LLMs', '10:49', 32, '# Day 4 - Context Windows, API Costs, and Token Limits in LLMs

## Module Content

Welcome to **Day 4 - Context Windows, API Costs, and Token Limits in LLMs**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:49
- Module index: 32

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.02', '2026-06-23 07:36:05.02');
INSERT INTO public."CourseModule" VALUES ('ffb2b8a0-aa08-4207-bfdd-5a414dd15815', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building a Sales Brochure Generator with OpenAI Chat Completions API', '9:03', 33, '# Day 5 - Building a Sales Brochure Generator with OpenAI Chat Completions API

## Module Content

Welcome to **Day 5 - Building a Sales Brochure Generator with OpenAI Chat Completions API**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:03
- Module index: 33

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.023', '2026-06-23 07:36:05.023');
INSERT INTO public."CourseModule" VALUES ('70cd10a3-c54b-465d-8eda-3bf56e05921c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building JSON Prompts and Using OpenAI''s Chat Completions API', '10:43', 34, '# Day 5 - Building JSON Prompts and Using OpenAI''s Chat Completions API

## Module Content

Welcome to **Day 5 - Building JSON Prompts and Using OpenAI''s Chat Completions API**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:43
- Module index: 34

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.025', '2026-06-23 07:36:05.025');
INSERT INTO public."CourseModule" VALUES ('a7698318-50c1-4397-911c-cc5c944f51c0', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Chaining GPT Calls: Building an AI Company Brochure Generator', '9:07', 35, '# Day 5 - Chaining GPT Calls: Building an AI Company Brochure Generator

## Module Content

Welcome to **Day 5 - Chaining GPT Calls: Building an AI Company Brochure Generator**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:07
- Module index: 35

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.029', '2026-06-23 07:36:05.029');
INSERT INTO public."CourseModule" VALUES ('c3d9551a-cd93-4441-a9fc-c2826feae07d', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building a Brochure Generator with GPT-4 and Streaming Results', '11:17', 36, '# Day 5 - Building a Brochure Generator with GPT-4 and Streaming Results

## Module Content

Welcome to **Day 5 - Building a Brochure Generator with GPT-4 and Streaming Results**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:17
- Module index: 36

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.031', '2026-06-23 07:36:05.031');
INSERT INTO public."CourseModule" VALUES ('c6052a5c-5c37-462c-b997-dbacd83c1921', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Business Applications, Challenges & Building Your AI Tutor', '9:56', 37, '# Day 5 - Business Applications, Challenges & Building Your AI Tutor

## Module Content

Welcome to **Day 5 - Business Applications, Challenges & Building Your AI Tutor**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:56
- Module index: 37

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.033', '2026-06-23 07:36:05.033');
INSERT INTO public."CourseModule" VALUES ('21b4b36d-7a28-4bbd-a23c-b1849b43cdc5', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Connecting to Multiple Frontier Models with APIs (OpenAI, Claude, Gemini', '11:58', 38, '# Day 1 - Connecting to Multiple Frontier Models with APIs (OpenAI, Claude, Gemini

## Module Content

Welcome to **Day 1 - Connecting to Multiple Frontier Models with APIs (OpenAI, Claude, Gemini**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:58
- Module index: 38

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.036', '2026-06-23 07:36:05.036');
INSERT INTO public."CourseModule" VALUES ('bbfafc6d-a56f-4183-b843-8c81ddbba11f', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Testing GPT-5 Models with Reasoning Effort and Scaling Puzzles', '6:59', 39, '# Day 1 - Testing GPT-5 Models with Reasoning Effort and Scaling Puzzles

## Module Content

Welcome to **Day 1 - Testing GPT-5 Models with Reasoning Effort and Scaling Puzzles**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 6:59
- Module index: 39

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.039', '2026-06-23 07:36:05.039');
INSERT INTO public."CourseModule" VALUES ('e522fd08-ef2a-4523-8ec1-782731a3a37c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Testing Claude, GPT-5, Gemini & DeepSeek on Brain Teasers', '7:59', 40, '# Day 1 - Testing Claude, GPT-5, Gemini & DeepSeek on Brain Teasers

## Module Content

Welcome to **Day 1 - Testing Claude, GPT-5, Gemini & DeepSeek on Brain Teasers**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:59
- Module index: 40

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.041', '2026-06-23 07:36:05.041');
INSERT INTO public."CourseModule" VALUES ('e68b5575-a884-49f7-a12b-6318219e8f08', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Local Models with Ollama, Native APIs, and OpenRouter Integration', '9:08', 41, '# Day 1 - Local Models with Ollama, Native APIs, and OpenRouter Integration

## Module Content

Welcome to **Day 1 - Local Models with Ollama, Native APIs, and OpenRouter Integration**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:08
- Module index: 41

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.044', '2026-06-23 07:36:05.044');
INSERT INTO public."CourseModule" VALUES ('79ae06a1-c516-4134-921e-99c8334928f4', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - LangChain vs LiteLLM: Choosing the Right LLM Framework', '12:11', 42, '# Day 1 - LangChain vs LiteLLM: Choosing the Right LLM Framework

## Module Content

Welcome to **Day 1 - LangChain vs LiteLLM: Choosing the Right LLM Framework**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:11
- Module index: 42

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.047', '2026-06-23 07:36:05.047');
INSERT INTO public."CourseModule" VALUES ('14fcd9f8-ae66-4602-a82f-86e0bab497eb', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - LLM vs LLM: Building Multi-Model Conversations with OpenAI & Claude', '10:44', 43, '# Day 1 - LLM vs LLM: Building Multi-Model Conversations with OpenAI & Claude

## Module Content

Welcome to **Day 1 - LLM vs LLM: Building Multi-Model Conversations with OpenAI & Claude**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:44
- Module index: 43

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.049', '2026-06-23 07:36:05.049');
INSERT INTO public."CourseModule" VALUES ('62c3a918-9bc0-45e2-8536-edc6bf0e7e57', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Building Data Science UIs with Gradio (No Front-End Skills Required)', '9:57', 44, '# Day 2 - Building Data Science UIs with Gradio (No Front-End Skills Required)

## Module Content

Welcome to **Day 2 - Building Data Science UIs with Gradio (No Front-End Skills Required)**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:57
- Module index: 44

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.052', '2026-06-23 07:36:05.052');
INSERT INTO public."CourseModule" VALUES ('d1d2b49e-e8b4-400c-96ff-0c477a39adc6', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Building Your First Gradio Interface with Callbacks and Sharing', '9:31', 45, '# Day 2 - Building Your First Gradio Interface with Callbacks and Sharing

## Module Content

Welcome to **Day 2 - Building Your First Gradio Interface with Callbacks and Sharing**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:31
- Module index: 45

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.054', '2026-06-23 07:36:05.054');
INSERT INTO public."CourseModule" VALUES ('be98ebf8-a32e-406d-8e0f-800242377c6b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Building Gradio Interfaces with Authentication and GPT Integration', '8:43', 46, '# Day 2 - Building Gradio Interfaces with Authentication and GPT Integration

## Module Content

Welcome to **Day 2 - Building Gradio Interfaces with Authentication and GPT Integration**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:43
- Module index: 46

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.057', '2026-06-23 07:36:05.057');
INSERT INTO public."CourseModule" VALUES ('cdb58777-2f1c-42c2-9c99-844042ca31e5', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Markdown Responses and Streaming with Gradio and OpenAI', '10:13', 47, '# Day 2 - Markdown Responses and Streaming with Gradio and OpenAI

## Module Content

Welcome to **Day 2 - Markdown Responses and Streaming with Gradio and OpenAI**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:13
- Module index: 47

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.061', '2026-06-23 07:36:05.061');
INSERT INTO public."CourseModule" VALUES ('d1ed2283-4a4b-44e2-8e27-65c154696256', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Building Multi-Model Gradio UIs with GPT and Claude Streaming', '8:42', 48, '# Day 2 - Building Multi-Model Gradio UIs with GPT and Claude Streaming

## Module Content

Welcome to **Day 2 - Building Multi-Model Gradio UIs with GPT and Claude Streaming**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:42
- Module index: 48

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.063', '2026-06-23 07:36:05.063');
INSERT INTO public."CourseModule" VALUES ('8e1f49aa-6b31-4942-a7eb-019c27b313d5', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building Chat UIs with Gradio: Your First Conversational AI Assistant', '8:51', 49, '# Day 3 - Building Chat UIs with Gradio: Your First Conversational AI Assistant

## Module Content

Welcome to **Day 3 - Building Chat UIs with Gradio: Your First Conversational AI Assistant**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:51
- Module index: 49

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.066', '2026-06-23 07:36:05.066');
INSERT INTO public."CourseModule" VALUES ('ebe5e073-d50a-4719-9e99-ebef6feca9af', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building a Streaming Chatbot with Gradio and OpenAI API', '6:02', 50, '# Day 3 - Building a Streaming Chatbot with Gradio and OpenAI API

## Module Content

Welcome to **Day 3 - Building a Streaming Chatbot with Gradio and OpenAI API**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 6:02
- Module index: 50

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.068', '2026-06-23 07:36:05.068');
INSERT INTO public."CourseModule" VALUES ('ce2c6870-839a-430e-82ba-0189d7af0af0', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - System Prompts, Multi-Shot Prompting, and Your First Look at RAG', '10:23', 51, '# Day 3 - System Prompts, Multi-Shot Prompting, and Your First Look at RAG

## Module Content

Welcome to **Day 3 - System Prompts, Multi-Shot Prompting, and Your First Look at RAG**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:23
- Module index: 51

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.071', '2026-06-23 07:36:05.071');
INSERT INTO public."CourseModule" VALUES ('b0922d16-d43d-43fd-92fc-c6c84e89e1d8', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - How LLM Tool Calling Really Works (No Magic, Just Prompts)', '8:10', 52, '# Day 4 - How LLM Tool Calling Really Works (No Magic, Just Prompts)

## Module Content

Welcome to **Day 4 - How LLM Tool Calling Really Works (No Magic, Just Prompts)**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:10
- Module index: 52

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.073', '2026-06-23 07:36:05.073');
INSERT INTO public."CourseModule" VALUES ('48733121-83fa-492d-bb04-4532b64272f3', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Common Use Cases for LLM Tools and Agentic AI Workflows', '3:31', 53, '# Day 4 - Common Use Cases for LLM Tools and Agentic AI Workflows

## Module Content

Welcome to **Day 4 - Common Use Cases for LLM Tools and Agentic AI Workflows**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 3:31
- Module index: 53

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.077', '2026-06-23 07:36:05.077');
INSERT INTO public."CourseModule" VALUES ('9e450c4c-74dd-4c99-9048-9e1fa4adf5c6', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Building an Airline AI Assistant with Tool Calling in OpenAI and Gradio', '11:40', 54, '# Day 4 - Building an Airline AI Assistant with Tool Calling in OpenAI and Gradio

## Module Content

Welcome to **Day 4 - Building an Airline AI Assistant with Tool Calling in OpenAI and Gradio**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:40
- Module index: 54

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.079', '2026-06-23 07:36:05.079');
INSERT INTO public."CourseModule" VALUES ('bd2c4c43-6f09-4853-a6ad-903756f4245b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Handling Multiple Tool Calls with OpenAI and Gradio', '9:57', 55, '# Day 4 - Handling Multiple Tool Calls with OpenAI and Gradio

## Module Content

Welcome to **Day 4 - Handling Multiple Tool Calls with OpenAI and Gradio**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:57
- Module index: 55

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.081', '2026-06-23 07:36:05.081');
INSERT INTO public."CourseModule" VALUES ('4a0abee9-24e8-471a-9e79-c8c75931f479', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Building Tool Calling with SQLite Database Integration', '12:43', 56, '# Day 4 - Building Tool Calling with SQLite Database Integration

## Module Content

Welcome to **Day 4 - Building Tool Calling with SQLite Database Integration**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:43
- Module index: 56

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.083', '2026-06-23 07:36:05.083');
INSERT INTO public."CourseModule" VALUES ('92b77339-9013-406d-a534-782a0e660b7a', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Introduction to Agentic AI and Building Multi-Tool Workflows', '8:29', 57, '# Day 5 - Introduction to Agentic AI and Building Multi-Tool Workflows

## Module Content

Welcome to **Day 5 - Introduction to Agentic AI and Building Multi-Tool Workflows**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:29
- Module index: 57

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.085', '2026-06-23 07:36:05.085');
INSERT INTO public."CourseModule" VALUES ('395e6968-0e9a-4e0a-b90c-4d338a8b5388', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - How Gradio Works: Building Web UIs from Python Code', '7:56', 58, '# Day 5 - How Gradio Works: Building Web UIs from Python Code

## Module Content

Welcome to **Day 5 - How Gradio Works: Building Web UIs from Python Code**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:56
- Module index: 58

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.088', '2026-06-23 07:36:05.088');
INSERT INTO public."CourseModule" VALUES ('56ee98fb-7082-4a3c-963b-132e51959885', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building Multi-Modal Apps with DALL-E 3, Text-to-Speech, and Gradio Bloc', '10:42', 59, '# Day 5 - Building Multi-Modal Apps with DALL-E 3, Text-to-Speech, and Gradio Bloc

## Module Content

Welcome to **Day 5 - Building Multi-Modal Apps with DALL-E 3, Text-to-Speech, and Gradio Bloc**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:42
- Module index: 59

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.09', '2026-06-23 07:36:05.09');
INSERT INTO public."CourseModule" VALUES ('19dd5b98-5caa-43b7-907e-89e78f805ee0', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Running Your Multimodal AI Assistant with Gradio and Tools', '8:21', 60, '# Day 5 - Running Your Multimodal AI Assistant with Gradio and Tools

## Module Content

Welcome to **Day 5 - Running Your Multimodal AI Assistant with Gradio and Tools**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:21
- Module index: 60

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.093', '2026-06-23 07:36:05.093');
INSERT INTO public."CourseModule" VALUES ('ba3f525d-677d-42ec-b2d0-45397ff96265', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 Extra - Compare Frontier LLMs with OpenRouter: Generate SVG Art in Python', '8:37', 61, '# Day 5 Extra - Compare Frontier LLMs with OpenRouter: Generate SVG Art in Python

## Module Content

Welcome to **Day 5 Extra - Compare Frontier LLMs with OpenRouter: Generate SVG Art in Python**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:37
- Module index: 61

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.096', '2026-06-23 07:36:05.096');
INSERT INTO public."CourseModule" VALUES ('2f10369f-2085-48c4-8cd5-5603fffe670f', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Introduction to Hugging Face Platform: Models, Datasets, and Spaces', '11:57', 62, '# Day 1 - Introduction to Hugging Face Platform: Models, Datasets, and Spaces

## Module Content

Welcome to **Day 1 - Introduction to Hugging Face Platform: Models, Datasets, and Spaces**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:57
- Module index: 62

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.099', '2026-06-23 07:36:05.099');
INSERT INTO public."CourseModule" VALUES ('077f89d1-d1cc-4478-b1f8-bc8b4b785e1e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - HuggingFace Libraries: Transformers, Datasets, and Hub Explained', '6:34', 63, '# Day 1 - HuggingFace Libraries: Transformers, Datasets, and Hub Explained

## Module Content

Welcome to **Day 1 - HuggingFace Libraries: Transformers, Datasets, and Hub Explained**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 6:34
- Module index: 63

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.101', '2026-06-23 07:36:05.101');
INSERT INTO public."CourseModule" VALUES ('b65e71df-2aca-4c32-84d4-1dcb1f6978f9', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Introduction to Google Colab and Cloud GPUs for AI Development', '10:26', 64, '# Day 1 - Introduction to Google Colab and Cloud GPUs for AI Development

## Module Content

Welcome to **Day 1 - Introduction to Google Colab and Cloud GPUs for AI Development**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:26
- Module index: 64

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.103', '2026-06-23 07:36:05.103');
INSERT INTO public."CourseModule" VALUES ('3d378e07-cb6c-4b27-8a87-f6b36433c3ed', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Getting Started with Google Colab: Setup, Runtime, and Free GPU Access', '7:44', 65, '# Day 1 - Getting Started with Google Colab: Setup, Runtime, and Free GPU Access

## Module Content

Welcome to **Day 1 - Getting Started with Google Colab: Setup, Runtime, and Free GPU Access**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:44
- Module index: 65

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.105', '2026-06-23 07:36:05.105');
INSERT INTO public."CourseModule" VALUES ('1fb58801-dfde-4176-98f9-93c707c9002e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Setting Up Google Colab with Hugging Face and Running Your First Model', '9:45', 66, '# Day 1 - Setting Up Google Colab with Hugging Face and Running Your First Model

## Module Content

Welcome to **Day 1 - Setting Up Google Colab with Hugging Face and Running Your First Model**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:45
- Module index: 66

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.109', '2026-06-23 07:36:05.109');
INSERT INTO public."CourseModule" VALUES ('c89535a4-dc29-46d0-94bd-8e11db1ee7f7', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Running Stable Diffusion and FLUX on Google Colab GPUs', '14:02', 67, '# Day 1 - Running Stable Diffusion and FLUX on Google Colab GPUs

## Module Content

Welcome to **Day 1 - Running Stable Diffusion and FLUX on Google Colab GPUs**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 14:02
- Module index: 67

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.111', '2026-06-23 07:36:05.111');
INSERT INTO public."CourseModule" VALUES ('49f1fd1b-91f3-432e-acb9-77642472f73a', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Introduction to Hugging Face Pipelines for Quick AI Inference', '8:25', 68, '# Day 2 - Introduction to Hugging Face Pipelines for Quick AI Inference

## Module Content

Welcome to **Day 2 - Introduction to Hugging Face Pipelines for Quick AI Inference**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:25
- Module index: 68

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.113', '2026-06-23 07:36:05.113');
INSERT INTO public."CourseModule" VALUES ('0d270ac4-e103-4671-bfa2-80d466b93748', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - HuggingFace Pipelines API for Sentiment Analysis on Colab T4 GPU', '11:25', 69, '# Day 2 - HuggingFace Pipelines API for Sentiment Analysis on Colab T4 GPU

## Module Content

Welcome to **Day 2 - HuggingFace Pipelines API for Sentiment Analysis on Colab T4 GPU**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:25
- Module index: 69

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.116', '2026-06-23 07:36:05.116');
INSERT INTO public."CourseModule" VALUES ('51522feb-a7b2-4955-94b8-4093262517fa', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Named Entity Recognition, Q&A, and Hugging Face Pipeline Tasks', '10:12', 70, '# Day 2 - Named Entity Recognition, Q&A, and Hugging Face Pipeline Tasks

## Module Content

Welcome to **Day 2 - Named Entity Recognition, Q&A, and Hugging Face Pipeline Tasks**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:12
- Module index: 70

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.118', '2026-06-23 07:36:05.118');
INSERT INTO public."CourseModule" VALUES ('549f3e33-ba84-420b-bf6d-39bb668c6152', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Hugging Face Pipelines: Image, Audio & Diffusion Models in Colab', '7:24', 71, '# Day 2 - Hugging Face Pipelines: Image, Audio & Diffusion Models in Colab

## Module Content

Welcome to **Day 2 - Hugging Face Pipelines: Image, Audio & Diffusion Models in Colab**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:24
- Module index: 71

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.12', '2026-06-23 07:36:05.12');
INSERT INTO public."CourseModule" VALUES ('51255ee5-6c3e-4e63-8b00-b6f2b8e75aba', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Tokenizers: How LLMs Convert Text to Numbers', '9:12', 72, '# Day 3 - Tokenizers: How LLMs Convert Text to Numbers

## Module Content

Welcome to **Day 3 - Tokenizers: How LLMs Convert Text to Numbers**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:12
- Module index: 72

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.122', '2026-06-23 07:36:05.122');
INSERT INTO public."CourseModule" VALUES ('50074c93-a232-4f47-8295-437ecba17f6e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Tokenizers in Action: Encoding and Decoding with Llama 3.1', '11:01', 73, '# Day 3 - Tokenizers in Action: Encoding and Decoding with Llama 3.1

## Module Content

Welcome to **Day 3 - Tokenizers in Action: Encoding and Decoding with Llama 3.1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:01
- Module index: 73

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.126', '2026-06-23 07:36:05.126');
INSERT INTO public."CourseModule" VALUES ('3ff3a22f-a598-4bc1-b1f3-4de064e297f1', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - How Chat Templates Work: LLaMA Tokenizers and Special Tokens', '7:27', 74, '# Day 3 - How Chat Templates Work: LLaMA Tokenizers and Special Tokens

## Module Content

Welcome to **Day 3 - How Chat Templates Work: LLaMA Tokenizers and Special Tokens**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:27
- Module index: 74

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.128', '2026-06-23 07:36:05.128');
INSERT INTO public."CourseModule" VALUES ('b475d6f6-e55d-43b0-9f62-a4e3b833fba1', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Comparing Tokenizers: Phi-4, DeepSeek, and QWENCoder in Action', '5:26', 75, '# Day 3 - Comparing Tokenizers: Phi-4, DeepSeek, and QWENCoder in Action

## Module Content

Welcome to **Day 3 - Comparing Tokenizers: Phi-4, DeepSeek, and QWENCoder in Action**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 5:26
- Module index: 75

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.131', '2026-06-23 07:36:05.131');
INSERT INTO public."CourseModule" VALUES ('a11a7395-1155-4e7b-951c-c1532324df88', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Deep Dive into Transformers, Quantization, and Neural Networks', '7:52', 76, '# Day 4 - Deep Dive into Transformers, Quantization, and Neural Networks

## Module Content

Welcome to **Day 4 - Deep Dive into Transformers, Quantization, and Neural Networks**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:52
- Module index: 76

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.132', '2026-06-23 07:36:05.132');
INSERT INTO public."CourseModule" VALUES ('92713a2b-ca58-4cf7-a201-b4671f6d9420', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Working with Hugging Face Transformers Low-Level API and Quantization', '10:11', 77, '# Day 4 - Working with Hugging Face Transformers Low-Level API and Quantization

## Module Content

Welcome to **Day 4 - Working with Hugging Face Transformers Low-Level API and Quantization**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:11
- Module index: 77

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.135', '2026-06-23 07:36:05.135');
INSERT INTO public."CourseModule" VALUES ('601130c0-7d24-4e70-9d16-a8f2c6f8fb34', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Inside LLaMA: PyTorch Model Architecture and Token Embeddings', '8:51', 78, '# Day 4 - Inside LLaMA: PyTorch Model Architecture and Token Embeddings

## Module Content

Welcome to **Day 4 - Inside LLaMA: PyTorch Model Architecture and Token Embeddings**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:51
- Module index: 78

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.137', '2026-06-23 07:36:05.137');
INSERT INTO public."CourseModule" VALUES ('977b6b59-e705-424d-9b1c-030af19812d9', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Inside LLaMA: Decoder Layers, Attention, and Why Non-Linearity Matters', '11:27', 79, '# Day 4 - Inside LLaMA: Decoder Layers, Attention, and Why Non-Linearity Matters

## Module Content

Welcome to **Day 4 - Inside LLaMA: Decoder Layers, Attention, and Why Non-Linearity Matters**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:27
- Module index: 79

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.141', '2026-06-23 07:36:05.141');
INSERT INTO public."CourseModule" VALUES ('91c45289-62c2-4d45-a58a-36a9f4dfb8ee', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Running Open Source LLMs: Phi, Gemma, Qwen & DeepSeek with Hugging Face', '11:08', 80, '# Day 4 - Running Open Source LLMs: Phi, Gemma, Qwen & DeepSeek with Hugging Face

## Module Content

Welcome to **Day 4 - Running Open Source LLMs: Phi, Gemma, Qwen & DeepSeek with Hugging Face**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:08
- Module index: 80

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.143', '2026-06-23 07:36:05.143');
INSERT INTO public."CourseModule" VALUES ('9db019c2-7bff-48f8-bffe-135c58f60dec', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Visualizing Token-by-Token Inference in GPT Models', '12:16', 81, '# Day 5 - Visualizing Token-by-Token Inference in GPT Models

## Module Content

Welcome to **Day 5 - Visualizing Token-by-Token Inference in GPT Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:16
- Module index: 81

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.145', '2026-06-23 07:36:05.145');
INSERT INTO public."CourseModule" VALUES ('86132c5c-9713-4205-bc5c-11c668fcd148', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building Meeting Minutes from Audio with Whisper and Google Colab', '8:50', 82, '# Day 5 - Building Meeting Minutes from Audio with Whisper and Google Colab

## Module Content

Welcome to **Day 5 - Building Meeting Minutes from Audio with Whisper and Google Colab**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:50
- Module index: 82

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.148', '2026-06-23 07:36:05.148');
INSERT INTO public."CourseModule" VALUES ('3e21564b-d441-4491-8ed3-6b83e5a6318d', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building Meeting Minutes with OpenAI Whisper and LLaMA 3.2', '9:32', 83, '# Day 5 - Building Meeting Minutes with OpenAI Whisper and LLaMA 3.2

## Module Content

Welcome to **Day 5 - Building Meeting Minutes with OpenAI Whisper and LLaMA 3.2**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:32
- Module index: 83

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.15', '2026-06-23 07:36:05.15');
INSERT INTO public."CourseModule" VALUES ('b4400fbb-eedf-4f51-82ab-067900fdcdfc', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Week 3 Wrap-Up: Build a Synthetic Data Generator with Open Source Models', '4:25', 84, '# Day 5 - Week 3 Wrap-Up: Build a Synthetic Data Generator with Open Source Models

## Module Content

Welcome to **Day 5 - Week 3 Wrap-Up: Build a Synthetic Data Generator with Open Source Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 4:25
- Module index: 84

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.152', '2026-06-23 07:36:05.152');
INSERT INTO public."CourseModule" VALUES ('8990d2e7-71cd-4373-8489-8b92a06d5000', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Choosing the Right LLM: Model Selection Strategy and Basics', '11:44', 85, '# Day 1 - Choosing the Right LLM: Model Selection Strategy and Basics

## Module Content

Welcome to **Day 1 - Choosing the Right LLM: Model Selection Strategy and Basics**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:44
- Module index: 85

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.154', '2026-06-23 07:36:05.154');
INSERT INTO public."CourseModule" VALUES ('5c713941-10c1-4633-98af-2a27110f9032', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - The Chinchilla Scaling Law: Parameters, Training Data and Why It Matters', '4:02', 86, '# Day 1 - The Chinchilla Scaling Law: Parameters, Training Data and Why It Matters

## Module Content

Welcome to **Day 1 - The Chinchilla Scaling Law: Parameters, Training Data and Why It Matters**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 4:02
- Module index: 86

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.158', '2026-06-23 07:36:05.158');
INSERT INTO public."CourseModule" VALUES ('4d2c7f01-e3d5-4a3e-9a36-98652a9d46dd', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Understanding AI Model Benchmarks: GPQA, MMLU-Pro, and HLE', '8:08', 87, '# Day 1 - Understanding AI Model Benchmarks: GPQA, MMLU-Pro, and HLE

## Module Content

Welcome to **Day 1 - Understanding AI Model Benchmarks: GPQA, MMLU-Pro, and HLE**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:08
- Module index: 87

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.16', '2026-06-23 07:36:05.16');
INSERT INTO public."CourseModule" VALUES ('2acbf2b3-4af4-40ec-bb45-e5118b00eb93', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Limitations of AI Benchmarks: Data Contamination and Overfitting', '8:27', 88, '# Day 1 - Limitations of AI Benchmarks: Data Contamination and Overfitting

## Module Content

Welcome to **Day 1 - Limitations of AI Benchmarks: Data Contamination and Overfitting**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:27
- Module index: 88

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.162', '2026-06-23 07:36:05.162');
INSERT INTO public."CourseModule" VALUES ('3649a31d-a1ea-4ab1-9724-396b3e2ef300', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Build a Connect Four Leaderboard (Reasoning Benchmark)', '8:39', 89, '# Day 1 - Build a Connect Four Leaderboard (Reasoning Benchmark)

## Module Content

Welcome to **Day 1 - Build a Connect Four Leaderboard (Reasoning Benchmark)**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:39
- Module index: 89

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.164', '2026-06-23 07:36:05.164');
INSERT INTO public."CourseModule" VALUES ('45d1fa1c-8c2b-41f8-9e1e-ee01170658e7', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Navigating AI Leaderboards: Artificial Analysis, HuggingFace & More', '8:58', 90, '# Day 2 - Navigating AI Leaderboards: Artificial Analysis, HuggingFace & More

## Module Content

Welcome to **Day 2 - Navigating AI Leaderboards: Artificial Analysis, HuggingFace & More**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:58
- Module index: 90

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.166', '2026-06-23 07:36:05.166');
INSERT INTO public."CourseModule" VALUES ('4e3bf890-6c25-435e-8c86-c827834d9050', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Artificial Analysis Deep Dive: Model Intelligence vs Cost Comparison', '10:45', 91, '# Day 2 - Artificial Analysis Deep Dive: Model Intelligence vs Cost Comparison

## Module Content

Welcome to **Day 2 - Artificial Analysis Deep Dive: Model Intelligence vs Cost Comparison**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:45
- Module index: 91

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.168', '2026-06-23 07:36:05.168');
INSERT INTO public."CourseModule" VALUES ('13d35d48-6b1f-4f55-b4fd-74d104777ef3', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Vellum, SEAL, and LiveBench: Essential AI Model Leaderboards', '9:14', 92, '# Day 2 - Vellum, SEAL, and LiveBench: Essential AI Model Leaderboards

## Module Content

Welcome to **Day 2 - Vellum, SEAL, and LiveBench: Essential AI Model Leaderboards**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:14
- Module index: 92

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.17', '2026-06-23 07:36:05.17');
INSERT INTO public."CourseModule" VALUES ('ef51dc85-30bc-4d3f-b24e-032a14f2e958', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - LM Arena: Blind Testing AI Models with Community Elo Ratings', '4:32', 93, '# Day 2 - LM Arena: Blind Testing AI Models with Community Elo Ratings

## Module Content

Welcome to **Day 2 - LM Arena: Blind Testing AI Models with Community Elo Ratings**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 4:32
- Module index: 93

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.173', '2026-06-23 07:36:05.173');
INSERT INTO public."CourseModule" VALUES ('0443e30c-5f3a-489d-8f4a-507e061db8d4', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Commercial Use Cases: Automation, Augmentation & Agentic AI', '8:48', 94, '# Day 2 - Commercial Use Cases: Automation, Augmentation & Agentic AI

## Module Content

Welcome to **Day 2 - Commercial Use Cases: Automation, Augmentation & Agentic AI**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:48
- Module index: 94

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.176', '2026-06-23 07:36:05.176');
INSERT INTO public."CourseModule" VALUES ('dafaa753-3d6d-4ea7-8ad0-c9047d2f3d2c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Selecting LLMs for Code Generation: Python to C++ with Cursor', '8:32', 95, '# Day 3 - Selecting LLMs for Code Generation: Python to C++ with Cursor

## Module Content

Welcome to **Day 3 - Selecting LLMs for Code Generation: Python to C++ with Cursor**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:32
- Module index: 95

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.178', '2026-06-23 07:36:05.178');
INSERT INTO public."CourseModule" VALUES ('dbf77ec8-fafc-4c7a-a1e3-7117775d418e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Selecting Frontier Models: GPT-5, Claude, Grok & Gemini for C++ Code Gen', '8:48', 96, '# Day 3 - Selecting Frontier Models: GPT-5, Claude, Grok & Gemini for C++ Code Gen

## Module Content

Welcome to **Day 3 - Selecting Frontier Models: GPT-5, Claude, Grok & Gemini for C++ Code Gen**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:48
- Module index: 96

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.181', '2026-06-23 07:36:05.181');
INSERT INTO public."CourseModule" VALUES ('d55097ef-f65d-4db3-8553-636ff6fbc97e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Porting Python to C++ with GPT-5: 230x Performance Speedup', '11:15', 97, '# Day 3 - Porting Python to C++ with GPT-5: 230x Performance Speedup

## Module Content

Welcome to **Day 3 - Porting Python to C++ with GPT-5: 230x Performance Speedup**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:15
- Module index: 97

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.183', '2026-06-23 07:36:05.183');
INSERT INTO public."CourseModule" VALUES ('f58843a9-4524-4e60-a02b-7f9b3a42dd00', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - AI Coding Showdown: GPT-5 vs Claude vs Gemini vs Groq Performance', '9:57', 98, '# Day 3 - AI Coding Showdown: GPT-5 vs Claude vs Gemini vs Groq Performance

## Module Content

Welcome to **Day 3 - AI Coding Showdown: GPT-5 vs Claude vs Gemini vs Groq Performance**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:57
- Module index: 98

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.186', '2026-06-23 07:36:05.186');
INSERT INTO public."CourseModule" VALUES ('19806f81-3186-49a0-bbe0-cfc428365606', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Open Source Models for Code Generation: Qwen, DeepSeek & Ollama', '9:41', 99, '# Day 4 - Open Source Models for Code Generation: Qwen, DeepSeek & Ollama

## Module Content

Welcome to **Day 4 - Open Source Models for Code Generation: Qwen, DeepSeek & Ollama**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:41
- Module index: 99

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.19', '2026-06-23 07:36:05.19');
INSERT INTO public."CourseModule" VALUES ('6c9c46bf-1d55-4b42-848f-d16d47c1d2e9', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Building a Gradio UI to Test Python-to-C++ Code Conversion Models', '6:29', 100, '# Day 4 - Building a Gradio UI to Test Python-to-C++ Code Conversion Models

## Module Content

Welcome to **Day 4 - Building a Gradio UI to Test Python-to-C++ Code Conversion Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 6:29
- Module index: 100

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.193', '2026-06-23 07:36:05.193');
INSERT INTO public."CourseModule" VALUES ('a806907a-bbd3-4bcc-a1d2-b0d0daf651c7', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Qwen 3 Coder vs GPT OSS: OpenRouter Model Performance Showdown', '7:39', 101, '# Day 4 - Qwen 3 Coder vs GPT OSS: OpenRouter Model Performance Showdown

## Module Content

Welcome to **Day 4 - Qwen 3 Coder vs GPT OSS: OpenRouter Model Performance Showdown**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:39
- Module index: 101

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.195', '2026-06-23 07:36:05.195');
INSERT INTO public."CourseModule" VALUES ('849fec82-caf9-4cb9-b34d-c16ac507df79', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Model Evaluation: Technical Metrics vs Business Outcomes', '10:17', 102, '# Day 5 - Model Evaluation: Technical Metrics vs Business Outcomes

## Module Content

Welcome to **Day 5 - Model Evaluation: Technical Metrics vs Business Outcomes**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:17
- Module index: 102

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.197', '2026-06-23 07:36:05.197');
INSERT INTO public."CourseModule" VALUES ('3a9d601e-b317-4cc1-9cce-1260659f952b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Python to Rust Code Translation: Testing Gemini 2.5 Pro with Cursor', '9:48', 103, '# Day 5 - Python to Rust Code Translation: Testing Gemini 2.5 Pro with Cursor

## Module Content

Welcome to **Day 5 - Python to Rust Code Translation: Testing Gemini 2.5 Pro with Cursor**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:48
- Module index: 103

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.2', '2026-06-23 07:36:05.2');
INSERT INTO public."CourseModule" VALUES ('3d9dc166-701e-494c-99d8-8321a058379c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Porting Python to Rust: Testing GPT, Claude, and Qwen Models', '9:37', 104, '# Day 5 - Porting Python to Rust: Testing GPT, Claude, and Qwen Models

## Module Content

Welcome to **Day 5 - Porting Python to Rust: Testing GPT, Claude, and Qwen Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:37
- Module index: 104

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.202', '2026-06-23 07:36:05.202');
INSERT INTO public."CourseModule" VALUES ('3a6f673b-9095-4198-ad53-75ddf9b74d62', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Open Source Model Wins? Rust Code Generation Speed Challenge', '13:24', 105, '# Day 5 - Open Source Model Wins? Rust Code Generation Speed Challenge

## Module Content

Welcome to **Day 5 - Open Source Model Wins? Rust Code Generation Speed Challenge**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 13:24
- Module index: 105

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.205', '2026-06-23 07:36:05.205');
INSERT INTO public."CourseModule" VALUES ('152a7b57-02ba-4f04-a149-ace290a2d602', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Introduction to RAG: Retrieval Augmented Generation Fundamentals', '9:15', 106, '# Day 1 - Introduction to RAG: Retrieval Augmented Generation Fundamentals

## Module Content

Welcome to **Day 1 - Introduction to RAG: Retrieval Augmented Generation Fundamentals**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:15
- Module index: 106

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.208', '2026-06-23 07:36:05.208');
INSERT INTO public."CourseModule" VALUES ('d1e8aa90-d5f6-483b-8a4f-4200c4e64930', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Building a Simple RAG Knowledge Assistant with GPT-4-1 Nano', '11:11', 107, '# Day 1 - Building a Simple RAG Knowledge Assistant with GPT-4-1 Nano

## Module Content

Welcome to **Day 1 - Building a Simple RAG Knowledge Assistant with GPT-4-1 Nano**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:11
- Module index: 107

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.21', '2026-06-23 07:36:05.21');
INSERT INTO public."CourseModule" VALUES ('ca33821d-b226-492f-a4d8-b82007cb3ef5', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Building a Simple RAG System: Dictionary Lookup and Context Retrieval', '9:15', 108, '# Day 1 - Building a Simple RAG System: Dictionary Lookup and Context Retrieval

## Module Content

Welcome to **Day 1 - Building a Simple RAG System: Dictionary Lookup and Context Retrieval**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:15
- Module index: 108

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.212', '2026-06-23 07:36:05.212');
INSERT INTO public."CourseModule" VALUES ('b1c4b9c8-cbd1-456c-8de4-9ab3dc8e544a', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Vector Embeddings and Encoder LLMs: The Foundation of RAG', '9:18', 109, '# Day 1 - Vector Embeddings and Encoder LLMs: The Foundation of RAG

## Module Content

Welcome to **Day 1 - Vector Embeddings and Encoder LLMs: The Foundation of RAG**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:18
- Module index: 109

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.214', '2026-06-23 07:36:05.214');
INSERT INTO public."CourseModule" VALUES ('bb627409-4112-493a-92f3-3e2e9dcab656', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - How Vector Embeddings Represent Meaning: From word2vec to Encoders', '7:51', 110, '# Day 1 - How Vector Embeddings Represent Meaning: From word2vec to Encoders

## Module Content

Welcome to **Day 1 - How Vector Embeddings Represent Meaning: From word2vec to Encoders**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:51
- Module index: 110

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.216', '2026-06-23 07:36:05.216');
INSERT INTO public."CourseModule" VALUES ('2e65a275-f528-4ad5-b0f4-14f217d88cad', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Understanding the Big Idea Behind RAG and Vector Data Stores', '7:10', 111, '# Day 1 - Understanding the Big Idea Behind RAG and Vector Data Stores

## Module Content

Welcome to **Day 1 - Understanding the Big Idea Behind RAG and Vector Data Stores**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:10
- Module index: 111

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.218', '2026-06-23 07:36:05.218');
INSERT INTO public."CourseModule" VALUES ('2152a64c-eb6c-4693-9192-e8402ff4bb38', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Vectors for RAG: Introduction to LangChain and Vector Databases', '7:54', 112, '# Day 2 - Vectors for RAG: Introduction to LangChain and Vector Databases

## Module Content

Welcome to **Day 2 - Vectors for RAG: Introduction to LangChain and Vector Databases**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:54
- Module index: 112

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.222', '2026-06-23 07:36:05.222');
INSERT INTO public."CourseModule" VALUES ('04f4c3ae-a508-473a-a9ca-ab75fe1b48b0', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Breaking Documents into Chunks with LangChain Text Splitters', '12:12', 113, '# Day 2 - Breaking Documents into Chunks with LangChain Text Splitters

## Module Content

Welcome to **Day 2 - Breaking Documents into Chunks with LangChain Text Splitters**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:12
- Module index: 113

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.224', '2026-06-23 07:36:05.224');
INSERT INTO public."CourseModule" VALUES ('8284d3f0-48ac-4dfa-b1ef-e34beb64958d', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Encoder Models vs Vector Databases: OpenAI, BERT, Chroma & FAISS', '9:10', 114, '# Day 2 - Encoder Models vs Vector Databases: OpenAI, BERT, Chroma & FAISS

## Module Content

Welcome to **Day 2 - Encoder Models vs Vector Databases: OpenAI, BERT, Chroma & FAISS**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:10
- Module index: 114

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.226', '2026-06-23 07:36:05.226');
INSERT INTO public."CourseModule" VALUES ('df1c6c0f-137a-4358-aca2-b7226e231f21', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Creating Vector Stores with Chroma and Visualizing Embeddings with t-SNE', '10:06', 115, '# Day 2 - Creating Vector Stores with Chroma and Visualizing Embeddings with t-SNE

## Module Content

Welcome to **Day 2 - Creating Vector Stores with Chroma and Visualizing Embeddings with t-SNE**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:06
- Module index: 115

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.229', '2026-06-23 07:36:05.229');
INSERT INTO public."CourseModule" VALUES ('d3fb87a6-1809-43b8-8639-2035e8ae813a', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - 3D Vector Visualizations and Comparing Embedding Models', '11:51', 116, '# Day 2 - 3D Vector Visualizations and Comparing Embedding Models

## Module Content

Welcome to **Day 2 - 3D Vector Visualizations and Comparing Embedding Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:51
- Module index: 116

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.231', '2026-06-23 07:36:05.231');
INSERT INTO public."CourseModule" VALUES ('68bca534-ed2a-40c6-b266-1ce8e20c4dee', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building a Complete RAG Pipeline with LangChain and Chroma', '7:53', 117, '# Day 3 - Building a Complete RAG Pipeline with LangChain and Chroma

## Module Content

Welcome to **Day 3 - Building a Complete RAG Pipeline with LangChain and Chroma**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:53
- Module index: 117

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.232', '2026-06-23 07:36:05.232');
INSERT INTO public."CourseModule" VALUES ('b4c9b9f3-9133-4f12-baa3-781a5c611cc9', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building a RAG Pipeline with LangChain: LLM & Retriever Setup', '10:05', 118, '# Day 3 - Building a RAG Pipeline with LangChain: LLM & Retriever Setup

## Module Content

Welcome to **Day 3 - Building a RAG Pipeline with LangChain: LLM & Retriever Setup**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:05
- Module index: 118

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.235', '2026-06-23 07:36:05.235');
INSERT INTO public."CourseModule" VALUES ('ba0f2ebd-9bce-4d84-af83-109539e202ea', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building RAG with LangChain: Retriever and LLM Integration', '10:57', 119, '# Day 3 - Building RAG with LangChain: Retriever and LLM Integration

## Module Content

Welcome to **Day 3 - Building RAG with LangChain: Retriever and LLM Integration**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:57
- Module index: 119

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.239', '2026-06-23 07:36:05.239');
INSERT INTO public."CourseModule" VALUES ('e2852414-1b30-4426-b621-7ad24d7a4770', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building Production RAG with Python Modules and Gradio UI', '12:03', 120, '# Day 3 - Building Production RAG with Python Modules and Gradio UI

## Module Content

Welcome to **Day 3 - Building Production RAG with Python Modules and Gradio UI**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:03
- Module index: 120

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.241', '2026-06-23 07:36:05.241');
INSERT INTO public."CourseModule" VALUES ('56975ea7-f900-4e7a-8c8c-1a491f6153d5', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - RAG with Conversation History: Building a Gradio UI and Debugging Chunki', '12:33', 121, '# Day 3 - RAG with Conversation History: Building a Gradio UI and Debugging Chunki

## Module Content

Welcome to **Day 3 - RAG with Conversation History: Building a Gradio UI and Debugging Chunki**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:33
- Module index: 121

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.243', '2026-06-23 07:36:05.243');
INSERT INTO public."CourseModule" VALUES ('97fed704-516b-4cb2-bfd0-952b584e7787', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - RAG Evaluations: Measuring Performance and Iterating on Your Pipeline', '10:28', 122, '# Day 4 - RAG Evaluations: Measuring Performance and Iterating on Your Pipeline

## Module Content

Welcome to **Day 4 - RAG Evaluations: Measuring Performance and Iterating on Your Pipeline**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:28
- Module index: 122

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.245', '2026-06-23 07:36:05.245');
INSERT INTO public."CourseModule" VALUES ('36e10eef-8c09-4d38-8d74-012954cfbc0c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Evaluating RAG Systems: Retrieval Metrics, LLM as Judge, and Golden Data', '13:45', 123, '# Day 4 - Evaluating RAG Systems: Retrieval Metrics, LLM as Judge, and Golden Data

## Module Content

Welcome to **Day 4 - Evaluating RAG Systems: Retrieval Metrics, LLM as Judge, and Golden Data**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 13:45
- Module index: 123

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.247', '2026-06-23 07:36:05.247');
INSERT INTO public."CourseModule" VALUES ('cb80c663-06f4-4d7e-9546-37c3aa2f4c07', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Evaluating RAG Systems: MRR, NDCG, and Test Data with Pydantic', '10:32', 124, '# Day 4 - Evaluating RAG Systems: MRR, NDCG, and Test Data with Pydantic

## Module Content

Welcome to **Day 4 - Evaluating RAG Systems: MRR, NDCG, and Test Data with Pydantic**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:32
- Module index: 124

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.25', '2026-06-23 07:36:05.25');
INSERT INTO public."CourseModule" VALUES ('89bbe292-4483-46a5-8f20-f49cf886589b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - LLM as a Judge: Evaluating RAG Answers with Structured Outputs', '9:17', 125, '# Day 4 - LLM as a Judge: Evaluating RAG Answers with Structured Outputs

## Module Content

Welcome to **Day 4 - LLM as a Judge: Evaluating RAG Answers with Structured Outputs**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:17
- Module index: 125

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.254', '2026-06-23 07:36:05.254');
INSERT INTO public."CourseModule" VALUES ('6cffefbb-cdf5-4609-b669-a3662b2a13eb', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Running RAG Evaluations with Gradio: MRR, nDCG, and Test Results', '8:33', 126, '# Day 4 - Running RAG Evaluations with Gradio: MRR, nDCG, and Test Results

## Module Content

Welcome to **Day 4 - Running RAG Evaluations with Gradio: MRR, nDCG, and Test Results**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:33
- Module index: 126

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.257', '2026-06-23 07:36:05.257');
INSERT INTO public."CourseModule" VALUES ('3a9d3e4d-61b3-4c56-96fb-726b2a71dd50', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Experimenting with Chunking Strategies and Embedding Models in RAG', '9:48', 127, '# Day 4 - Experimenting with Chunking Strategies and Embedding Models in RAG

## Module Content

Welcome to **Day 4 - Experimenting with Chunking Strategies and Embedding Models in RAG**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:48
- Module index: 127

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.259', '2026-06-23 07:36:05.259');
INSERT INTO public."CourseModule" VALUES ('4c23352c-4a7e-43af-a57f-ac807d727766', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Testing OpenAI Embeddings and Evaluating RAG Performance Gains', '7:29', 128, '# Day 4 - Testing OpenAI Embeddings and Evaluating RAG Performance Gains

## Module Content

Welcome to **Day 4 - Testing OpenAI Embeddings and Evaluating RAG Performance Gains**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:29
- Module index: 128

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.261', '2026-06-23 07:36:05.261');
INSERT INTO public."CourseModule" VALUES ('846ca09e-7701-41eb-acfc-e3638709b5bb', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Advanced RAG Techniques: Pre-processing, Re-ranking & Evals', '8:55', 129, '# Day 5 - Advanced RAG Techniques: Pre-processing, Re-ranking & Evals

## Module Content

Welcome to **Day 5 - Advanced RAG Techniques: Pre-processing, Re-ranking & Evals**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:55
- Module index: 129

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.263', '2026-06-23 07:36:05.263');
INSERT INTO public."CourseModule" VALUES ('45b87300-7585-41ab-90b4-2706d176c3e3', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Advanced RAG Techniques: Chunking, Encoders, and Query Rewriting', '10:08', 130, '# Day 5 - Advanced RAG Techniques: Chunking, Encoders, and Query Rewriting

## Module Content

Welcome to **Day 5 - Advanced RAG Techniques: Chunking, Encoders, and Query Rewriting**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:08
- Module index: 130

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.266', '2026-06-23 07:36:05.266');
INSERT INTO public."CourseModule" VALUES ('55329cf5-39c1-4156-a8e2-2f5f17f11285', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Advanced RAG Techniques: Query Expansion, Re-ranking & GraphRAG', '11:51', 131, '# Day 5 - Advanced RAG Techniques: Query Expansion, Re-ranking & GraphRAG

## Module Content

Welcome to **Day 5 - Advanced RAG Techniques: Query Expansion, Re-ranking & GraphRAG**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:51
- Module index: 131

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.269', '2026-06-23 07:36:05.269');
INSERT INTO public."CourseModule" VALUES ('e35484d4-906d-45de-870a-75e7ee79806b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building Advanced RAG Without LangChain: Semantic Chunking with LLMs', '13:07', 132, '# Day 5 - Building Advanced RAG Without LangChain: Semantic Chunking with LLMs

## Module Content

Welcome to **Day 5 - Building Advanced RAG Without LangChain: Semantic Chunking with LLMs**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 13:07
- Module index: 132

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.271', '2026-06-23 07:36:05.271');
INSERT INTO public."CourseModule" VALUES ('bee4c046-9cde-4048-aec0-98d17ab229ef', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Creating Embeddings with Chroma, Visualizing with t-SNE, and Re-ranking', '11:15', 133, '# Day 5 - Creating Embeddings with Chroma, Visualizing with t-SNE, and Re-ranking

## Module Content

Welcome to **Day 5 - Creating Embeddings with Chroma, Visualizing with t-SNE, and Re-ranking**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:15
- Module index: 133

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.273', '2026-06-23 07:36:05.273');
INSERT INTO public."CourseModule" VALUES ('119142c6-c575-4356-bd66-371d36fd2477', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building RAG Without LangChain: Re-ranking and Query Rewriting', '8:30', 134, '# Day 5 - Building RAG Without LangChain: Re-ranking and Query Rewriting

## Module Content

Welcome to **Day 5 - Building RAG Without LangChain: Re-ranking and Query Rewriting**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:30
- Module index: 134

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.276', '2026-06-23 07:36:05.276');
INSERT INTO public."CourseModule" VALUES ('30b42b3e-2426-4496-b277-5b55ec4fc6a8', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Building Production RAG with Query Expansion and Multiprocessing', '11:53', 135, '# Day 5 - Building Production RAG with Query Expansion and Multiprocessing

## Module Content

Welcome to **Day 5 - Building Production RAG with Query Expansion and Multiprocessing**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:53
- Module index: 135

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.278', '2026-06-23 07:36:05.278');
INSERT INTO public."CourseModule" VALUES ('0ec128ad-b887-4891-b88d-19003b28a153', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Advanced RAG Evaluation: From 0.73 to 0.91 MRR with GPT-4o', '11:03', 136, '# Day 5 - Advanced RAG Evaluation: From 0.73 to 0.91 MRR with GPT-4o

## Module Content

Welcome to **Day 5 - Advanced RAG Evaluation: From 0.73 to 0.91 MRR with GPT-4o**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:03
- Module index: 136

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.281', '2026-06-23 07:36:05.281');
INSERT INTO public."CourseModule" VALUES ('faf89a44-5bd3-451b-9ae3-45e81991f2ad', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - RAG Challenge: Beat My Results & Build Your Knowledge Worker', '9:14', 137, '# Day 5 - RAG Challenge: Beat My Results & Build Your Knowledge Worker

## Module Content

Welcome to **Day 5 - RAG Challenge: Beat My Results & Build Your Knowledge Worker**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:14
- Module index: 137

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.283', '2026-06-23 07:36:05.283');
INSERT INTO public."CourseModule" VALUES ('65641d73-8ca5-45c4-a1ef-94c8b52bff29', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Training, Datasets, and Generalization: Your Capstone Begins', '9:17', 138, '# Day 1 - Training, Datasets, and Generalization: Your Capstone Begins

## Module Content

Welcome to **Day 1 - Training, Datasets, and Generalization: Your Capstone Begins**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:17
- Module index: 138

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.287', '2026-06-23 07:36:05.287');
INSERT INTO public."CourseModule" VALUES ('f3a70e73-73ce-4589-8294-a033d61cdd08', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Finetuning LLMs & The Price is Right Capstone Project Intro', '12:16', 139, '# Day 1 - Finetuning LLMs & The Price is Right Capstone Project Intro

## Module Content

Welcome to **Day 1 - Finetuning LLMs & The Price is Right Capstone Project Intro**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:16
- Module index: 139

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.29', '2026-06-23 07:36:05.29');
INSERT INTO public."CourseModule" VALUES ('07544a7c-1294-4bc6-b3b4-58364664a38f', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Curating Datasets: Finding Data Sources and Building Training Sets', '10:04', 140, '# Day 1 - Curating Datasets: Finding Data Sources and Building Training Sets

## Module Content

Welcome to **Day 1 - Curating Datasets: Finding Data Sources and Building Training Sets**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:04
- Module index: 140

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.293', '2026-06-23 07:36:05.293');
INSERT INTO public."CourseModule" VALUES ('ee824ebd-0fc0-4f58-93ae-138322a61e0e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Curating Amazon Data with Hugging Face for Price Prediction', '12:58', 141, '# Day 1 - Curating Amazon Data with Hugging Face for Price Prediction

## Module Content

Welcome to **Day 1 - Curating Amazon Data with Hugging Face for Price Prediction**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:58
- Module index: 141

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.295', '2026-06-23 07:36:05.295');
INSERT INTO public."CourseModule" VALUES ('ac3410b1-7f44-4177-bb3f-00ff038710ce', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Exploring Amazon Dataset Distribution and Removing Duplicates', '11:24', 142, '# Day 1 - Exploring Amazon Dataset Distribution and Removing Duplicates

## Module Content

Welcome to **Day 1 - Exploring Amazon Dataset Distribution and Removing Duplicates**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:24
- Module index: 142

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.298', '2026-06-23 07:36:05.298');
INSERT INTO public."CourseModule" VALUES ('481abc38-6e29-40e7-8082-a1c7051a3485', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Weighted Sampling with NumPy and Uploading Datasets to Hugging Face', '11:53', 143, '# Day 1 - Weighted Sampling with NumPy and Uploading Datasets to Hugging Face

## Module Content

Welcome to **Day 1 - Weighted Sampling with NumPy and Uploading Datasets to Hugging Face**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:53
- Module index: 143

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.3', '2026-06-23 07:36:05.3');
INSERT INTO public."CourseModule" VALUES ('32352598-94c5-4564-8f32-b3a7431703ce', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Five-Step Strategy for Selecting and Applying LLMs to Business Problems', '10:28', 144, '# Day 2 - Five-Step Strategy for Selecting and Applying LLMs to Business Problems

## Module Content

Welcome to **Day 2 - Five-Step Strategy for Selecting and Applying LLMs to Business Problems**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:28
- Module index: 144

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.303', '2026-06-23 07:36:05.303');
INSERT INTO public."CourseModule" VALUES ('72b1dc6b-4056-421b-ab8a-6f42cd74c169', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - The Five-Step AI Process & Productionizing with MLOps', '8:33', 145, '# Day 2 - The Five-Step AI Process & Productionizing with MLOps

## Module Content

Welcome to **Day 2 - The Five-Step AI Process & Productionizing with MLOps**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:33
- Module index: 145

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.305', '2026-06-23 07:36:05.305');
INSERT INTO public."CourseModule" VALUES ('7f1db736-d8cf-49a0-a204-9a960c05936f', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Data Pre-processing with LLMs and Groq Batch Mode', '9:44', 146, '# Day 2 - Data Pre-processing with LLMs and Groq Batch Mode

## Module Content

Welcome to **Day 2 - Data Pre-processing with LLMs and Groq Batch Mode**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:44
- Module index: 146

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.307', '2026-06-23 07:36:05.307');
INSERT INTO public."CourseModule" VALUES ('77e478c5-dc0d-4cf6-b453-1a5c8f921b14', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Batch Processing with Groq API and JSONL Files for LLM Workflows', '12:29', 147, '# Day 2 - Batch Processing with Groq API and JSONL Files for LLM Workflows

## Module Content

Welcome to **Day 2 - Batch Processing with Groq API and JSONL Files for LLM Workflows**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:29
- Module index: 147

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.309', '2026-06-23 07:36:05.309');
INSERT INTO public."CourseModule" VALUES ('42fac254-606a-4c40-980a-7a90bc4a899c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Batch Processing with Groq: Running 22K LLM Requests for Under $1', '13:42', 148, '# Day 2 - Batch Processing with Groq: Running 22K LLM Requests for Under $1

## Module Content

Welcome to **Day 2 - Batch Processing with Groq: Running 22K LLM Requests for Under $1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 13:42
- Module index: 148

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.311', '2026-06-23 07:36:05.311');
INSERT INTO public."CourseModule" VALUES ('70c1457f-6185-43d9-a888-d43a4fc8ffbf', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building Baseline Models with Traditional ML and XGBoost', '11:31', 149, '# Day 3 - Building Baseline Models with Traditional ML and XGBoost

## Module Content

Welcome to **Day 3 - Building Baseline Models with Traditional ML and XGBoost**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:31
- Module index: 149

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.313', '2026-06-23 07:36:05.313');
INSERT INTO public."CourseModule" VALUES ('2938c7d1-f2a9-4459-9073-807c75298e86', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Building Your First Baseline with Random Pricer and Scikit-learn', '11:54', 150, '# Day 3 - Building Your First Baseline with Random Pricer and Scikit-learn

## Module Content

Welcome to **Day 3 - Building Your First Baseline with Random Pricer and Scikit-learn**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:54
- Module index: 150

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.315', '2026-06-23 07:36:05.315');
INSERT INTO public."CourseModule" VALUES ('158782d7-f860-4e27-b7fe-d1a9755e610c', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Baseline Models and Linear Regression with Scikit-Learn', '9:45', 151, '# Day 3 - Baseline Models and Linear Regression with Scikit-Learn

## Module Content

Welcome to **Day 3 - Baseline Models and Linear Regression with Scikit-Learn**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:45
- Module index: 151

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.319', '2026-06-23 07:36:05.319');
INSERT INTO public."CourseModule" VALUES ('f53720f6-b831-4856-aa88-addd11996871', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Bag of Words and CountVectorizer for Linear Regression NLP', '7:53', 152, '# Day 3 - Bag of Words and CountVectorizer for Linear Regression NLP

## Module Content

Welcome to **Day 3 - Bag of Words and CountVectorizer for Linear Regression NLP**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:53
- Module index: 152

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.321', '2026-06-23 07:36:05.321');
INSERT INTO public."CourseModule" VALUES ('d246b2b7-ce9a-47ee-8ea3-1ddf7332fdab', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Random Forest and XGBoost: Ensemble Models in Scikit-Learn', '10:23', 153, '# Day 3 - Random Forest and XGBoost: Ensemble Models in Scikit-Learn

## Module Content

Welcome to **Day 3 - Random Forest and XGBoost: Ensemble Models in Scikit-Learn**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:23
- Module index: 153

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.323', '2026-06-23 07:36:05.323');
INSERT INTO public."CourseModule" VALUES ('cf3ae783-ccb5-447b-bf57-e8745dc18833', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Training Your First Neural Network and Testing Frontier Models', '10:47', 154, '# Day 4 - Training Your First Neural Network and Testing Frontier Models

## Module Content

Welcome to **Day 4 - Training Your First Neural Network and Testing Frontier Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:47
- Module index: 154

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.325', '2026-06-23 07:36:05.325');
INSERT INTO public."CourseModule" VALUES ('58709ae7-8da6-4b17-bff6-1331f293c4dd', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Human Baseline Performance vs Machine Learning Models in PyTorch', '8:32', 155, '# Day 4 - Human Baseline Performance vs Machine Learning Models in PyTorch

## Module Content

Welcome to **Day 4 - Human Baseline Performance vs Machine Learning Models in PyTorch**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:32
- Module index: 155

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.327', '2026-06-23 07:36:05.327');
INSERT INTO public."CourseModule" VALUES ('9af7a294-af2d-4fae-a176-d599f30fe73b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Building Your First Neural Network with PyTorch', '10:28', 156, '# Day 4 - Building Your First Neural Network with PyTorch

## Module Content

Welcome to **Day 4 - Building Your First Neural Network with PyTorch**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:28
- Module index: 156

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.329', '2026-06-23 07:36:05.329');
INSERT INTO public."CourseModule" VALUES ('4068e190-b007-4e6b-a19a-c39ba1552163', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Testing GPT-4o-mini and Claude Opus Against Neural Networks', '11:12', 157, '# Day 4 - Testing GPT-4o-mini and Claude Opus Against Neural Networks

## Module Content

Welcome to **Day 4 - Testing GPT-4o-mini and Claude Opus Against Neural Networks**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:12
- Module index: 157

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.331', '2026-06-23 07:36:05.331');
INSERT INTO public."CourseModule" VALUES ('0884b7e2-012b-48aa-a4ce-b37236651b4a', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Testing Gemini 3, GPT-5.1, Claude 4.5 & Grok on Price Prediction', '10:31', 158, '# Day 4 - Testing Gemini 3, GPT-5.1, Claude 4.5 & Grok on Price Prediction

## Module Content

Welcome to **Day 4 - Testing Gemini 3, GPT-5.1, Claude 4.5 & Grok on Price Prediction**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:31
- Module index: 158

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.334', '2026-06-23 07:36:05.334');
INSERT INTO public."CourseModule" VALUES ('9d3b441f-ab23-47c6-9f13-c780bc028261', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Fine-Tuning OpenAI Frontier Models with Supervised Fine-Tuning', '12:59', 159, '# Day 5 - Fine-Tuning OpenAI Frontier Models with Supervised Fine-Tuning

## Module Content

Welcome to **Day 5 - Fine-Tuning OpenAI Frontier Models with Supervised Fine-Tuning**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:59
- Module index: 159

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.337', '2026-06-23 07:36:05.337');
INSERT INTO public."CourseModule" VALUES ('90ec83c0-686f-479f-bc18-3aaab777737b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Fine-Tuning GPT-4o Nano with OpenAI''s API for Custom Models', '9:18', 160, '# Day 5 - Fine-Tuning GPT-4o Nano with OpenAI''s API for Custom Models

## Module Content

Welcome to **Day 5 - Fine-Tuning GPT-4o Nano with OpenAI''s API for Custom Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:18
- Module index: 160

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.339', '2026-06-23 07:36:05.339');
INSERT INTO public."CourseModule" VALUES ('97aec34f-b16c-42a1-b533-16b52960071e', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Fine-Tuning GPT-4o-mini-nano: Running Jobs and Monitoring Training', '9:03', 161, '# Day 5 - Fine-Tuning GPT-4o-mini-nano: Running Jobs and Monitoring Training

## Module Content

Welcome to **Day 5 - Fine-Tuning GPT-4o-mini-nano: Running Jobs and Monitoring Training**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:03
- Module index: 161

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.341', '2026-06-23 07:36:05.341');
INSERT INTO public."CourseModule" VALUES ('1a9926ac-cb11-4bab-b05c-7535d03ea0a7', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Fine-Tuning Results: When GPT-4o-mini Gets Worse, Not Better', '9:39', 162, '# Day 5 - Fine-Tuning Results: When GPT-4o-mini Gets Worse, Not Better

## Module Content

Welcome to **Day 5 - Fine-Tuning Results: When GPT-4o-mini Gets Worse, Not Better**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:39
- Module index: 162

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.343', '2026-06-23 07:36:05.343');
INSERT INTO public."CourseModule" VALUES ('af1faaa3-6b7a-4739-b499-7271b02a9a50', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - When Fine-Tuning Frontier Models Fails & Building Deep Neural Networks', '9:51', 163, '# Day 5 - When Fine-Tuning Frontier Models Fails & Building Deep Neural Networks

## Module Content

Welcome to **Day 5 - When Fine-Tuning Frontier Models Fails & Building Deep Neural Networks**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:51
- Module index: 163

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.345', '2026-06-23 07:36:05.345');
INSERT INTO public."CourseModule" VALUES ('d72b79a7-2506-4355-b50e-a6e2ce6d1a78', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Deep Neural Network Redemption: 289M Parameters vs Frontier Models', '10:08', 164, '# Day 5 - Deep Neural Network Redemption: 289M Parameters vs Frontier Models

## Module Content

Welcome to **Day 5 - Deep Neural Network Redemption: 289M Parameters vs Frontier Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:08
- Module index: 164

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.348', '2026-06-23 07:36:05.348');
INSERT INTO public."CourseModule" VALUES ('51edf1a6-ef0c-419d-9c9d-89f3c4e82341', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Introduction to QLoRA for Fine-Tuning Open-Source Models', '7:44', 165, '# Day 1 - Introduction to QLoRA for Fine-Tuning Open-Source Models

## Module Content

Welcome to **Day 1 - Introduction to QLoRA for Fine-Tuning Open-Source Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:44
- Module index: 165

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.351', '2026-06-23 07:36:05.351');
INSERT INTO public."CourseModule" VALUES ('4c9bc686-f0af-4147-951b-14754b931474', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - LoRA: Training LLaMA 3.2 with Low-Rank Adapters', '8:31', 166, '# Day 1 - LoRA: Training LLaMA 3.2 with Low-Rank Adapters

## Module Content

Welcome to **Day 1 - LoRA: Training LLaMA 3.2 with Low-Rank Adapters**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:31
- Module index: 166

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.353', '2026-06-23 07:36:05.353');
INSERT INTO public."CourseModule" VALUES ('10777a0b-1956-4dcf-9e93-29c78b6b66dc', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - LoRA Hyperparameters and QLoRA Quantization Explained', '11:38', 167, '# Day 1 - LoRA Hyperparameters and QLoRA Quantization Explained

## Module Content

Welcome to **Day 1 - LoRA Hyperparameters and QLoRA Quantization Explained**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:38
- Module index: 167

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.355', '2026-06-23 07:36:05.355');
INSERT INTO public."CourseModule" VALUES ('4f3849e6-9933-4baa-aaa0-339d1009d280', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Setting Up Google Colab and Exploring LLaMA 3.2 Model Architecture', '14:35', 168, '# Day 1 - Setting Up Google Colab and Exploring LLaMA 3.2 Model Architecture

## Module Content

Welcome to **Day 1 - Setting Up Google Colab and Exploring LLaMA 3.2 Model Architecture**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 14:35
- Module index: 168

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.357', '2026-06-23 07:36:05.357');
INSERT INTO public."CourseModule" VALUES ('c3169544-093e-43e3-a475-82c29fdf0388', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Loading Models with 8-bit and 4-bit Quantization Using QLoRA', '10:53', 169, '# Day 1 - Loading Models with 8-bit and 4-bit Quantization Using QLoRA

## Module Content

Welcome to **Day 1 - Loading Models with 8-bit and 4-bit Quantization Using QLoRA**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:53
- Module index: 169

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.359', '2026-06-23 07:36:05.359');
INSERT INTO public."CourseModule" VALUES ('20409a86-e8ff-437d-8697-6b58d9f4e85b', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - LoRA Parameter Calculations and Model Size on Hugging Face', '8:42', 170, '# Day 1 - LoRA Parameter Calculations and Model Size on Hugging Face

## Module Content

Welcome to **Day 1 - LoRA Parameter Calculations and Model Size on Hugging Face**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:42
- Module index: 170

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.362', '2026-06-23 07:36:05.362');
INSERT INTO public."CourseModule" VALUES ('b36f9891-06ed-41c5-9f75-b3806a64dd50', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Preparing Your Dataset for Fine-Tuning with Token Limits', '10:35', 171, '# Day 2 - Preparing Your Dataset for Fine-Tuning with Token Limits

## Module Content

Welcome to **Day 2 - Preparing Your Dataset for Fine-Tuning with Token Limits**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:35
- Module index: 171

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.364', '2026-06-23 07:36:05.364');
INSERT INTO public."CourseModule" VALUES ('05214f49-d5b9-42ae-986a-3ed84b97ba04', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Fine-Tuning Data Prep: Rounding Prices and Token Length Optimization', '12:28', 172, '# Day 2 - Fine-Tuning Data Prep: Rounding Prices and Token Length Optimization

## Module Content

Welcome to **Day 2 - Fine-Tuning Data Prep: Rounding Prices and Token Length Optimization**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 12:28
- Module index: 172

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.368', '2026-06-23 07:36:05.368');
INSERT INTO public."CourseModule" VALUES ('7439d72a-250f-415a-af03-16fb9e533016', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Preparing Hugging Face Datasets and Testing Base LLaMA 3.2 Model', '10:33', 173, '# Day 2 - Preparing Hugging Face Datasets and Testing Base LLaMA 3.2 Model

## Module Content

Welcome to **Day 2 - Preparing Hugging Face Datasets and Testing Base LLaMA 3.2 Model**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:33
- Module index: 173

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.37', '2026-06-23 07:36:05.37');
INSERT INTO public."CourseModule" VALUES ('eec3cdac-8642-4324-8918-e648e6e6b7c7', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Base Models vs Chat Models: Understanding LLaMA Fine-Tuning', '11:22', 174, '# Day 2 - Base Models vs Chat Models: Understanding LLaMA Fine-Tuning

## Module Content

Welcome to **Day 2 - Base Models vs Chat Models: Understanding LLaMA Fine-Tuning**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:22
- Module index: 174

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.372', '2026-06-23 07:36:05.372');
INSERT INTO public."CourseModule" VALUES ('8c049b5d-1e4e-473f-ad71-a2f12006b969', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Fine-Tuning Hyperparameters: QLoRA Settings and Training Config', '11:17', 175, '# Day 3 - Fine-Tuning Hyperparameters: QLoRA Settings and Training Config

## Module Content

Welcome to **Day 3 - Fine-Tuning Hyperparameters: QLoRA Settings and Training Config**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 11:17
- Module index: 175

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.373', '2026-06-23 07:36:05.373');
INSERT INTO public."CourseModule" VALUES ('6bbb06b5-cf47-4fe9-8b9c-1ec9c42ca3f3', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Learning Rate, Optimizers, and Training Hyperparameters for LoRA', '9:59', 176, '# Day 3 - Learning Rate, Optimizers, and Training Hyperparameters for LoRA

## Module Content

Welcome to **Day 3 - Learning Rate, Optimizers, and Training Hyperparameters for LoRA**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:59
- Module index: 176

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.376', '2026-06-23 07:36:05.376');
INSERT INTO public."CourseModule" VALUES ('21bddaa6-eadf-4c4b-a1cd-e4dd53e73756', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Setting Up Training: Hyperparameters, qLoRA Config & Weights & Biases', '14:06', 177, '# Day 3 - Setting Up Training: Hyperparameters, qLoRA Config & Weights & Biases

## Module Content

Welcome to **Day 3 - Setting Up Training: Hyperparameters, qLoRA Config & Weights & Biases**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 14:06
- Module index: 177

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.378', '2026-06-23 07:36:05.378');
INSERT INTO public."CourseModule" VALUES ('c5feb14c-2ef5-4129-8c0a-f3f200ba1982', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Setting Up Weights & Biases and the HuggingFace SFT Trainer', '9:03', 178, '# Day 3 - Setting Up Weights & Biases and the HuggingFace SFT Trainer

## Module Content

Welcome to **Day 3 - Setting Up Weights & Biases and the HuggingFace SFT Trainer**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:03
- Module index: 178

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.38', '2026-06-23 07:36:05.38');
INSERT INTO public."CourseModule" VALUES ('40e6d635-f157-4b23-8545-565274f512eb', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 3 - Running Fine-Tuning with TRL and Monitoring Training in Weights & Biases', '9:21', 179, '# Day 3 - Running Fine-Tuning with TRL and Monitoring Training in Weights & Biases

## Module Content

Welcome to **Day 3 - Running Fine-Tuning with TRL and Monitoring Training in Weights & Biases**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:21
- Module index: 179

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.384', '2026-06-23 07:36:05.384');
INSERT INTO public."CourseModule" VALUES ('fd31bd2e-5bf4-46cd-931b-2462e5a01fce', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Monitoring Your Fine-Tuning Run with Weights & Biases', '10:39', 180, '# Day 4 - Monitoring Your Fine-Tuning Run with Weights & Biases

## Module Content

Welcome to **Day 4 - Monitoring Your Fine-Tuning Run with Weights & Biases**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:39
- Module index: 180

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.387', '2026-06-23 07:36:05.387');
INSERT INTO public."CourseModule" VALUES ('7c04c6cb-3724-40c1-abbd-230757859bc3', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Full Dataset Training on Google Colab A100 with 800K Data Points', '10:17', 181, '# Day 4 - Full Dataset Training on Google Colab A100 with 800K Data Points

## Module Content

Welcome to **Day 4 - Full Dataset Training on Google Colab A100 with 800K Data Points**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:17
- Module index: 181

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.389', '2026-06-23 07:36:05.389');
INSERT INTO public."CourseModule" VALUES ('712680b9-b423-4152-b34e-88e4595a19f4', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Monitoring Training Loss and Learning Rate in Weights & Biases', '8:57', 182, '# Day 4 - Monitoring Training Loss and Learning Rate in Weights & Biases

## Module Content

Welcome to **Day 4 - Monitoring Training Loss and Learning Rate in Weights & Biases**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:57
- Module index: 182

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.391', '2026-06-23 07:36:05.391');
INSERT INTO public."CourseModule" VALUES ('fce7c5dd-6718-4de4-867e-d91a29e96fd8', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Analyzing Weights & Biases Results and Catching Overfitting', '10:31', 183, '# Day 4 - Analyzing Weights & Biases Results and Catching Overfitting

## Module Content

Welcome to **Day 4 - Analyzing Weights & Biases Results and Catching Overfitting**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 10:31
- Module index: 183

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.393', '2026-06-23 07:36:05.393');
INSERT INTO public."CourseModule" VALUES ('2d9eceb5-ee94-47e4-99fd-ee5c247f0a43', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 4 - Managing Runs in Weights & Biases and Selecting Best Model Checkpoints', '5:40', 184, '# Day 4 - Managing Runs in Weights & Biases and Selecting Best Model Checkpoints

## Module Content

Welcome to **Day 4 - Managing Runs in Weights & Biases and Selecting Best Model Checkpoints**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 5:40
- Module index: 184

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.396', '2026-06-23 07:36:05.396');
INSERT INTO public."CourseModule" VALUES ('c248d39e-85e0-4902-8ea9-39e197a8b508', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Results Day: Running Inference on Fine-Tuned Models & Loss Calculation D', '7:35', 185, '# Day 5 - Results Day: Running Inference on Fine-Tuned Models & Loss Calculation D

## Module Content

Welcome to **Day 5 - Results Day: Running Inference on Fine-Tuned Models & Loss Calculation D**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 7:35
- Module index: 185

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.399', '2026-06-23 07:36:05.399');
INSERT INTO public."CourseModule" VALUES ('1fbc39bd-9354-4d0c-b2c4-869c6970c3cf', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Cross-Entropy Loss: How LLMs Calculate Probability Distributions', '8:55', 186, '# Day 5 - Cross-Entropy Loss: How LLMs Calculate Probability Distributions

## Module Content

Welcome to **Day 5 - Cross-Entropy Loss: How LLMs Calculate Probability Distributions**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 8:55
- Module index: 186

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.402', '2026-06-23 07:36:05.402');
INSERT INTO public."CourseModule" VALUES ('14ca3aa1-f31d-4973-9d79-b09c78fee304', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Testing Our Fine-Tuned LoRA Model Against GPT-4o Nano', '6:42', 187, '# Day 5 - Testing Our Fine-Tuned LoRA Model Against GPT-4o Nano

## Module Content

Welcome to **Day 5 - Testing Our Fine-Tuned LoRA Model Against GPT-4o Nano**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 6:42
- Module index: 187

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.404', '2026-06-23 07:36:05.404');
INSERT INTO public."CourseModule" VALUES ('29d08504-c4e4-4e69-9b58-1ff15cf56b42', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 5 - Fine-Tuned LLaMA 3.2 Crushes GPT-5.1 and Frontier Models', '9:50', 188, '# Day 5 - Fine-Tuned LLaMA 3.2 Crushes GPT-5.1 and Frontier Models

## Module Content

Welcome to **Day 5 - Fine-Tuned LLaMA 3.2 Crushes GPT-5.1 and Frontier Models**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 9:50
- Module index: 188

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:36:05.407', '2026-06-23 07:36:05.407');
INSERT INTO public."CourseModule" VALUES ('45c9c01a-f9f3-4810-b645-69a7beceec3c', '68605e1d-cabf-49fe-8972-57a5820b4b5c', 'Module 1: Introduction to AI', '45m', 1, '# Module 1

## Module Content

Welcome to **Module 1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 1

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.05', '2026-06-23 07:46:43.05');
INSERT INTO public."CourseModule" VALUES ('75827175-fe1c-49ea-a2fb-a9158cc4e589', '68605e1d-cabf-49fe-8972-57a5820b4b5c', 'Module 2: Introduction to AI', '45m', 2, '# Module 2

## Module Content

Welcome to **Module 2**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 2

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.053', '2026-06-23 07:46:43.053');
INSERT INTO public."CourseModule" VALUES ('799181f0-8ff6-453f-bbef-4f00f9e09d5b', '68605e1d-cabf-49fe-8972-57a5820b4b5c', 'Module 3: Introduction to AI', '45m', 3, '# Module 3

## Module Content

Welcome to **Module 3**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 3

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.055', '2026-06-23 07:46:43.055');
INSERT INTO public."CourseModule" VALUES ('ff2b4d8e-f7d6-4b9b-80b1-531e2cc5b2ac', '68605e1d-cabf-49fe-8972-57a5820b4b5c', 'Module 4: Introduction to AI', '45m', 4, '# Module 4

## Module Content

Welcome to **Module 4**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 4

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.057', '2026-06-23 07:46:43.057');
INSERT INTO public."CourseModule" VALUES ('0d4a0b22-c2ae-4593-82ca-75b868c50a49', '68605e1d-cabf-49fe-8972-57a5820b4b5c', 'Module 5: Introduction to AI', '45m', 5, '# Module 5

## Module Content

Welcome to **Module 5**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 5

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.059', '2026-06-23 07:46:43.059');
INSERT INTO public."CourseModule" VALUES ('ba5b5065-94d0-4c38-b0b6-06700418c28f', '12869644-eae2-4391-8682-e01076756fa1', 'Module 1: Introduction to The', '45m', 1, '# Module 1

## Module Content

Welcome to **Module 1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 1

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.065', '2026-06-23 07:46:43.065');
INSERT INTO public."CourseModule" VALUES ('1f34b56e-8eee-441f-bf95-5d6bf8f185a9', '12869644-eae2-4391-8682-e01076756fa1', 'Module 2: Introduction to The', '45m', 2, '# Module 2

## Module Content

Welcome to **Module 2**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 2

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.067', '2026-06-23 07:46:43.067');
INSERT INTO public."CourseModule" VALUES ('b8294be4-8043-4136-bb64-ab38a7faf12b', '12869644-eae2-4391-8682-e01076756fa1', 'Module 3: Introduction to The', '45m', 3, '# Module 3

## Module Content

Welcome to **Module 3**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 3

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.068', '2026-06-23 07:46:43.068');
INSERT INTO public."CourseModule" VALUES ('a24f1430-5d84-4cce-b9a4-525ee5492e94', '12869644-eae2-4391-8682-e01076756fa1', 'Module 5: Introduction to The', '45m', 5, '# Module 5

## Module Content

Welcome to **Module 5**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 5

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.072', '2026-06-23 07:46:43.072');
INSERT INTO public."CourseModule" VALUES ('0077dc36-b937-4614-9daa-3b98088be4ae', '12f34d37-b611-453e-b5a5-ed9ab58e6490', 'Module 1: Introduction to AI', '45m', 1, '# Module 1

## Module Content

Welcome to **Module 1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 1

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.077', '2026-06-23 07:46:43.077');
INSERT INTO public."CourseModule" VALUES ('a0300987-0886-46a2-b436-4f6308b053ba', '12f34d37-b611-453e-b5a5-ed9ab58e6490', 'Module 2: Introduction to AI', '45m', 2, '# Module 2

## Module Content

Welcome to **Module 2**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 2

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.08', '2026-06-23 07:46:43.08');
INSERT INTO public."CourseModule" VALUES ('b51f6eed-56bc-4dad-96fa-826402964ce3', '12f34d37-b611-453e-b5a5-ed9ab58e6490', 'Module 3: Introduction to AI', '45m', 3, '# Module 3

## Module Content

Welcome to **Module 3**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 3

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.082', '2026-06-23 07:46:43.082');
INSERT INTO public."CourseModule" VALUES ('6210adc3-d615-448b-8e6a-e5496c96736f', '12f34d37-b611-453e-b5a5-ed9ab58e6490', 'Module 4: Introduction to AI', '45m', 4, '# Module 4

## Module Content

Welcome to **Module 4**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 4

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.084', '2026-06-23 07:46:43.084');
INSERT INTO public."CourseModule" VALUES ('840a28a9-bfa4-4c2e-9c18-7fa331543426', '12f34d37-b611-453e-b5a5-ed9ab58e6490', 'Module 5: Introduction to AI', '45m', 5, '# Module 5

## Module Content

Welcome to **Module 5**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 5

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.086', '2026-06-23 07:46:43.086');
INSERT INTO public."CourseModule" VALUES ('32912e30-9a49-4e3d-afde-e30cdc5b1dcd', 'ca0086a6-27a7-4103-809f-5854b91a3afb', 'Module 1: Introduction to Physics', '45m', 1, '# Module 1

## Module Content

Welcome to **Module 1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 1

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.09', '2026-06-23 07:46:43.09');
INSERT INTO public."CourseModule" VALUES ('31c9b5f7-f4b8-4845-b8db-807784e11e08', 'ca0086a6-27a7-4103-809f-5854b91a3afb', 'Module 2: Introduction to Physics', '45m', 2, '# Module 2

## Module Content

Welcome to **Module 2**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 2

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.092', '2026-06-23 07:46:43.092');
INSERT INTO public."CourseModule" VALUES ('52f68104-1964-4ea2-9519-dd87b0ddb4de', 'ca0086a6-27a7-4103-809f-5854b91a3afb', 'Module 3: Introduction to Physics', '45m', 3, '# Module 3

## Module Content

Welcome to **Module 3**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 3

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.093', '2026-06-23 07:46:43.093');
INSERT INTO public."CourseModule" VALUES ('70e26883-cbc6-4f80-a18e-ba155616863e', 'ca0086a6-27a7-4103-809f-5854b91a3afb', 'Module 4: Introduction to Physics', '45m', 4, '# Module 4

## Module Content

Welcome to **Module 4**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 4

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.096', '2026-06-23 07:46:43.096');
INSERT INTO public."CourseModule" VALUES ('0d0b2409-0b82-4639-bfb5-4ab9e356c48d', 'ca0086a6-27a7-4103-809f-5854b91a3afb', 'Module 5: Introduction to Physics', '45m', 5, '# Module 5

## Module Content

Welcome to **Module 5**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 5

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.097', '2026-06-23 07:46:43.097');
INSERT INTO public."CourseModule" VALUES ('6c178865-ac56-4393-a859-5af2cd961261', 'e7507ab9-267f-4d89-90bc-6d0d8bb6438c', 'Module 1: Introduction to Quantum', '45m', 1, '# Module 1

## Module Content

Welcome to **Module 1**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 1

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.101', '2026-06-23 07:46:43.101');
INSERT INTO public."CourseModule" VALUES ('47a86a0a-d607-497a-bede-12a0ec61ebe0', 'e7507ab9-267f-4d89-90bc-6d0d8bb6438c', 'Module 2: Introduction to Quantum', '45m', 2, '# Module 2

## Module Content

Welcome to **Module 2**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 2

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.103', '2026-06-23 07:46:43.103');
INSERT INTO public."CourseModule" VALUES ('5334bcc3-c128-4b5a-a805-1b55ad69bb3f', 'e7507ab9-267f-4d89-90bc-6d0d8bb6438c', 'Module 3: Introduction to Quantum', '45m', 3, '# Module 3

## Module Content

Welcome to **Module 3**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 3

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.105', '2026-06-23 07:46:43.105');
INSERT INTO public."CourseModule" VALUES ('7cd940c6-c0b6-4f62-a587-27fc192fff54', 'e7507ab9-267f-4d89-90bc-6d0d8bb6438c', 'Module 4: Introduction to Quantum', '45m', 4, '# Module 4

## Module Content

Welcome to **Module 4**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 4

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.107', '2026-06-23 07:46:43.107');
INSERT INTO public."CourseModule" VALUES ('b1cdbf52-ea8c-44d5-af37-facb8003c4be', 'e7507ab9-267f-4d89-90bc-6d0d8bb6438c', 'Module 5: Introduction to Quantum', '45m', 5, '# Module 5

## Module Content

Welcome to **Module 5**. 

This is a placeholder content for the module. In a fully populated system, this section would contain detailed explanations, code snippets, and interactive exercises.

### Key Points:
- Expected duration: 45m
- Module index: 5

Please refer to the course video or external resources for the full lecture content.
', '2026-06-23 07:46:43.109', '2026-06-23 07:46:43.109');
INSERT INTO public."CourseModule" VALUES ('82a01573-368e-4832-a579-aaf6c935dbea', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Spanish Tutor Demo with Open-Source Models & Course Overview', '8:54', 2, '# Spanish Tutor Demo with Open-Source Models & Course Overview

## Course Overview

Welcome to the **AI Engineer Core Track**! This is an intensive 8-week bootcamp that will transform you from a beginner to a proficient AI Engineer.

### What You''ll Build

Throughout this course, you''ll complete **8 hands-on projects**:

| # | Project | Key Skills |
|---|---------|------------|
| 1 | AI Brochure Generator | Web scraping, Chat Completions API |
| 2 | Airline Support Agent | Multi-modal AI, Function calling |
| 3 | Meeting Minutes Tool | Audio processing, Open-source models |
| 4 | Python ? C++ Converter | Code generation, Performance optimization |
| 5 | RAG Knowledge Worker | Vector databases, Retrieval systems |
| 6 | Price Predictor (Frontier) | Fine-tuning, Prompt engineering |
| 7 | Price Predictor (Open-Source) | QLoRA, Model training |
| 8 | Multi-Agent Deal Finder | Autonomous agents, Collaboration |

---

## Demo: Spanish Tutor with Open-Source Models

Let''s start with a fun demo! We''ll build a **Spanish language tutor** powered entirely by open-source models running locally.

### The Architecture

```
User Input (English) ? LLM (Ollama) ? Spanish Translation + Explanation
```

### Code Implementation

```python
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
result = spanish_tutor("How do I say ''I want to learn programming''?")
print(result)
```

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

### ?? Week 1: Foundations
- LLM basics, API setup, first projects
- OpenAI, Ollama, environment configuration

### ?? Week 2: Building Applications  
- Gradio UIs, tool calling, agentic workflows
- Multi-model conversations, streaming

### ?? Week 3: Open-Source Ecosystem
- Hugging Face, Google Colab, GPU computing
- Transformers, tokenizers, model inference

### ?? Week 4: Model Selection
- Benchmarks, leaderboards, code generation
- Python ? C++/Rust translation challenges

### ?? Weeks 5: RAG (Retrieval Augmented Generation)
- Vector databases, embeddings, LangChain
- Production RAG with evaluation metrics

### ?? Weeks 6-7: Fine-Tuning & Capstone
- Dataset curation, QLoRA, training loops
- Frontier vs open-source model competition

### ?? Week 8: Multi-Agent Systems
- Autonomous agents, MCP protocol
- Capstone: Deal-finding agent system

---

## Key Takeaways

- This course is **project-driven** — you learn by building
- You''ll work with both **frontier** (GPT, Claude) and **open-source** (LLaMA, Mistral) models
- No prior AI/ML experience required — just Python basics
- By the end, you''ll have a **portfolio of 8 real AI projects**
', '2026-06-23 07:36:04.935', '2026-06-23 08:08:17.27');
INSERT INTO public."CourseModule" VALUES ('b54e4883-5b15-493d-a808-35f9006322ef', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Your Path to Becoming a Proficient AI Engineer', '3:42', 3, '# Your Path to Becoming a Proficient AI Engineer

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

```
+-------------------------------------+
¦           AI Applications           ¦
¦  (Chatbots, Agents, RAG Systems)    ¦
+-------------------------------------¦
¦         Frameworks & Tools          ¦
¦  (LangChain, Gradio, FastAPI)       ¦
+-------------------------------------¦
¦           LLM Providers             ¦
¦  (OpenAI, Anthropic, Ollama)        ¦
+-------------------------------------¦
¦        Foundation Models            ¦
¦  (GPT-5, Claude, LLaMA, Mistral)   ¦
+-------------------------------------+
```

---

## Skills You''ll Master

### 1. ?? API Integration
- Connect to multiple LLM providers
- Handle streaming, function calling, structured outputs

### 2. ??? Application Architecture  
- Design scalable AI systems
- Build production-ready pipelines

### 3. ?? RAG (Retrieval Augmented Generation)
- Vector databases and embeddings
- Document processing and chunking

### 4. ?? Fine-Tuning
- QLoRA and parameter-efficient training
- Dataset curation and evaluation

### 5. ?? Agentic AI
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
- You don''t need a PhD — you need **practical skills** and **project experience**
- This course gives you both the theory and the portfolio to succeed
', '2026-06-23 07:36:04.939', '2026-06-23 08:08:17.274');
INSERT INTO public."CourseModule" VALUES ('66964b0f-dac7-4d1a-99b3-c28ba7c528f8', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Mac Setup: Installing Git, Cloning the Repo, and Cursor IDE', '9:47', 6, '# Mac Setup: Installing Git, Cloning the Repo, and Cursor IDE

## Overview

This module covers the complete macOS setup for AI Engineering development.

---

## Step 1: Install Homebrew

Homebrew is the package manager for macOS:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Verify
brew --version
```

---

## Step 2: Install Git

```bash
# macOS may already have git, but let''s get the latest:
brew install git

# Verify
git --version

# Configure
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## Step 3: Install Python

```bash
brew install python@3.12

# Verify
python3 --version
pip3 --version
```

---

## Step 4: Clone the Repository

```bash
cd ~/Documents
git clone https://github.com/your-course-repo/ai-engineer-course.git
cd ai-engineer-course
```

---

## Step 5: Install Cursor IDE

1. Download from [cursor.com](https://cursor.com)
2. Drag to Applications folder
3. Launch and sign in
4. Open the course folder: `cursor ~/Documents/ai-engineer-course`

---

## Step 6: Set Up the Python Environment

```bash
# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment
uv venv

# Activate
source .venv/bin/activate

# Install dependencies
uv pip install openai python-dotenv jupyter ipykernel
```

---

## Key Takeaways

1. **Homebrew** simplifies package management on macOS
2. Install **Git**, **Python 3.12+**, and **Cursor** as your core tools
3. Use **UV** for fast Python dependency management
4. Always work inside a **virtual environment**
', '2026-06-23 07:36:04.949', '2026-06-23 08:08:17.281');
INSERT INTO public."CourseModule" VALUES ('2932ad0b-43f9-47db-97d2-197699a47188', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Setting Up Your OpenAI API Key and Environment Variables', '12:28', 8, '# Setting Up Your OpenAI API Key and Environment Variables

## Why API Keys Matter

API keys are your credentials for accessing AI model providers. Managing them securely is a critical skill for any AI Engineer.

> ?? **Never hardcode API keys in your source code!** Use environment variables.

---

## Getting Your OpenAI API Key

### Step 1: Create an OpenAI Account
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** section

### Step 2: Generate a Key
1. Click **"Create new secret key"**
2. Give it a name (e.g., "AI Engineer Course")
3. Copy the key immediately (you won''t see it again!)

### Step 3: Add Credits
- New accounts get free credits
- Add a payment method for continued usage
- Set **usage limits** to avoid surprises

---

## Storing Keys Securely with .env Files

### Create a .env file
```bash
# In your project root:
touch .env
```

### Add your keys
```env
# .env file
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
GOOGLE_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxx
```

### Add .env to .gitignore
```bash
echo ".env" >> .gitignore
```

> ??? This prevents your API keys from being committed to Git!

---

## Loading Environment Variables in Python

### Using python-dotenv
```python
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Access keys
openai_key = os.getenv("OPENAI_API_KEY")
anthropic_key = os.getenv("ANTHROPIC_API_KEY")

print(f"OpenAI key loaded: {openai_key[:10]}...")
```

### Using with OpenAI Client
```python
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
```

---

## API Key Best Practices

| ? Do | ? Don''t |
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
3. Always add `.env` to `.gitignore`
4. Set **spending limits** on your API accounts
5. The OpenAI client **auto-reads** the `OPENAI_API_KEY` environment variable
', '2026-06-23 07:36:04.954', '2026-06-23 08:08:17.286');
INSERT INTO public."CourseModule" VALUES ('cca87b3c-44e3-4015-a242-60b67f23e5e4', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Installing Cursor Extensions and Setting Up Your Jupyter Notebook', '9:04', 9, '# Installing Cursor Extensions and Setting Up Your Jupyter Notebook

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
```bash
uv pip install jupyter ipykernel
python -m ipykernel install --user --name=ai-course
```

### Create Your First Notebook

1. In Cursor, press `Ctrl+Shift+P`
2. Type "Jupyter: Create New Blank Notebook"
3. Select the `ai-course` kernel

### Your First Notebook Cell
```python
# Cell 1: Imports and setup
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()

print("? Setup complete!")
```

```python
# Cell 2: Make your first API call
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What are the top 3 benefits of learning AI engineering?"}
    ]
)

print(response.choices[0].message.content)
```

---

## Jupyter Tips & Tricks

| Shortcut | Action |
|----------|--------|
| `Shift+Enter` | Run cell and move to next |
| `Ctrl+Enter` | Run cell in place |
| `Esc + A` | Insert cell above |
| `Esc + B` | Insert cell below |
| `Esc + DD` | Delete cell |
| `Esc + M` | Convert to Markdown |

---

## Key Takeaways

1. Install **Python**, **Jupyter**, and **Pylance** extensions in Cursor
2. Use `ipykernel` to register your virtual environment as a Jupyter kernel
3. Notebooks are ideal for **experimentation** and **learning**
4. Master the keyboard shortcuts for efficient notebook workflow
', '2026-06-23 07:36:04.958', '2026-06-23 08:08:17.288');
INSERT INTO public."CourseModule" VALUES ('a4bc9932-9be4-45d3-b4c9-59073eb85ea6', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 1 - Running Your First LLM Locally with Ollama and Open Source Models', '10:44', 1, '# Running Your First LLM Locally with Ollama and Open Source Models

## Introduction

Welcome to **Day 1** of your AI Engineer journey! In this module, you''ll learn how to run Large Language Models (LLMs) directly on your own machine using **Ollama**.

> **Why run models locally?** Privacy, zero API costs, and unlimited experimentation.

---

## What is Ollama?

[Ollama](https://ollama.com) is an open-source tool that makes it easy to download and run LLMs locally. Think of it as "Docker for LLMs."

### Key Features:
- ?? **One-command setup** — Download and run models instantly
- ?? **Cross-platform** — Works on macOS, Linux, and Windows
- ?? **OpenAI-compatible API** — Drop-in replacement for OpenAI endpoints

---

## Installing Ollama

### Windows
\`\`\`bash
# Download from https://ollama.com/download/windows
# Run the installer — Ollama starts as a system service
\`\`\`

### macOS
\`\`\`bash
brew install ollama
\`\`\`

### Linux
\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

---

## Running Your First Model

\`\`\`bash
ollama run llama3.2
\`\`\`

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

\`\`\`python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Explain transformers in AI"}]
)
print(response.choices[0].message.content)
\`\`\`

---

## ?? Knowledge Check

> **Q1:** What command downloads and runs LLaMA 3.2?
>
> **A1:** \`ollama run llama3.2\`

> **Q2:** What port does Ollama''s API run on?
>
> **A2:** Port **11434** — accessible at http://localhost:11434

---

## Key Takeaways

1. **Ollama** = one command to run LLMs locally
2. Open-source models like LLaMA and Mistral are **free and capable**
3. The **OpenAI-compatible API** lets you swap local/cloud models easily
4. Start with small models (3B-7B) for fast iteration', '2026-06-23 08:16:14.304', '2026-06-23 08:16:14.304');
INSERT INTO public."CourseModule" VALUES ('2a035c85-c7f5-4124-8dc9-287ec6c51ed3', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Your 8-Week Journey: From Chat Completions API to LLM Engineer', '2:51', 14, '# Your 8-Week Journey: From Chat Completions API to LLM Engineer

## The Learning Path

This course is structured as an 8-week intensive bootcamp. Here''s what each week covers and why it matters.

---

## Week-by-Week Breakdown

### ?? Week 1: Foundations & First API Calls
**Goal:** Get comfortable with LLMs and APIs

| Day | Topic | You''ll Build |
|-----|-------|-------------|
| 1 | Ollama, setup, first calls | Local LLM runner |
| 2 | Building blocks, models | Mental model of LLM ecosystem |
| 3 | Frontier models deep-dive | Model comparison tool |
| 4 | Transformers, tokens | Tokenizer explorer |
| 5 | Brochure generator | AI-powered web scraper |

### ?? Week 2: Applications & Tools
**Goal:** Build real UIs and use advanced features

- Gradio for data science UIs
- Tool calling and function execution
- Multi-modal AI (images, audio, text)
- Agentic workflows

### ?? Week 3: Open-Source Ecosystem
**Goal:** Master Hugging Face and open-source models

- Hugging Face platform and libraries
- Google Colab and GPU computing
- Running inference on various models
- Building meeting minutes from audio

### ?? Week 4: Model Selection & Code Generation
**Goal:** Choose the right model for each task

- AI benchmarks and leaderboards
- Python to C++/Rust code translation
- Performance optimization with AI

### ?? Week 5: RAG
**Goal:** Build production-ready retrieval systems

- Vector embeddings and databases
- LangChain RAG pipelines
- Evaluation metrics (MRR, nDCG)
- Advanced techniques (re-ranking, query expansion)

### ?? Weeks 6-7: Fine-Tuning & Capstone
**Goal:** Train your own models

- Dataset curation and preprocessing
- QLoRA fine-tuning on Google Colab
- Comparing fine-tuned vs frontier models

### ?? Week 8: Multi-Agent Systems
**Goal:** Build autonomous AI systems

- Agent architectures
- MCP (Model Context Protocol)
- Multi-agent collaboration

---

## ?? Knowledge Check

> **Q:** After this course, what will differentiate you from someone who just uses ChatGPT?
>
> **A:** You''ll be able to build production AI systems, choose the right model for each task, fine-tune models, build RAG pipelines, and create autonomous agents. You''ll go from *user* to *builder*.

---

## Key Takeaways

1. The course follows a **logical progression**: basics ? apps ? open-source ? selection ? RAG ? fine-tuning ? agents
2. Each week builds on the previous one
3. By week 8, you''ll have built **8 real projects** for your portfolio
', '2026-06-23 07:36:04.971', '2026-06-23 08:16:14.313');
INSERT INTO public."CourseModule" VALUES ('18f34672-cf7e-4e57-892a-619fb9aaf9cb', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 'Day 2 - Running Ollama Locally with OpenAI-Compatible Endpoints', '10:28', 19, '# Running Ollama Locally with OpenAI-Compatible Endpoints

## Ollama as a Local API Server

Ollama doesn''t just provide a CLI — it runs a full API server that''s compatible with OpenAI''s API format.

---

## The Ollama API

When Ollama runs, it starts a server on `http://localhost:11434`:

### Native Ollama API
```python
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
```

### OpenAI-Compatible API
```python
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
```

---

## Managing Models

```bash
# List running models
curl http://localhost:11434/api/tags | python -m json.tool

# Check if Ollama is running
curl http://localhost:11434/

# Model info
ollama show llama3.2
```

---

## Performance Tips

| Tip | Impact |
|-----|--------|
| Use quantized models (Q4) | 2-3x less RAM |
| Keep model loaded (`keep_alive`) | Instant response after first call |
| Use GPU if available | 5-10x faster inference |
| Smaller context = faster | Reduce `num_ctx` for speed |

---

## ?? Knowledge Check

> **Q1:** What port does Ollama run on by default?
>
> **A1:** Port **11434**. The API is at `http://localhost:11434`.

> **Q2:** Can you use the exact same Python code for both OpenAI and Ollama? How?
>
> **A2:** Yes! Use the OpenAI Python client with `base_url="http://localhost:11434/v1"`. The only difference is the base URL and model name.

> **Q3:** You have a 16GB RAM laptop. What''s the largest model you can comfortably run?
>
> **A3:** A 13B parameter model (quantized). The rule of thumb: you need about 1GB RAM per 1B parameters for quantized models.

---

## Key Takeaways

1. Ollama provides both **native** and **OpenAI-compatible** APIs
2. The OpenAI-compatible endpoint means **zero code changes** when switching
3. Use quantized models and GPU for **better performance**
4. Ollama is the easiest way to run LLMs **locally and privately**
', '2026-06-23 07:36:04.986', '2026-06-23 08:16:14.326');


--
-- Data for Name: ExpHistory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ExpHistory" VALUES ('8f278e2c-4b8f-4547-9447-0d33440c9272', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Added a new To-Do task!', '2026-06-23 04:01:19.533');
INSERT INTO public."ExpHistory" VALUES ('47dfa203-3eea-4ec7-b6f3-e8e2a18651c3', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Scheduled a Weekly Task!', '2026-06-23 04:02:37.644');
INSERT INTO public."ExpHistory" VALUES ('60354e5b-ed56-45e2-90cd-745aa46b76f1', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Scheduled a Weekly Task!', '2026-06-23 04:02:44.508');
INSERT INTO public."ExpHistory" VALUES ('d41824d0-6546-420a-8486-f96560928276', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Scheduled a Weekly Task!', '2026-06-23 04:03:19.55');
INSERT INTO public."ExpHistory" VALUES ('269943bc-265d-4908-98f9-98d2ab1b773d', '5c30135b-8211-4007-8e6f-9077799eb473', 15, 'Started a new Habit!', '2026-06-23 04:04:59.106');
INSERT INTO public."ExpHistory" VALUES ('11493920-422c-4b6c-b1dc-2efc61dc2bb2', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Read a chapter of Deep Work', '2026-06-23 04:09:34.313');
INSERT INTO public."ExpHistory" VALUES ('e9246cdc-e56d-44d4-a9da-ae74cb18cc20', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Read a chapter of Atomic Habits', '2026-06-23 04:09:36.206');
INSERT INTO public."ExpHistory" VALUES ('5ea5e5f3-4a18-43b7-aa69-dfb39ab19439', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Read a chapter of Deep Work', '2026-06-23 04:09:36.613');
INSERT INTO public."ExpHistory" VALUES ('fc15c440-8496-4ddf-9574-5907e083d3cf', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Read a chapter of Clean Code', '2026-06-23 04:09:36.935');
INSERT INTO public."ExpHistory" VALUES ('98f164ca-15d7-4df1-bd51-305f9fae38ff', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Read a chapter of The Pragmatic Programmer', '2026-06-23 04:09:37.182');
INSERT INTO public."ExpHistory" VALUES ('5f7b4400-1002-41b3-b446-74c3f5715aab', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:05.233');
INSERT INTO public."ExpHistory" VALUES ('63155c20-8359-4435-939c-d21484b25d4c', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:06.288');
INSERT INTO public."ExpHistory" VALUES ('f4fedd50-3646-4c62-84a8-7dbd818ef8cd', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:07.856');
INSERT INTO public."ExpHistory" VALUES ('a2cefc4c-ad1e-4b2d-a5eb-30bf2b7497be', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:12.576');
INSERT INTO public."ExpHistory" VALUES ('0eb1f0bd-84fe-4cf9-b119-bf36becb1ac1', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:13.144');
INSERT INTO public."ExpHistory" VALUES ('6327b2ad-70f4-477b-9412-8023c5bf8e22', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:14.344');
INSERT INTO public."ExpHistory" VALUES ('46113510-a082-4c61-b993-eea42b044068', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:14.75');
INSERT INTO public."ExpHistory" VALUES ('facef178-f80f-4909-93ea-ce6c0483c2c1', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:15.127');
INSERT INTO public."ExpHistory" VALUES ('99a625a1-d5af-43e3-9550-f303759296d5', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:15.521');
INSERT INTO public."ExpHistory" VALUES ('c21f8f58-b7c2-431c-996a-ef51a2f4350f', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:15.919');
INSERT INTO public."ExpHistory" VALUES ('83fff90f-2047-4273-92b6-2938156ef524', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:17.047');
INSERT INTO public."ExpHistory" VALUES ('1d714d8e-cbce-400d-b8ca-59ecf253bba1', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Completed WEEKLY task!', '2026-06-23 04:24:18.337');
INSERT INTO public."ExpHistory" VALUES ('c28c2832-f919-4212-978e-169475f1e8b5', '5c30135b-8211-4007-8e6f-9077799eb473', 15, 'Completed Habit: GYM ', '2026-06-23 04:24:57.907');
INSERT INTO public."ExpHistory" VALUES ('3c9d950d-27c1-409e-a0aa-993bedd3a466', '5c30135b-8211-4007-8e6f-9077799eb473', 15, 'Tracked a transaction. Good financial discipline!', '2026-06-23 05:44:51.17');
INSERT INTO public."ExpHistory" VALUES ('849d7a19-8f2d-4ce5-beac-c0923a774419', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Scheduled a Weekly Task!', '2026-06-23 05:49:13.811');
INSERT INTO public."ExpHistory" VALUES ('446d84f5-dfac-4926-843a-89fdba458f63', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Added a new To-Do task!', '2026-06-23 05:49:29.445');
INSERT INTO public."ExpHistory" VALUES ('f538d28d-1c8d-4683-8c69-6144d342ec31', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Added a new To-Do task!', '2026-06-23 05:49:34.814');
INSERT INTO public."ExpHistory" VALUES ('019497c1-e974-4747-a296-3bb8bc464b3f', '18392b4b-ca12-4f79-aab6-aafcf613954f', 50, 'Completed a Pomodoro!', '2026-06-23 07:15:38.048');
INSERT INTO public."ExpHistory" VALUES ('15243954-1704-4df2-bf58-55063c819d34', '18392b4b-ca12-4f79-aab6-aafcf613954f', 25, 'Completed a study session!', '2026-06-23 07:31:04.972');
INSERT INTO public."ExpHistory" VALUES ('e8429218-7465-44e4-8ce5-d52a8d281b65', '18392b4b-ca12-4f79-aab6-aafcf613954f', 10, 'Started studying a course!', '2026-06-23 08:03:07.614');
INSERT INTO public."ExpHistory" VALUES ('77071720-c1fa-40e9-b76e-57d90b129aea', '18392b4b-ca12-4f79-aab6-aafcf613954f', 10, 'Started studying a course!', '2026-06-23 08:09:52.812');
INSERT INTO public."ExpHistory" VALUES ('6ead3493-1556-4a81-a31b-a656fe4ea055', '18392b4b-ca12-4f79-aab6-aafcf613954f', 10, 'Started studying a course!', '2026-06-23 08:10:25.585');
INSERT INTO public."ExpHistory" VALUES ('3bbe4cb5-a283-4a98-9c82-497f48b03c0c', '18392b4b-ca12-4f79-aab6-aafcf613954f', 50, 'Completed a learning module!', '2026-06-23 08:10:37.046');
INSERT INTO public."ExpHistory" VALUES ('4be44459-f605-4df7-97d0-11f3d0b10999', '18392b4b-ca12-4f79-aab6-aafcf613954f', 10, 'Started studying a course!', '2026-06-23 08:10:46.532');
INSERT INTO public."ExpHistory" VALUES ('a96d9f2b-47d8-4363-bf3f-7ccc50612f42', '18392b4b-ca12-4f79-aab6-aafcf613954f', 50, 'Completed a learning module!', '2026-06-23 08:11:00.126');
INSERT INTO public."ExpHistory" VALUES ('18db8610-1ca2-4609-93a4-33351ad4cdcc', '5c30135b-8211-4007-8e6f-9077799eb473', 10, 'Started studying a course!', '2026-06-23 08:16:20.121');
INSERT INTO public."ExpHistory" VALUES ('2c2de892-df7a-4ad5-b6db-71a6646b9558', '683f1535-e56c-42a8-ad52-7639174fa713', 10, 'Started studying a course!', '2026-06-23 08:19:02.144');
INSERT INTO public."ExpHistory" VALUES ('dedd010e-6188-4c40-8462-3dcf8ca556d9', '5c30135b-8211-4007-8e6f-9077799eb473', 50, 'Completed a learning module!', '2026-06-23 08:22:05.968');
INSERT INTO public."ExpHistory" VALUES ('139601ad-2f2e-48e9-808d-f1793b7d82d3', '16e81db6-a33d-48a4-9180-e5b3fc969897', 10, 'Scheduled a Weekly Task!', '2026-06-23 08:50:33.355');
INSERT INTO public."ExpHistory" VALUES ('e69a07eb-e2da-4269-9300-dc974ff9df85', '16e81db6-a33d-48a4-9180-e5b3fc969897', 10, 'Added a new To-Do task!', '2026-06-23 08:50:38.822');
INSERT INTO public."ExpHistory" VALUES ('ddd00141-19f8-494e-ae1f-627dea5d05c5', '16e81db6-a33d-48a4-9180-e5b3fc969897', 15, 'Started a new Habit!', '2026-06-23 08:50:44.531');
INSERT INTO public."ExpHistory" VALUES ('21de11c4-a926-4785-9794-0444c5f3016e', '16e81db6-a33d-48a4-9180-e5b3fc969897', 15, 'Tracked a transaction. Good financial discipline!', '2026-06-23 08:50:55.408');
INSERT INTO public."ExpHistory" VALUES ('88c94c2c-6393-424d-9a0a-e6f4c4feb3d4', '16e81db6-a33d-48a4-9180-e5b3fc969897', 15, 'Tracked a transaction. Good financial discipline!', '2026-06-23 08:51:06.096');
INSERT INTO public."ExpHistory" VALUES ('94986a04-92c5-416b-a9ef-334a44ce8cc8', '16e81db6-a33d-48a4-9180-e5b3fc969897', 10, 'Completed WEEKLY task!', '2026-06-23 08:51:14.697');
INSERT INTO public."ExpHistory" VALUES ('aaddbe44-10cf-4b33-9a01-f9904422d669', '16e81db6-a33d-48a4-9180-e5b3fc969897', 10, 'Completed TODO task!', '2026-06-23 08:51:16.029');


--
-- Data for Name: FinanceCategory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."FinanceCategory" VALUES ('59c7a0c4-525c-4382-bc38-4afcd451c0ce', '18392b4b-ca12-4f79-aab6-aafcf613954f', 'EXPENSE', 'HHS', 'Car', 'text-blue-400', 'bg-blue-500/20', 'border-blue-500/30', '2026-06-23 07:21:59.018');


--
-- Data for Name: FinanceTransaction; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."FinanceTransaction" VALUES ('04039155-a343-430f-92be-f7b25e2c6e06', '44b179cd-37d2-4e0a-a0cd-c6bc9661d337', 'INCOME', 40000, 'Gaji', 'Income', '2026-06-23 05:41:10.747', '2026-06-23 05:41:10.749', '2026-06-23 05:41:10.749');
INSERT INTO public."FinanceTransaction" VALUES ('dde6814a-90fd-43fc-aae4-42823000c50e', '5c30135b-8211-4007-8e6f-9077799eb473', 'INCOME', 1000000, 'Gaji', 'Income', '2026-06-23 05:44:51.146', '2026-06-23 05:44:51.147', '2026-06-23 05:44:51.147');
INSERT INTO public."FinanceTransaction" VALUES ('3dda7e9f-544f-4610-8aa1-49124c4ab32f', '16e81db6-a33d-48a4-9180-e5b3fc969897', 'INCOME', 1000000, 'Salary', 'Salary', '2026-06-23 08:50:55.392', '2026-06-23 08:50:55.394', '2026-06-23 08:50:55.394');
INSERT INTO public."FinanceTransaction" VALUES ('0b7a7502-445d-4b14-810a-a9011b14b80f', '16e81db6-a33d-48a4-9180-e5b3fc969897', 'EXPENSE', 55000, 'Seblak', 'Food', '2026-06-23 08:51:06.08', '2026-06-23 08:51:06.081', '2026-06-23 08:51:06.081');


--
-- Data for Name: ProductivityItem; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ProductivityItem" VALUES ('61db8892-9451-4488-819d-5a66637e063f', '5c30135b-8211-4007-8e6f-9077799eb473', 'HABIT', 'GYM ', false, NULL, '2026-06-23 04:04:59.094', '2026-06-23 04:25:05.739', '2026-06-23 04:24:57.9', 0);
INSERT INTO public."ProductivityItem" VALUES ('05b10c7b-df38-4f94-874d-f83ca359979d', '5c30135b-8211-4007-8e6f-9077799eb473', 'WEEKLY', 'Bisa Renang Gaya Punggung dan Dada', false, 'Monday', '2026-06-23 05:49:13.785', '2026-06-23 05:49:13.785', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('4e05eb07-1dc6-47fc-ba71-542b760c8f57', '5c30135b-8211-4007-8e6f-9077799eb473', 'WEEKLY', 'Jalan-Jalan', false, 'Tuesday', '2026-06-23 04:03:19.535', '2026-06-23 05:49:16.995', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('4d12befd-afcd-42b4-9796-35e2080be7b0', '5c30135b-8211-4007-8e6f-9077799eb473', 'WEEKLY', 'Running 5 KM ', false, 'Monday', '2026-06-23 04:02:44.496', '2026-06-23 05:49:17.26', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('84575f2a-b55a-4445-90e5-a97361f840ef', '5c30135b-8211-4007-8e6f-9077799eb473', 'WEEKLY', 'Olahraga', false, 'Monday', '2026-06-23 04:02:37.632', '2026-06-23 05:49:17.628', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('c9b33642-b6d6-41ee-b39b-ae617f07a6e1', '5c30135b-8211-4007-8e6f-9077799eb473', 'TODO', 'Learning Python', false, NULL, '2026-06-23 04:01:19.507', '2026-06-23 05:49:19.662', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('f22a5bed-99a8-4035-83d7-42d59897a52f', '5c30135b-8211-4007-8e6f-9077799eb473', 'TODO', 'Belajar Akuntansi', false, NULL, '2026-06-23 05:49:29.424', '2026-06-23 05:49:29.424', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('556f70c6-dfdd-4779-9cf8-411bc2088501', '5c30135b-8211-4007-8e6f-9077799eb473', 'TODO', 'Belajar Excel', false, NULL, '2026-06-23 05:49:34.803', '2026-06-23 05:49:34.803', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('1f2864c2-0727-4b43-bf61-cae493c0a0cb', '16e81db6-a33d-48a4-9180-e5b3fc969897', 'HABIT', 'Meditation 10m', false, NULL, '2026-06-23 08:50:44.52', '2026-06-23 08:50:44.52', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('90736ab1-e82d-47ab-8449-f671f5324614', '16e81db6-a33d-48a4-9180-e5b3fc969897', 'WEEKLY', 'Client meeting prep', true, 'Monday', '2026-06-23 08:50:33.339', '2026-06-23 08:51:14.701', NULL, 0);
INSERT INTO public."ProductivityItem" VALUES ('11bc4c6b-9b83-4eb4-8450-76abfd64a3ac', '16e81db6-a33d-48a4-9180-e5b3fc969897', 'TODO', 'Team sync at 3 PM', true, NULL, '2026-06-23 08:50:38.808', '2026-06-23 08:51:16.031', NULL, 0);


--
-- Data for Name: ReadingBook; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" VALUES ('557a9cfb-d8b4-404e-b543-49b704ce5fbc', 'test_1782101562310@example.com', '$2b$10$fI02LwyKSjCOi3w0Lmbieeu1d5XKSuZYah2WRNMSRV1PcdqqBxKv6', 'Test User', '2026-06-22 04:12:42.445', '2026-06-22 04:12:42.445', 0, 50, 1, 1000, 'Novice Scholar');
INSERT INTO public."User" VALUES ('daff4428-81a4-4d10-9ece-f5ad50ff3f87', 'rusdifn08@gmail.com', '$2b$10$7GsZlzBijmowMkLZ3g7yWuLNd3z2aQiETlB46kP8hZcFhORAN/c3W', 'russdi', '2026-06-22 04:20:36.37', '2026-06-22 04:20:36.37', 0, 50, 1, 1000, 'Novice Scholar');
INSERT INTO public."User" VALUES ('18392b4b-ca12-4f79-aab6-aafcf613954f', 'haho@gmail.com', '$2b$10$FwNfl88to4/5mAyHRUWaQ.UwiJNnqIQQMaiPFotXAQDYxpG0IKzHy', 'Rusdi Fadli Nuryuda ', '2026-06-23 03:27:26.675', '2026-06-23 08:11:00.124', 215, 50, 1, 1000, 'Novice Scholar');
INSERT INTO public."User" VALUES ('683f1535-e56c-42a8-ad52-7639174fa713', 'admin@example.comtestuser@example.com', '$2b$10$1FONbmKy.0BXdxQ4o14mFO9GKl63DYCZkLCFMzzKhSQw1T0yMResa', 'Test User', '2026-06-23 08:18:39.867', '2026-06-23 08:19:02.138', 10, 50, 1, 1000, 'Novice Scholar');
INSERT INTO public."User" VALUES ('5c30135b-8211-4007-8e6f-9077799eb473', 'hoha@gmail.com', '$2b$10$UrXhqlY5fhc/XEzrJkACduCdDRmq5R0pRqG6YHaW8Ij7hxHB3l9dS', 'Risa Hanipah Elektra', '2026-06-23 03:28:06.782', '2026-06-23 08:22:05.964', 345, 50, 1, 1000, 'Novice Scholar');
INSERT INTO public."User" VALUES ('16e81db6-a33d-48a4-9180-e5b3fc969897', 'risaha15@gmail.com', '$2b$10$Z.0OFHOd7Br6OaPiJG5QUe7OKZVEE2Mo.a40a86Vvye8go/wmftCW', 'Risa Hanipah', '2026-06-23 08:49:13.175', '2026-06-23 08:51:16.027', 85, 50, 1, 1000, 'Novice Scholar');
INSERT INTO public."User" VALUES ('44b179cd-37d2-4e0a-a0cd-c6bc9661d337', 'test_finance@supernova.com', '$2b$10$Ui0sJOyxrhHwJzWI2NwhrO1lv7hBk.u3Tdg9esnzN8oVtAaEvzoSK', 'Test Finance', '2026-06-23 05:41:02.182', '2026-06-23 05:41:02.182', 0, 50, 1, 1000, 'Novice Scholar');


--
-- Data for Name: UserCourse; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."UserCourse" VALUES ('22076826-eb9a-402c-b3dd-c9c48cb962b6', '557a9cfb-d8b4-404e-b543-49b704ce5fbc', 'a8338d78-8e1e-4b5d-a2dc-ad5b41eac016', 0, 'LEARNING', '2026-06-23 07:35:42.191', '2026-06-23 07:35:42.191');


--
-- Data for Name: UserModuleProgress; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."UserModuleProgress" VALUES ('a7a3d078-ade9-4b2a-9651-858e16c3d59a', '18392b4b-ca12-4f79-aab6-aafcf613954f', '82a01573-368e-4832-a579-aaf6c935dbea', true, '2026-06-23 08:11:00.105', '2026-06-23 08:11:00.107', '2026-06-23 08:11:00.107');
INSERT INTO public."UserModuleProgress" VALUES ('0b74bf6c-66fa-47e8-8856-8ee7d4cbd412', '5c30135b-8211-4007-8e6f-9077799eb473', 'b161b3c2-5a86-4575-a110-7cf53f2cf57a', true, '2026-06-23 08:22:05.938', '2026-06-23 08:22:05.939', '2026-06-23 08:22:05.939');


--
-- Data for Name: WorkspaceNote; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: CourseModule CourseModule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CourseModule"
    ADD CONSTRAINT "CourseModule_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: ExpHistory ExpHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExpHistory"
    ADD CONSTRAINT "ExpHistory_pkey" PRIMARY KEY (id);


--
-- Name: FinanceCategory FinanceCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FinanceCategory"
    ADD CONSTRAINT "FinanceCategory_pkey" PRIMARY KEY (id);


--
-- Name: FinanceTransaction FinanceTransaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FinanceTransaction"
    ADD CONSTRAINT "FinanceTransaction_pkey" PRIMARY KEY (id);


--
-- Name: ProductivityItem ProductivityItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductivityItem"
    ADD CONSTRAINT "ProductivityItem_pkey" PRIMARY KEY (id);


--
-- Name: ReadingBook ReadingBook_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReadingBook"
    ADD CONSTRAINT "ReadingBook_pkey" PRIMARY KEY (id);


--
-- Name: UserCourse UserCourse_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserCourse"
    ADD CONSTRAINT "UserCourse_pkey" PRIMARY KEY (id);


--
-- Name: UserModuleProgress UserModuleProgress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserModuleProgress"
    ADD CONSTRAINT "UserModuleProgress_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WorkspaceNote WorkspaceNote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WorkspaceNote"
    ADD CONSTRAINT "WorkspaceNote_pkey" PRIMARY KEY (id);


--
-- Name: UserCourse_userId_courseId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UserCourse_userId_courseId_key" ON public."UserCourse" USING btree ("userId", "courseId");


--
-- Name: UserModuleProgress_userId_moduleId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UserModuleProgress_userId_moduleId_key" ON public."UserModuleProgress" USING btree ("userId", "moduleId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: CourseModule CourseModule_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CourseModule"
    ADD CONSTRAINT "CourseModule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ExpHistory ExpHistory_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExpHistory"
    ADD CONSTRAINT "ExpHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FinanceCategory FinanceCategory_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FinanceCategory"
    ADD CONSTRAINT "FinanceCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FinanceTransaction FinanceTransaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FinanceTransaction"
    ADD CONSTRAINT "FinanceTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductivityItem ProductivityItem_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductivityItem"
    ADD CONSTRAINT "ProductivityItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReadingBook ReadingBook_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReadingBook"
    ADD CONSTRAINT "ReadingBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserCourse UserCourse_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserCourse"
    ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserCourse UserCourse_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserCourse"
    ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserModuleProgress UserModuleProgress_moduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserModuleProgress"
    ADD CONSTRAINT "UserModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES public."CourseModule"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserModuleProgress UserModuleProgress_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserModuleProgress"
    ADD CONSTRAINT "UserModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WorkspaceNote WorkspaceNote_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WorkspaceNote"
    ADD CONSTRAINT "WorkspaceNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


