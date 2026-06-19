"""
Morocco Admin Procedures Chatbot
Uses Groq API (llama3-70b) + TF-IDF RAG over procedures.json
"""
import os
from groq import Groq
from rag import ProcedureRAG

API_KEY = os.environ.get("GROQ_API_KEY", "")
MODEL = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """Tu es un assistant administratif marocain expert.
Tu aides les citoyens marocains à comprendre les démarches administratives.
Réponds en français (ou en arabe si l'utilisateur écrit en arabe, ou en anglais si en anglais).
Base-toi UNIQUEMENT sur les informations fournies dans le contexte.
Cite toujours le portail web officiel et le lien direct quand disponibles.
Si l'information n'est pas dans le contexte, dis-le clairement.
Sois concis, pratique et bienveillant."""

def build_context(docs: list) -> str:
    return "\n---\n".join(f"[{d['name_fr']}]\n{d['chunk']}" for d in docs) if docs else "Aucune procédure trouvée."

def chat(rag: ProcedureRAG, client: Groq, history: list, user_msg: str) -> str:
    docs = rag.retrieve(user_msg, top_k=4)
    context = build_context(docs)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Contexte:\n{context}"},
        {"role": "assistant", "content": "Compris."},
        *history[-6:],
        {"role": "user", "content": user_msg},
    ]
    resp = client.chat.completions.create(model=MODEL, messages=messages, temperature=0.3, max_tokens=1024)
    return resp.choices[0].message.content

def main():
    if not API_KEY:
        print("❌ Set GROQ_API_KEY in your environment. Free key at: console.groq.com")
        return
    print("⏳ Loading procedures...")
    rag = ProcedureRAG("procedures.json")
    client = Groq(api_key=API_KEY)
    history = []
    print(f"✅ {len(rag.procedures)} procedures loaded.")
    print("🇲🇦 Morocco Admin Chatbot — type 'quit' to exit.\n")
    while True:
        user = input("You: ").strip()
        if not user:
            continue
        if user.lower() in ("quit", "exit", "quitter"):
            print("Au revoir! بسلامة")
            break
        answer = chat(rag, client, history, user)
        history.append({"role": "user", "content": user})
        history.append({"role": "assistant", "content": answer})
        print(f"\nBot: {answer}\n")

if __name__ == "__main__":
    main()
