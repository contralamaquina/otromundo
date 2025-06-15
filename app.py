import io
from flask import Flask, request, render_template
from PIL import Image
import torch
import torchvision.transforms as T
import numpy as np
import cv2

app = Flask(__name__)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Modelo Mask R-CNN preentrenado para detección y segmentación
model = torch.hub.load('pytorch/vision:v0.15.2', 'maskrcnn_resnet50_fpn', pretrained=True)
model.to(device).eval()

transform = T.Compose([
    T.ToTensor(),
])

COCO_INSTANCE_CATEGORY_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'N/A', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'N/A', 'backpack', 'umbrella',
    'N/A', 'N/A', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard',
    'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard',
    'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife',
    'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli',
    'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
    'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse',
    'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster',
    'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
    'hair drier', 'toothbrush'
]

def get_masks(image, threshold=0.5):
    img_t = transform(image).to(device)
    with torch.no_grad():
        pred = model([img_t])[0]

    masks = pred['masks'].cpu().numpy()
    labels = pred['labels'].cpu().numpy()
    scores = pred['scores'].cpu().numpy()

    selected_masks = []
    for i in range(len(masks)):
        if scores[i] > threshold and labels[i] in [15, 64]:  # pared (15), maceta (64)
            mask = masks[i, 0] > 0.5
            selected_masks.append((labels[i], mask))

    return selected_masks

def apply_logo_multiple_zones(image, masks, logo_path='logo.png'):
    img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    logo = cv2.imread(logo_path, cv2.IMREAD_UNCHANGED)
    if logo is None:
        print("Error: logo.png no encontrado")
        return image

    for label, mask in masks:
        mask_uint8 = mask.astype(np.uint8) * 255
        contours, _ = cv2.findContours(mask_uint8, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            continue

        c = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(c)

        # Ajustar tamaño del logo al área detectada (modifica escala si querés)
        logo_resized = cv2.resize(logo, (w, h), interpolation=cv2.INTER_AREA)

        for i in range(h):
            for j in range(w):
                alpha = logo_resized[i, j][3] / 255
                if alpha > 0:
                    img_cv[y + i, x + j] = (logo_resized[i, j][:3] * alpha + img_cv[y + i, x + j] * (1 - alpha)).astype(np.uint8)

    img_out = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
    return img_out

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    img = Image.open(file.stream).convert('RGB')
    masks = get_masks(img)
    img_with_logo = apply_logo_multiple_zones(img, masks)
    img_bytes = io.BytesIO()
    img_with_logo.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    return (img_bytes.read(), 200, {'Content-Type': 'image/png'})

if __name__ == '__main__':
    app.run(debug=True)