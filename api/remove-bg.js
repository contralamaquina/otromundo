// api/remove-bg.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'API key missing' });
    return;
  }

  try {
    // La imagen viene en base64 en el body
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      res.status(400).json({ error: 'imageBase64 missing' });
      return;
    }

    // Remove.bg API acepta la imagen en base64:
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_file_b64: imageBase64.split(',')[1], // sacar la cabecera data:image/...
        size: 'auto',
      }),
    });

    if (!response.ok) {
      const errorJson = await response.json();
      res.status(response.status).json({ error: errorJson.errors || 'Remove.bg API error' });
      return;
    }

    // Obtener imagen PNG en buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Enviar imagen procesada en base64 para que el frontend la muestre
    const base64 = buffer.toString('base64');

    res.status(200).json({ imageBase64: 'data:image/png;base64,' + base64 });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
}
