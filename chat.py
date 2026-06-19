"""
Morocco Admin Procedures CLI Chatbot
Uses Groq API (llama-3.3-70b) + TF-IDF RAG over procedures.json
"""
import os
from groq import Groq
from rag import ProcedureRAG

API_KEY = os.environ.get("GROQ_API_KEY", "")
MODEL = "llama-3.3-70b-versatile"

SYSTEM = """Tu es un assistant administratif marocain expert, professionnel et bienveillant.
Réponds en français, arabe ou anglais selon la langue de l'utilisateur.
Base-toi UNIQUEMENT sur le contexte fourni.
Structure chaque réponse ainsi :
- Un titre clair avec le nom de la procédure
- Les étapes numérotées et détaillées
- Une section Documents requis avec liste
- Une section Frais & Délai
- Une section Liens officiels avec les URLs
Sois précis, complet et professionnel."""

def chat(rag, client, history, user_msg):
    docs = rag.retrieve(user_msg, top_k=4)
    context = "\n---\n".join(f"[{d['name_fr']}]\n{d['chunk']}" for d in docs)
    messages = [
        {"role": "system", "content": SYSTEM},
        {"role": "user", "content": f"Contexte:\n{context}"},
        {"role": "assistant", "content": "Compris, je vais structurer ma réponse de façon professionnelle."},
        *history[-6:],
        {"role": "user", "content": user_msg},
    ]
    resp = client.chat.completions.create(model=MODEL, messages=messages, temperature=0.3, max_tokens=1024)
    return resp.choices[0].message.content

def main():
    if not API_KEY:
        print("❌ Set GROQ_API_KEY. Free key at: console.groq.com")
        return
    print("⏳ Loading procedures...")
    rag = ProcedureRAG("procedures.json")
    client = Groq(api_key=API_KEY)
    history = []
    print(f"✅ {len(rag.procedures)} procedures loaded.")
    print("🇲🇦 Morocco Admin Chatbot (FR/AR/EN) — type 'quit' to exit.\n")
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
