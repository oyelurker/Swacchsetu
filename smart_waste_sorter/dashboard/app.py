# dashboard/app.py
from flask import Flask, render_template, jsonify
import threading
import time
import json

app = Flask(__name__, template_folder='templates', static_folder='static')

# Shared data container
dashboard_data = {
    "fill_level": 0,
    "battery": 100,
    "items_sorted": 0,
    "accuracy": "N/A",
    "last_item": "None",
    "system_temp": 0,
    "status": "Running"
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data")
def api_data():
    return jsonify(dashboard_data)

def start_dashboard(host='0.0.0.0', port=5000):
    """Run dashboard in background thread"""
    def run():
        app.run(host=host, port=port, threaded=True, debug=False)
    thread = threading.Thread(target=run, daemon=True)
    thread.start()
    print(f"🌐 Dashboard available at http://<pi-ip>:{port}/")
    return thread