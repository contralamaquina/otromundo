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
    const { logoData, fondoData } = req.body;

    if (!logoData || !fondoData) {
      return res.status(400).json({ error: "Faltan imágenes" });
    }

    // Aquí deberías llamar a remove.bg o similar para sacar fondo del logo
    // O bien usar alguna librería o API para procesar el logoData base64/URL y devolver la versión sin fondo.
    // Para el ejemplo simplifico y uso directamente el logoData (sin eliminar fondo).
    // Recomiendo implementar remove.bg o una función de eliminación de fondo aquí.

    const prompt = `Integra este logo (ya sin fondo) en la imagen de fondo de manera realista, como si estuviera impreso, pegado o estampado en la superficie. Logo: ${logoData}. Fondo: ${fondoData}. Detalles: texturas, relieve, sombras, realismo.`

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    return res.status(200).json({ imageUrl: response.data[0].url });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
