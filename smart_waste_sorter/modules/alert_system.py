import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os

class AlertSystem:
    def __init__(self, secrets_file="secrets.json"):
        self.secrets_file = secrets_file
        self.secrets = self._load_secrets()

    def _load_secrets(self):
        if os.path.exists(self.secrets_file):
            with open(self.secrets_file) as f:
                return json.load(f)
        return {}

    def send_email(self, subject, body):
        email = self.secrets.get("smtp_email")
        password = self.secrets.get("smtp_password")
        user_email = self.secrets.get("user_email")
        if not email or not password or not user_email:
            print("❌ Email credentials missing.")
            return False

        try:
            msg = MIMEMultipart()
            msg["From"] = email
            msg["To"] = user_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))

            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(email, password)
            server.sendmail(email, user_email, msg.as_string())
            server.quit()
            print("📧 Email sent.")
            return True
        except Exception as e:
            print(f"❌ Email failed: {e}")
            return False

    def send_webhook(self, fill_level):
        url = self.secrets.get("webhook_url")
        if not url:
            return False
        try:
            data = {
                "event": "bin_full",
                "fill_level": fill_level,
                "timestamp": self._iso_now()
            }
            requests.post(url, json=data, timeout=5)
            print("🌐 Webhook sent.")
            return True
        except:
            return False

    def alert_bin_full(self, fill_level):
        subject = "🗑️ Waste Bin is Full!"
        body = f"Your smart waste bin is {fill_level}% full. Please empty it soon."
        self.send_email(subject, body)
        self.send_webhook(fill_level)

    def _iso_now(self):
        from datetime import datetime
        return datetime.now().isoformat()