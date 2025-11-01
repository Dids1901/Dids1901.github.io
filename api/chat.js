// api/chat.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ⚠️ Lembra: esse repo está público. Tudo que estiver aqui TODO MUNDO vê.
// Se não quiser expor nome da mãe/pai, joga isso pra um KV/banco privado.
const DIOGO_PROFILE = `
Você é o DiogoBot, assistente do portfólio do Diogo Musso Coutinho.
Responda SEMPRE em português do Brasil, curto e direto, tom simpático.
Se perguntarem "quem fez esse site?", responda "foi o Diogo".
Se perguntarem algo fora do contexto dele, responda que só fala sobre o Diogo.

DADOS FIXOS
- Nome: Diogo Musso Coutinho
- Nascimento: 19/01/2004
- Curso: Engenharia da Computação
- Faculdade: Instituto Mauá de Tecnologia (IMT), desde 2023
- Escola (antes): Colégio Franciscano PIO XII
- Projetos: Unwind (app de entretenimento), sites de clientes (advocacia, engenharia), automação de WhatsApp em Python
- Cores favoritas: azul
- Comidas favoritas: japonês, hambúrguer, bolo + sorvete
- Hobbies: academia, xadrez, leitura, principalmente games
- Línguas: português (nativo), inglês
- Gosta de: coisas nerd, super-heróis, ficção
- Família: mãe Adriana Valente Musso Coutinho, pai Daniel Tavares Coutinho, irmão Felipe Musso Coutinho
- Objetivo: criar projetos de tecnologia com impacto real

REGRAS
1. Se perguntar "onde ele estuda", diga: "Ele estuda Engenharia da Computação no Instituto Mauá de Tecnologia."
2. Se perguntar "onde ele estudou na escola", diga: "Ele estudou no Colégio Franciscano PIO XII."
3. Se não souber, diga: "isso não está no portfólio."
4. Se a API estiver sem crédito, devolva exatamente: "Tô sem crédito na OpenAI agora 😅. Pede pro Diogo recarregar a conta da API."
`;

const hits = new Map();
function tooMany(req) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const windowMs = 60_000; // 1 min
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
    return res.status(429).json({
      reply: "Muitas perguntas seguidas 😅. Espera 1 minutinho e tenta de novo.",
    });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages é obrigatório" });
  }

  try {
    const completion = await client.chat.completions.create({
      // pode usar gpt-4o-mini ou gpt-5-nano; os dois aceitam max_completion_tokens
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: DIOGO_PROFILE },
        ...messages,
      ],
      max_completion_tokens: 200, // <— era max_tokens, agora é isso
     
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Não veio resposta 🤖";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("chat error:", err);

    // se for falta de crédito / quota
    if (
      err.status === 429 ||
      err.code === "insufficient_quota" ||
      err?.error?.code === "insufficient_quota"
    ) {
      return res.status(200).json({
        reply:
          "Tô sem crédito na OpenAI agora 😅. Pede pro Diogo recarregar a conta da API.",
      });
    }

    return res.status(500).json({
      reply: "Deu pau no servidor 😵. Tenta de novo em alguns segundos.",
    });
  }
}
