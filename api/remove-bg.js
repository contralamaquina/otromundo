import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Habilitar CORS para GitHub Pages
  const allowedOrigins = ['https://aleotromundo.github.io', 'http://localhost:5500'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permite POST' });
  }

  // Clave de remove.bg desde variable de entorno
  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Falta la API key de remove.bg' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Falta la imagen (base64)' });
    }

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_file_b64: imageBase64.split(',')[1], // eliminar "data:image/...;base64,"
        size: 'auto',
      }),
    });

    if (!response.ok) {
      const errorJson = await response.json();
      return res.status(response.status).json({ error: errorJson.errors || 'Error en la API de remove.bg' });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    res.status(200).json({ imageBase64: 'data:image/png;base64,' + base64 });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error des
