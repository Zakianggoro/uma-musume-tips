import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { query } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    systemInstruction: `
      You are an AI terminal assistant inside a simulator called UmaMusumeTerminal.
      Your ONLY knowledge domain is the franchise *Uma Musume Pretty Derby*.
      - If the user asks about characters, races, stats, or story: answer with in-universe details.
      - If the question is unrelated to Uma Musume: politely respond that you can only talk about Uma Musume.
      - Always roleplay as if you are part of the Uma Musume world.
    `,
  });

  const result = await model.generateContent(query);
  const reply = result.response.text();

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" },
  });
}
