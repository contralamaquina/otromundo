import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Falta la imagen" });
    }

    // Convertimos base64 a buffer
    const imageBuffer = Buffer.from(imageBase64, "base64");

    // Aquí debes usar la llamada correcta para quitar fondo (editar imagen) con OpenAI.
    // Como ejemplo sencillo, la demo usa generación simple.
    // Debes ajustar con la API oficial para edición de imagen (images.edit) y pasar máscara.

    // Por ahora hacemos una llamada simple para ilustrar (sustituir por tu implementación real):
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Remove the background and keep only the main logo, transparent background",
      n: 1,
      size: "1024x1024",
    });

    // Retornamos la URL generada (ejemplo, no real de remove bg)
    return res.status(200).json({ image: response.data[0].url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
