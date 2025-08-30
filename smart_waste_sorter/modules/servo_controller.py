from gpiozero import Servo
import time

class ServoController:
    def __init__(self, config):
        self.config = config
        pin = config["servo"]["pin"]
        # Use custom PWM values to avoid jitter
        self.servo = Servo(pin, initial_value=None, min_pulse_width=0.5/1000, max_pulse_width=2.5/1000)
        self.angles = config["servo"]["angles"]
        self.move_time = config["servo"]["move_time_sec"]
        self.to_angle(0)  # Neutral

    def to_angle(self, angle_deg):
        """Move servo to angle (-90 to 90)"""
        if not -90 <= angle_deg <= 90:
            raise ValueError("Angle must be between -90 and 90")
        normalized = angle_deg / 90.0
        self.servo.value = normalized
        time.sleep(self.move_time)

    def sort_biodegradable(self):
        self.to_angle(self.angles["biodegradable"])

    def sort_non_biodegradable(self):
        self.to_angle(self.angles["non_biodegradable"])

    def return_to_neutral(self):
        self.to_angle(self.angles["neutral"])

    def cleanup(self):
        self.servo.detach()