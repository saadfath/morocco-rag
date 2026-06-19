import os
import markdown as md
from flask import Flask, request, jsonify, render_template_string
from groq import Groq
from rag import ProcedureRAG

app = Flask(__name__)
rag = ProcedureRAG("procedures.json")
client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))
history = []

SYSTEM = """Tu es un assistant administratif marocain expert, professionnel et bienveillant.
Réponds en français, arabe ou anglais selon la langue de l'utilisateur.
Base-toi UNIQUEMENT sur le contexte fourni.
Structure chaque réponse ainsi :
- Un titre clair avec le nom de la procédure
- Les étapes numérotées et détaillées
- Une section "Documents requis" avec liste
- Une section "Frais & Délai"
- Une section "Liens officiels" avec les URLs cliquables
Sois précis, complet et professionnel. Utilise du markdown propre (titres ##, listes -, liens [texte](url))."""

HTML = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>🇲🇦 Assistant Administratif Marocain</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #f0f2f5; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  #app { width: 100%; max-width: 760px; height: 92vh; display: flex; flex-direction: column; background: #fff; border-radius: 14px; box-shadow: 0 4px 32px rgba(0,0,0,.12); overflow: hidden; }
  header { background: linear-gradient(135deg,#c1272d,#8b0000); color: #fff; padding: 18px 22px; display: flex; align-items: center; gap: 12px; }
  header h1 { font-size: 1.1rem; font-weight: 600; }
  header small { opacity: .75; font-size: .8rem; }
  #messages { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 12px; }
  .bubble { max-width: 85%; padding: 12px 16px; border-radius: 14px; font-size: .92rem; line-height: 1.6; }
  .user { align-self: flex-end; background: #c1272d; color: #fff; border-bottom-right-radius: 3px; }
  .bot { align-self: flex-start; background: #f7f7f7; color: #1a1a1a; border-bottom-left-radius: 3px; border: 1px solid #eee; }
  /* markdown rendered inside bot bubble */
  .bot h2 { font-size: 1rem; font-weight: 700; color: #c1272d; margin: 10px 0 4px; border-bottom: 1px solid #f0d0d0; padding-bottom: 3px; }
  .bot h3 { font-size: .95rem; font-weight: 600; margin: 8px 0 3px; }
  .bot ol, .bot ul { padding-left: 18px; margin: 4px 0 8px; }
  .bot li { margin-bottom: 3px; }
  .bot a { color: #c1272d; text-decoration: underline; word-break: break-all; }
  .bot strong { font-weight: 600; }
  .bot p { margin-bottom: 6px; }
  .typing { align-self: flex-start; background: #f7f7f7; border: 1px solid #eee; padding: 12px 16px; border-radius: 14px; border-bottom-left-radius: 3px; color: #aaa; font-size: .85rem; }
  #form { display: flex; padding: 12px 14px; border-top: 1px solid #eee; gap: 8px; background: #fff; }
  #input { flex: 1; padding: 11px 16px; border: 1.5px solid #ddd; border-radius: 26px; font-size: .95rem; outline: none; transition: border .2s; }
  #input:focus { border-color: #c1272d; }
  button { background: #c1272d; color: #fff; border: none; border-radius: 26px; padding: 11px 22px; cursor: pointer; font-size: .95rem; font-weight: 500; transition: background .2s; }
  button:hover { background: #a01f25; }
  button:disabled { background: #ccc; cursor: not-allowed; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; }
  .chip { background: #fff5f5; color: #c1272d; border: 1px solid #f5c0c0; border-radius: 18px; padding: 5px 13px; font-size: .78rem; cursor: pointer; transition: background .15s; }
  .chip:hover { background: #fde0e0; }
</style>
</head>
<body>
<div id="app">
  <header>
    <span style="font-size:1.6rem">🇲🇦</span>
    <div><h1>Assistant Administratif Marocain</h1><small>251 procédures officielles • FR / AR / EN</small></div>
  </header>
  <div id="messages">
    <div class="bubble bot">Bonjour ! Je suis votre assistant administratif marocain.<br>Posez-moi vos questions sur les démarches, documents, frais et délais.<br><br>يمكنني الإجابة بالفرنسية أو العربية أو الإنجليزية 🇲🇦</div>
  </div>
  <div class="chips">
    <span class="chip" onclick="ask(this.innerText)">Passeport marocain</span>
    <span class="chip" onclick="ask(this.innerText)">Carte d'identité</span>
    <span class="chip" onclick="ask(this.innerText)">Créer une entreprise</span>
    <span class="chip" onclick="ask(this.innerText)">بطاقة التعريف الوطنية</span>
    <span class="chip" onclick="ask(this.innerText)">Register a vehicle</span>
    <span class="chip" onclick="ask(this.innerText)">Acte de naissance</span>
  </div>
  <form id="form" onsubmit="send(event)">
    <input id="input" placeholder="Posez votre question..." autocomplete="off" />
    <button id="btn" type="submit">Envoyer</button>
  </form>
</div>
<script>
const msgs = document.getElementById('messages');
const input = document.getElementById('input');
const btn = document.getElementById('btn');

function addMsg(html, role) {
  const d = document.createElement('div');
  d.className = 'bubble ' + role;
  if (role === 'bot') d.innerHTML = html;
  else d.textContent = html;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
  return d;
}

async function ask(text) { input.value = text; await send(); }

async function send(e) {
  if (e) e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  btn.disabled = true;
  const typing = document.createElement('div');
  typing.className = 'typing'; typing.textContent = '⏳ Recherche en cours...';
  msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight;
  try {
    const res = await fetch('/chat', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({message: text}) });
    const data = await res.json();
    typing.remove();
    addMsg(data.reply, 'bot');
  } catch {
    typing.remove();
    addMsg('Erreur de connexion. Réessayez.', 'bot');
  }
  btn.disabled = false;
  input.focus();
}
</script>
</body>
</html>"""

@app.route("/")
def index():
    return render_template_string(HTML)

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "").strip()
    if not user_msg:
        return jsonify({"reply": "Message vide."})

    docs = rag.retrieve(user_msg, top_k=4)
    context = "\n---\n".join(f"[{d['name_fr']}]\n{d['chunk']}" for d in docs)

    messages = [
        {"role": "system", "content": SYSTEM},
        {"role": "user", "content": f"Contexte:\n{context}"},
        {"role": "assistant", "content": "Compris, je vais structurer ma réponse de façon professionnelle."},
        *history[-6:],
        {"role": "user", "content": user_msg},
    ]

    resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.3,
        max_tokens=1024,
    )
    raw = resp.choices[0].message.content
    html_reply = md.markdown(raw, extensions=["nl2br"])

    history.append({"role": "user", "content": user_msg})
    history.append({"role": "assistant", "content": raw})
    return jsonify({"reply": html_reply})

if __name__ == "__main__":
    app.run(debug=False, port=5000)
