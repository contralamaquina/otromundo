import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { logoBase64, fondoBase64 } = req.body;
    if (!logoBase64 || !fondoBase64) {
      return res.status(400).json({ error: "Faltan imágenes" });
    }

    const prompt = "Integra este logo en la imagen de fondo de manera realista, como si estuviera impreso, pegado o estampado en la superficie.";

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    return res.status(200).json({ image: response.data[0].url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}