// /api/remove-bg.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Falta la imagen" });
  }

  try {
    const fetchRes = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVEBG_API_KEY,
      },
      body: new URLSearchParams({
        image_file_b64: imageBase64,
        size: "auto",
      }),
    });

    if (!fetchRes.ok) {
      const errorText = await fetchRes.text();
      return res.status(fetchRes.status).json({ error: errorText });
    }

    const buffer = await fetchRes.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    res.status(200).json({ image: `data:image/png;base64,${base64}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
