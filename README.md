# Aleotromundo IA Integration

Este proyecto incluye:

- `/api/integrar-logo.js`: Función backend para integrar un logo en una imagen de fondo usando la API de OpenAI (DALL·E 3).
- `index.html`: Frontend para subir el logo y la imagen de fondo, generar la imagen con IA y descargarla.

## Uso

1. Configurar variable de entorno `OPENAI_API_KEY` en Vercel con tu clave OpenAI.
2. Subir `/api/integrar-logo.js` a tu backend en Vercel.
3. Subir `index.html` a tu repo GitHub Pages o servidor estático.
4. Cambiar la URL en `fetch()` del frontend a tu dominio real de Vercel.

## Tecnologías

- Node.js (Vercel Serverless Functions)
- OpenAI API (DALL·E 3)
- HTML + JavaScript Vanilla