import os
import sys
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import User

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

# Query all composter users
composters = db.query(User).filter(User.role == "composter").all()

if composters:
    print(f"Found {len(composters)} composter users:")
    for user in composters:
        print(f"  ID: {user.id}")
        print(f"  Email: {user.email}")
        print("---")
else:
    print("No composter users found in the database.")

db.close()