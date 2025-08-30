import cv2
import time
from pathlib import Path
import json

class CameraHandler:
    def __init__(self, config):
        self.config = config
        self.resolution = tuple(config["camera"]["resolution"])
        self.image_dir = Path(config["logging"]["image_dir"])
        self.image_dir.mkdir(exist_ok=True)
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.resolution[0])
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.resolution[1])

    def capture_image(self):
        """Capture image and return as RGB array"""
        ret, frame = self.cap.read()
        if not ret:
            raise RuntimeError("Failed to capture image")
        return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    def preprocess_image(self, image):
        """Resize and normalize image for model input"""
        input_size = self.config["model"]["input_size"]
        img_resized = cv2.resize(image, (input_size, input_size))
        img_normalized = img_resized.astype('float32') / 255.0
        return img_normalized

    def save_image(self, image, label, confidence):
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{label}_{int(confidence*100)}.jpg"
        path = self.image_dir / filename
        cv2.imwrite(str(path), cv2.cvtColor(image, cv2.COLOR_RGB2BGR))
        return str(path)

    def release(self):
        self.cap.release()