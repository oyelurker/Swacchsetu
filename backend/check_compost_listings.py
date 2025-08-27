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

# Query all compost listings
compost_listings = db.query(CompostMarketplace).all()

if compost_listings:
    print(f"Found {len(compost_listings)} compost listings:")
    for listing in compost_listings:
        print(f"  ID: {listing.id}")
        print(f"  Title: {listing.title}")
        print(f"  Price per kg: {listing.price_per_kg}")
        print(f"  Quantity available: {listing.quantity_available}")
        print(f"  Seller ID: {listing.seller_id}")
        print("---")
else:
    print("No compost listings found in the database.")

db.close()