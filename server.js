
import express from 'express';
import multer from 'multer';
import { rembg } from '@remove-background-ai/rembg.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const upload = multer();
const API_KEY = process.env.API_KEY;

app.post('/api/remove-bg', upload.single('logo'), async (req, res) => {
  try {
    const inputBuffer = req.file.buffer;
    const output = await rembg({
      apiKey: API_KEY,
      inputImage: inputBuffer,
      options: { returnBase64: false }
    });
    res.type('image/png').send(output);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fallo al remover fondo' });
  }
});

app.use(express.static('public'));
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
