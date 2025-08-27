import os
import sys

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend'))

# Now import from backend
from database import engine, Base

def initialize_database():
    """Initialize the database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created.")

if __name__ == "__main__":
    initialize_database()