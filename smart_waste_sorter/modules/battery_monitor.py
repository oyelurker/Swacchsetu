import random
from datetime import datetime, timedelta

class BatteryMonitor:
    def __init__(self, start_charge=100, drain_rate_per_hour=2.5):
        self.charge = start_charge
        self.drain_rate = drain_rate_per_hour
        self.last_check = datetime.now()
        self.last_alert = None

    def simulate_drain(self):
        now = datetime.now()
        hours = (now - self.last_check).total_seconds() / 3600
        self.charge = max(0, self.charge - self.drain_rate * hours)
        self.last_check = now
        return self.charge

    def needs_charging(self, threshold=20):
        return self.simulate_drain() <= threshold

    def can_remind(self, hours=6):
        now = datetime.now()
        if self.last_alert is None:
            return True
        return (now - self.last_alert).total_seconds() >= hours * 3600

    def remind(self):
        self.last_alert = datetime.now()