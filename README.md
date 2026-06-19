# 🇲🇦 Morocco Admin Procedures RAG Chatbot

A RAG (Retrieval-Augmented Generation) chatbot that answers Moroccan citizens' questions about administrative procedures — in **French, Arabic, or English** — using **Groq LLaMA 3.3** and a TF-IDF index over 251 official procedures.

## Architecture

```
Excel (251 procedures)
        │
  parse_excel.py  ──►  procedures.json
        │
      rag.py       ──►  TF-IDF index (scikit-learn)
        │
  ┌─────┴──────┐
  │            │
chat.py      app.py
(CLI)        (Web UI — branch: chat-ui)
```

For every user question:
1. **Retrieve** — TF-IDF cosine similarity finds the top-4 matching procedures
2. **Augment** — procedure details (steps, documents, fees, URLs) are injected as context
3. **Generate** — Groq LLaMA 3.3 produces a structured, professional answer with official links

---

## Prerequisites

- Python 3.10+
- A free Groq API key → [console.groq.com](https://console.groq.com)
- The Excel file: `morocco_admin_procedures_v2.xlsx`

---

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/morocco-rag.git
cd morocco-rag

python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

---

## Step 1 — Parse the Excel

Place the Excel file in the project root (or pass its path as argument):

```bash
python parse_excel.py path/to/morocco_admin_procedures_v2.xlsx
# ✅ Parsed 251 procedures → procedures.json
```

---

## Step 2 — Set your API key

```bash
export GROQ_API_KEY="gsk_..."          # Linux / macOS
set GROQ_API_KEY=gsk_...               # Windows CMD
$env:GROQ_API_KEY="gsk_..."            # Windows PowerShell
```

---

## Step 3 — Run

### CLI chatbot

```bash
python chat.py
```

```
✅ 251 procedures loaded.
🇲🇦 Morocco Admin Chatbot (FR/AR/EN) — type 'quit' to exit.

You: Comment obtenir un passeport marocain ?
Bot: ## Passeport Marocain Adulte
...
```

### Web UI (branch: chat-ui)

```bash
git checkout chat-ui
python app.py
# Open http://localhost:5000
```

---

## Project structure

| File | Description |
|---|---|
| `parse_excel.py` | Converts Excel → `procedures.json` |
| `rag.py` | TF-IDF retrieval engine |
| `chat.py` | CLI chatbot (Groq + RAG) |
| `app.py` | Flask web UI *(chat-ui branch)* |
| `procedures.json` | Parsed procedures data |
| `requirements.txt` | Python dependencies |

---

## Example questions

| Language | Question |
|---|---|
| French | `Comment obtenir un passeport marocain ?` |
| Arabic | `كيف أحصل على بطاقة التعريف الوطنية؟` |
| English | `What documents do I need to register a company?` |
| French | `Quels sont les frais pour un acte de naissance ?` |
| French | `Comment immatriculer un véhicule ?` |

---

## Requirements

```
groq==0.9.0
openpyxl==3.1.5
scikit-learn>=1.5.0
numpy>=1.26.0
flask>=3.0.0          # only for web UI
markdown>=3.6         # only for web UI
```

---

## How it works (RAG explained)

```
User question
     │
     ▼
TF-IDF vectorizer  ──►  cosine similarity  ──►  top-4 procedures
                                                      │
                                              injected as context
                                                      │
                                                 Groq LLaMA 3.3
                                                      │
                                           structured answer + links
```

No GPU required. No embeddings API. Runs entirely locally except for the Groq LLM call.
