import os
import sys
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import WasteListing

# Add the current directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the database URL from .env
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# Create a test waste listing for the business user (ID 2)
waste_listing = WasteListing(
    title="Business Organic Waste",
    description="Organic waste from our restaurant kitchen",
    quantity=20.0,
    waste_type="organic",
    pickup_location="456 Business Street, Cityville",
    owner_id=2  # Business user ID
)

db.add(waste_listing)
db.commit()
db.refresh(waste_listing)

print(f"Created waste listing with ID: {waste_listing.id}")

db.close()