# main.py
import time
import threading
from datetime import datetime

# Import modules
from modules.camera_handler import CameraHandler
from modules.ml_engine import MLEngine
from modules.servo_controller import ServoController
from modules.ui_controller import UIController
from modules.data_logger import DataLogger
from modules.system_manager import SystemManager
from modules.ultrasonic_sensor import UltrasonicSensor
from modules.battery_monitor import BatteryMonitor
from modules.alert_system import AlertSystem
from dashboard.app import start_dashboard, dashboard_data

# Global shared data
class GlobalState:
    items_sorted = 0
    last_item = "None"

def main():
    print("🚀 Smart Waste Sorting System Starting...")

    # Load config
    try:
        with open('config.json', 'r') as f:
            config = json.load(f)
    except Exception as e:
        print(f"❌ Config load failed: {e}")
        return

    # Initialize all components
    try:
        cam = CameraHandler(config)
        model = MLEngine(config)
        servo = ServoController(config)
        ui = UIController(config)
        logger = DataLogger(config)
        system = SystemManager(config)
        ultrasonic = UltrasonicSensor()
        battery = BatteryMonitor()
        alert = AlertSystem()
        dashboard_thread = start_dashboard()
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        return

    print("✅ All modules ready.")

    # Background update loop for dashboard
    def update_dashboard():
        while True:
            temp = system._get_temp()
            fill = ultrasonic.get_fill_level() or 0
            batt = battery.simulate_drain()

            dashboard_data.update({
                "fill_level": fill,
                "battery": round(batt),
                "items_sorted": GlobalState.items_sorted,
                "last_item": GlobalState.last_item,
                "system_temp": round(temp, 1),
                "status": "Full" if ultrasonic.is_full() else "Running"
            })
            time.sleep(2)

    dash_thread = threading.Thread(target=update_dashboard, daemon=True)
    dash_thread.start()

    # Main loop
    try:
        while True:
            # Overheat check
            if system.check_overheating():
                dashboard_data["status"] = "Overheating"
                ui.feedback_error()
                time.sleep(10)
                continue

            # Bin full check
            if ultrasonic.is_full():
                dashboard_data["status"] = "Bin Full - Alert Sent"
                if not hasattr(main, "alert_sent") or not main.alert_sent:
                    alert.alert_bin_full(ultrasonic.get_fill_level())
                    main.alert_sent = True
                time.sleep(30)  # Avoid spam
                continue
            else:
                main.alert_sent = False

            # Charging reminder
            if battery.needs_charging() and battery.can_remind():
                print("🔋 Battery low! Please charge the Pi.")
                battery.remind()
                # Optional: trigger LED blink

            # Wait for item
            ui.wait_for_trigger()
            ui.clear()

            try:
                # Capture & predict
                raw_image = cam.capture_image()
                processed_image = cam.preprocess_image(raw_image)
                label, confidence = model.predict(processed_image)

                # Decision
                threshold = config["classification"]["confidence_threshold"]
                if confidence < threshold:
                    ui.feedback_error()
                    logger.log("", "unknown", confidence, "held_out", "low confidence")
                    time.sleep(2)
                    continue

                # Actuate
                if label == "biodegradable":
                    servo.sort_biodegradable()
                else:
                    servo.sort_non_biodegradable()

                ui.feedback_success()
                time.sleep(0.5)
                servo.return_to_neutral()

                # Log & update
                img_path = cam.save_image(raw_image, label, confidence)
                logger.log(img_path, label, confidence, "sorted")
                GlobalState.items_sorted += 1
                GlobalState.last_item = f"{label} ({confidence:.0%})"

                time.sleep(1)

            except Exception as e:
                print(f"❌ Error: {e}")
                ui.feedback_error()
                logger.log("", "error", 0, "failed", str(e))
                time.sleep(2)

    except KeyboardInterrupt:
        print("\n🛑 Shutting down...")
    finally:
        cam.release()
        servo.cleanup()
        ui.cleanup()
        ultrasonic.close()
        print("✅ System stopped.")