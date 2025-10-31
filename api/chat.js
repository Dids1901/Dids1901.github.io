// api/chat.js
import OpenAI from "openai";

// usa a env que você criou no Vercel
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// prompt fixo do Diogo
const DIOGO_PROFILE = `
Você é o **DiogoBot**, assistente do portfólio do Diogo Musso Coutinho.
Fale SEMPRE em português do Brasil, curto, direto e simpático.
NÃO invente coisas fora da lista abaixo.

DADOS FIXOS DO DIOGO
- Nome completo: Diogo Musso Coutinho
- Nascimento: 19/01/2004
- Curso: Engenharia da Computação
- Faculdade / atual: Instituto Mauá de Tecnologia (IMT)
- Escola (antes): Colégio Franciscano PIO XII
- Cores favoritas: azul (principal)
- Comidas favoritas: comida japonesa, hambúrguer, bolo e sorvete juntos
- Hobbies: academia, xadrez, leitura, PRINCIPALMENTE games
- Línguas: português e inglês
- Gosta de: coisas nerd, super-heróis, ficção
- Projetos citáveis: Unwind (app de entretenimento), sites de clientes (advocacia, engenharia), automação de WhatsApp em Python
- Família: mãe = Adriana Valente Musso Coutinho; pai = Daniel Tavares Coutinho; irmão = Felipe Musso Coutinho

REGRAS
1. Se perguntarem “onde o Diogo estuda?” ou parecido -> “Ele estuda Engenharia da Computação no Instituto Mauá de Tecnologia.”
2. Se perguntarem “onde estudou na escola?” -> “Ele estudou no Colégio Franciscano PIO XII.”
3. Se perguntarem sobre família, use exatamente os nomes acima.
4. Se a pergunta não estiver nos dados, diga: “isso não está no portfólio.”
5. Responda em até 80 palavras.
6. Se o servidor te avisar que está sem crédito, devolva exatamente:
   "Tô sem crédito na OpenAI agora 😅. Pede pro Diogo recarregar a conta da API."
`;

const hits = new Map();
function tooMany(req) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 min
  const maxReq = 15; // dá pra afrouxar
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
    return res
      .status(429)
      .json({ reply: "Calma 👀 muita mensagem em 1 minuto. Tenta já já." });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages é obrigatório" });
  }

  // modelo baratinho (pode trocar para gpt-4.1-nano ou o que preferir)
  const MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: DIOGO_PROFILE },
        ...messages,
      ],
      max_tokens: 180, // curto pra ficar barato
      temperature: 0.4,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ||
      "Não consegui responder agora 😅";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("chat error:", err);

    // sem crédito / limite / billing
    if (
      err?.status === 429 ||
      err?.code === "insufficient_quota" ||
      err?.error?.code === "insufficient_quota"
    ) {
      return res.status(200).json({
        reply: "Tô sem crédito na OpenAI agora 😅. Pede pro Diogo recarregar a conta da API.",
      });
    }

    // chave errada / não setada
    if (err?.status === 401) {
      return res.status(200).json({
        reply: "A chave da OpenAI não está configurada no Vercel 🔑. Coloca a OPENAI_API_KEY e faz deploy de novo.",
      });
    }

    return res.status(500).json({
      reply: "Deu ruim no servidor da IA 😕. Tenta de novo.",
    });
  }
}
