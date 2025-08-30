# 🌱 Smart Waste Sorting System

An intelligent, automated waste sorting system using Raspberry Pi 5, computer vision, and IoT.

## Features
- 📸 Waste classification (biodegradable vs non-biodegradable)
- 🤖 Servo-based physical sorting
- 📡 Ultrasonic sensor for bin fill detection
- 📧 Email & webhook alerts when bin is full
- 🔋 Battery/charging reminder
- 🖥️ Real-time web dashboard
- ⚙️ Auto-start on boot via systemd

## Setup
1. Run `chmod +x setup.sh && ./setup.sh`
2. Add your model to `model/waste_model.tflite`
3. Update `secrets.json` with secure credentials
4. Start: `python main.py`

Dashboard: `http://<pi-ip>:5000`