import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Solo POST' });

  try {
    const { logoBase64, fondoBase64 } = req.body;

    const prompt = "Integra el logo de forma realista en la imagen. Que parezca parte natural de la escena, como un estampado o sticker en la superficie.";

    // Enviar ambas imágenes como input (esto se puede adaptar según el modelo usado)
    const response = await openai.images.edit({
      image: fondoBase64, // si el modelo soporta edición
      mask: null,
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    res.status(200).json({ image: response.data[0].url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
