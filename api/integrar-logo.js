import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // O podés poner tu dominio exacto en lugar de '*'
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    console.log("OPTIONS preflight recibido");
    return res.status(204).end();
  }

  console.log("Headers recibidos:", req.headers);
  console.log("Método:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { logoBase64, fondoBase64 } = req.body;

    if (!logoBase64 || !fondoBase64) {
      return res.status(400).json({ error: "Faltan imágenes" });
    }

    // Aquí el prompt para integrar logo con fondo de forma realista
    const prompt = "Integra este logo en la imagen de fondo de manera realista, como si estuviera impreso, pegado o estampado en la superficie.";

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    return res.status(200).json({ image: response.data[0].url });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
