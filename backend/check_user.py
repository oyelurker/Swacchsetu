import os
import sys
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import User
from crud import pwd_context

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

# Get user email from command line argument
if len(sys.argv) != 2:
    print("Usage: python check_user.py <email>")
    sys.exit(1)

email = sys.argv[1]

# Query the user
user = db.query(User).filter(User.email == email).first()

if user:
    print(f"User found:")
    print(f"  ID: {user.id}")
    print(f"  Email: {user.email}")
    print(f"  Role: {user.role}")
    print(f"  Hashed Password: {user.hashed_password}")
else:
    print(f"No user found with email: {email}")

db.close()