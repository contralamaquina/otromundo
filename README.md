# Marca de Agua IA - Web Local

Esta es una aplicación web local en Flask para integrar automáticamente un logo (marca de agua) en zonas detectadas de imágenes, como paredes y macetas, usando inteligencia artificial (Mask R-CNN).

---

## Requisitos

- Python 3.8 o superior
- Conexión a Internet (para descargar los modelos PyTorch la primera vez)

---

## Instalación

1. Clonar o descargar este repositorio

2. Instalar dependencias:

```bash
pip install -r requirements.txt
```

3. Colocar tu logo transparente como `logo.png` en la raíz del proyecto

---

## Uso

Ejecutar la aplicación con:

```bash
python app.py
```

Luego abrir en el navegador:

```
http://127.0.0.1:5000
```

Subir imágenes y ver el logo integrado automáticamente en las zonas detectadas.

---

## Estructura de archivos

```
/marca_agua_ia/
│
├── app.py
├── logo.png
├── requirements.txt
├── README.md
└── templates/
    └── index.html
```

---

## Notas

- El modelo detecta paredes y macetas para poner el logo
- Puedes ajustar el tamaño del logo en `app.py` en la función `apply_logo_multiple_zones`
- Requiere GPU para mejor velocidad pero funciona en CPU (más lento)

---

## Contacto

Para dudas o mejoras, podés escribirme o abrir issues en el repo.

---

¡A disfrutar tu marca de agua con IA! 🚀