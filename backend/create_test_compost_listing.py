import os
import sys
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import CompostMarketplace

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

# Create a test compost listing
# Note: You'll need to replace seller_id with an actual composter user ID
compost_listing = CompostMarketplace(
    title="Fresh Organic Compost",
    description="High-quality organic compost made from kitchen scraps",
    price_per_kg=50.0,
    quantity_available=100.0,
    seller_id=3  # Using the actual composter user ID
)

db.add(compost_listing)
db.commit()
db.refresh(compost_listing)

print(f"Created compost listing with ID: {compost_listing.id}")

db.close()