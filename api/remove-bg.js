import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // O poné tu dominio para mayor seguridad
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end(); // Respuesta a preflight
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Falta la imagen" });
    }

    // Aquí usás la API de remove.bg o la de OpenAI para quitar fondo
    // Ejemplo: llamar a OpenAI images edit (simplificado)

    const response = await openai.images.edit({
      model: "dall-e-3",
      image: Buffer.from(imageBase64, "base64"),
      mask: Buffer.from(imageBase64, "base64"), // acá tendrías que pasar una máscara para remover fondo real
      prompt: "Remove background from image",
      n: 1,
      size: "1024x1024",
    });

    return res.status(200).json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Error desconocido" });
  }
}
