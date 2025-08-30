from gpiozero import LED, Buzzer, Button
import time

class UIController:
    def __init__(self, config):
        self.config = config
        io = config["io"]
        self.led_green = LED(io["led_green"])
        self.led_red = LED(io["led_red"])
        self.buzzer = Buzzer(io["buzzer"]) if io.get("buzzer") else None
        self.button = Button(io["button_trigger"]) if io.get("button_trigger") else None
        self.clear()

    def clear(self):
        self.led_green.off()
        self.led_red.off()
        if self.buzzer:
            self.buzzer.off()

    def feedback_success(self):
        self.led_green.on()
        if self.buzzer:
            self.buzzer.beep(n=1, on_time=0.2, off_time=0.1)

    def feedback_error(self):
        self.led_red.on()
        if self.buzzer:
            self.buzzer.beep(n=3, on_time=0.1, off_time=0.1)

    def wait_for_trigger(self):
        if self.button:
            print("Waiting for button press...")
            self.button.wait_for_press()
        else:
            input("Press Enter to process next item...")

    def cleanup(self):
        self.clear()
        if self.buzzer:
            self.buzzer.close()
        self.led_green.close()
        self.led_red.close()
        if self.button:
            self.button.close()