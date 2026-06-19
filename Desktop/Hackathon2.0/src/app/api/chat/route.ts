import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import Groq from "groq-sdk";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Procedure {
  id: string;
  name_fr: string;
  name_ar: string;
  name_en: string;
  category: string;
  portal_url: string;
  procedure_url: string;
  chunk: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── TF-IDF RAG ──────────────────────────────────────────────────────────────

let procedures: Procedure[] | null = null;
let tfidfIndex: Map<string, Map<number, number>> | null = null;
let idfScores: Map<string, number> | null = null;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\sàâäéèêëîïôùûüç]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function buildIndex(docs: Procedure[]) {
  const tf = new Map<string, Map<number, number>>();
  const df = new Map<string, number>();
  const N = docs.length;

  docs.forEach((doc, i) => {
    const tokens = tokenize(doc.chunk + " " + doc.name_fr + " " + doc.category);
    const freq = new Map<string, number>();
    tokens.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1));
    freq.forEach((count, term) => {
      if (!tf.has(term)) tf.set(term, new Map());
      tf.get(term)!.set(i, count / tokens.length);
      df.set(term, (df.get(term) ?? 0) + 1);
    });
  });

  const idf = new Map<string, number>();
  df.forEach((count, term) => idf.set(term, Math.log(N / count)));

  tfidfIndex = tf;
  idfScores = idf;
}

function retrieve(query: string, topK = 4): Procedure[] {
  if (!procedures || !tfidfIndex || !idfScores) return [];
  const qTokens = tokenize(query);
  const scores = new Array(procedures.length).fill(0);

  qTokens.forEach((term) => {
    const idf = idfScores!.get(term) ?? 0;
    tfidfIndex!.get(term)?.forEach((tf, docIdx) => {
      scores[docIdx] += tf * idf;
    });
  });

  return scores
    .map((score, i) => ({ score, i }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((x) => x.score > 0)
    .map((x) => procedures![x.i]);
}

function loadData() {
  if (procedures) return;
  const filePath = join(process.cwd(), "public", "procedures.json");
  procedures = JSON.parse(readFileSync(filePath, "utf-8")) as Procedure[];
  buildIndex(procedures);
}

// ─── Groq system prompt ───────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es un assistant administratif marocain expert intégré dans E-Beztami, le portefeuille digital national Maroc 2030.
Tu aides les citoyens à comprendre les démarches administratives marocaines.
Réponds en français (ou en arabe si l'utilisateur écrit en arabe, ou en anglais si en anglais).
Base-toi UNIQUEMENT sur les informations fournies dans le contexte.
Cite toujours le portail web officiel et le lien direct quand disponibles.
Si l'information n'est pas dans le contexte, dis-le clairement.
Sois concis, pratique et bienveillant.`;

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = (await req.json()) as {
      message: string;
      history: Message[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 500 }
      );
    }

    loadData();

    const docs = retrieve(message);
    const context = docs.length
      ? docs.map((d) => `[${d.name_fr}]\n${d.chunk}`).join("\n---\n")
      : "Aucune procédure trouvée pour cette requête.";

    const client = new Groq({ apiKey });
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Contexte:\n${context}` },
        { role: "assistant", content: "Compris, je vais me baser sur ce contexte." },
        ...history.slice(-6),
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content ?? "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("/api/chat error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
