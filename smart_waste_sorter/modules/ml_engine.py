import tflite_runtime.interpreter as tflite
import numpy as np
import os

class MLEngine:
    def __init__(self, config):
        self.config = config
        model_path = config["model"]["path"]
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found: {model_path}")
        self.interpreter = tflite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()

        # Get I/O details
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

        # Load labels
        with open(config["model"]["labels"], 'r') as f:
            self.labels = [line.strip() for line in f.readlines()]

    def predict(self, image):
        """Run inference on preprocessed image"""
        input_tensor = np.expand_dims(image, axis=0)
        self.interpreter.set_tensor(self.input_details[0]['index'], input_tensor)
        self.interpreter.invoke()
        output = self.interpreter.get_tensor(self.output_details[0]['index'])[0]
        probabilities = softmax(output)
        pred_id = np.argmax(probabilities)
        confidence = float(probabilities[pred_id])
        label = self.labels[pred_id]
        return label, confidence

def softmax(x):
    x_shift = x - np.max(x)
    exps = np.exp(x_shift)
    return exps / np.sum(exps)