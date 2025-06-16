import OpenAI from "openai";
import fetch from "node-fetch";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
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
    const { logoUrl, fondoUrl } = req.body;
    if (!logoUrl || !fondoUrl) {
      return res.status(400).json({ error: "Faltan URLs" });
    }

    // Paso 1: quitar fondo al logo con remove.bg
    const removeBgResp = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": REMOVE_BG_API_KEY,
      },
      body: new URLSearchParams({ image_url: logoUrl, size: "auto" }),
    });

    if (!removeBgResp.ok) {
      const errText = await removeBgResp.text();
      return res.status(500).json({ error: `Remove.bg error: ${errText}` });
    }

    const logoBuffer = await removeBgResp.arrayBuffer();
    const logoBase64 = Buffer.from(logoBuffer).toString("base64");
    const logoDataUrl = `data:image/png;base64,${logoBase64}`;

    // Paso 2: usar OpenAI DALL·E para integrar logo en fondo
    const prompt = `Integra este logo (se muestra como imagen con fondo transparente) en la imagen de fondo de forma realista, como si estuviera impreso o pegado en la superficie, respetando detalles, relieves y sombras: ${fondoUrl}`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    const imageUrl = response.data[0].url;

    return res.status(200).json({ imageUrl, logoDataUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
