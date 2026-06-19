# 🇲🇦 Morocco Admin Procedures RAG Chatbot

Answers Moroccan citizens' administrative questions using **Groq LLaMA 3** + **TF-IDF retrieval** over 251 official procedures.

## Architecture

```
Excel (251 procedures)
       │
  parse_excel.py  →  procedures.json
       │
     rag.py       →  TF-IDF index (sklearn)
       │
     chat.py      →  Groq API (llama3-70b) + CLI chat
```

## Setup

```bash
cd morocco-rag
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Step 1 — Parse the Excel

```bash
python parse_excel.py ../Downloads/morocco_admin_procedures_v2.xlsx
# → produces procedures.json
```

## Step 2 — Run the chatbot

```bash
export GROQ_API_KEY="your_key_here"   # get free key at console.groq.com
python chat.py
```

## Example questions

- "Comment obtenir une carte nationale d'identité ?"
- "Quels documents pour créer une entreprise ?"
- "كيف أحصل على جواز السفر ؟"
- "What is the process to register a vehicle?"
- "C'est quoi les frais pour un passeport ?"

## Notes

- Retrieval is TF-IDF (bilingual FR/EN/AR chunks) — no GPU needed.
- Top-4 matching procedures are injected as context into every Groq call.
- The bot always includes the official portal URL and direct procedure link in its answers.
