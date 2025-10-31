import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DIOGO_PROFILE = `
Você é o assistente do portfólio do Diogo Musso Coutinho.
Responda sempre em português brasileiro, curto e direto.
Dados do Diogo:
- Nome: Diogo Musso Coutinho
- Curso: Engenharia da Computação
- Faculdade: Instituto Mauá de Tecnologia (IMT)
- Início: 2023
- Projetos: Unwind (app de entretenimento), sites de clientes (advocacia, engenharia), automação WhatsApp em Python.
Se perguntarem "qual escola/faculdade o Diogo estudou?", responda: "Ele estuda Engenharia da Computação no Instituto Mauá de Tecnologia."
Se não tiver a informação, diga: "isso não está no portfólio."
`;

const hits = new Map();
function tooMany(req) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReq = 10;
  const arr = hits.get(ip) || [];
  const recent = arr.filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > maxReq;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  if (tooMany(req)) {
    return res.status(429).json({ error: "Muitas requisições, tente em 1 minuto." });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages é obrigatório" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: DIOGO_PROFILE },
        ...messages,
      ],
      max_tokens: 250,
      temperature: 0.4,
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("chat error:", err);
    return res.status(500).json({ error: "Falha ao falar com a IA." });
  }
}
