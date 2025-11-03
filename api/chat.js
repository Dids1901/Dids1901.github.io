// api/chat.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// texto fixo do bot
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

// calcula idade do Diogo com base na data atual do servidor
function getDiogoAge() {
  const birth = new Date(2004, 0, 19); // 19/01/2004 (mês 0 = janeiro)
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const hasntHadBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());

  if (hasntHadBirthday) {
    age--;
  }

  return { age, todayISO: today.toISOString().split("T")[0] };
}

// rate limit simples por IP
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

  // tira qualquer system que veio do front pra não confundir
  const userMessages = messages.filter((m) => m.role !== "system");

  const { age, todayISO } = getDiogoAge();
  const dynamicAgeSystem = `
Hoje é ${todayISO}.
O Diogo nasceu em 19/01/2004.
Portanto, AGORA ele tem ${age} anos.
Se o usuário perguntar "quantos anos ele tem", "idade do Diogo" ou algo assim, responda exatamente: "Ele tem ${age} anos." e pode opcionalmente dizer a data de nascimento.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: DIOGO_PROFILE },
        { role: "system", content: dynamicAgeSystem },
        ...userMessages,
      ],
      max_completion_tokens: 200,
      temperature: 0.4,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Não veio resposta 🤖";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("chat error:", err);

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
