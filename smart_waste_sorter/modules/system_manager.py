import psutil
import json

class SystemManager:
    def __init__(self, config):
        self.config = config

    def get_health(self):
        return {
            "cpu_usage": psutil.cpu_percent(),
            "memory_usage": psutil.virtual_memory().percent,
            "temperature": self._get_temp(),
            "timestamp": datetime.now().isoformat()
        }

    def _get_temp(self):
        try:
            with open("/sys/class/thermal/thermal_zone0/temp", "r") as f:
                temp = float(f.read()) / 1000.0
            return temp
        except:
            return 0.0

    def check_overheating(self):
        temp = self._get_temp()
        max_temp = self.config["system"]["max_temp"]
        return temp > max_temp