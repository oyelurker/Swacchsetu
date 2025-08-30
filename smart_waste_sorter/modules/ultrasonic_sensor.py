from gpiozero import DistanceSensor
import time

class UltrasonicSensor:
    def __init__(self, echo_pin=24, trigger_pin=23, max_distance=1.0):
        self.sensor = DistanceSensor(
            echo=echo_pin,
            trigger=trigger_pin,
            max_distance=max_distance,
            threshold_distance=0.3  # 30cm threshold
        )
        self.empty_distance = 0.8  # Calibrate: height of empty bin (m)
        self.full_distance = 0.1   # Calibrate: full bin distance (m)

    def get_distance(self):
        try:
            return self.sensor.distance  # in meters
        except:
            return None

    def get_fill_level(self):
        dist = self.get_distance()
        if dist is None:
            return None
        # Normalize: 0% = empty, 100% = full
        level = max(0, min(100, (self.empty_distance - dist) / (self.empty_distance - self.full_distance) * 100))
        return round(level, 1)

    def is_full(self, threshold=80):
        level = self.get_fill_level()
        return level is not None and level >= threshold

    def close(self):
        self.sensor.close()