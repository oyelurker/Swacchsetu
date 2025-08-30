import csv
import json
from datetime import datetime
import os

class DataLogger:
    def __init__(self, config):
        self.config = config
        self.log_file = config["logging"]["log_file"]
        os.makedirs(os.path.dirname(self.log_file), exist_ok=True)
        self._init_csv()

    def _init_csv(self):
        if not os.path.exists(self.log_file):
            with open(self.log_file, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(["timestamp", "image_path", "prediction", "confidence", "action", "notes"])

    def log(self, image_path, prediction, confidence, action, notes=""):
        with open(self.log_file, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                datetime.now().isoformat(),
                image_path,
                prediction,
                f"{confidence:.4f}",
                action,
                notes
            ])