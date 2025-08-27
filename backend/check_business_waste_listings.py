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

# Query all waste listings for the business user (ID 2)
waste_listings = db.query(WasteListing).filter(WasteListing.owner_id == 2).all()

if waste_listings:
    print(f"Found {len(waste_listings)} waste listings for business user ID 2:")
    for listing in waste_listings:
        print(f"  ID: {listing.id}")
        print(f"  Title: {listing.title}")
        print(f"  Quantity: {listing.quantity}")
        print(f"  Status: {listing.status}")
        print("---")
else:
    print("No waste listings found for business user ID 2.")

db.close()