import os
import sys
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import User, Base
from crud import pwd_context
from database import engine

# Import the database URL from .env
from dotenv import load_dotenv
load_dotenv()

print("Initializing database...")

# Create all tables
Base.metadata.create_all(bind=engine)
print("Database tables created.")

# Create engine and session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# Create test users
test_users = [
    {
        "email": "household@example.com",
        "password": "test123",
        "role": "household",
        "location": "Test Location"
    },
    {
        "email": "business@example.com",
        "password": "test123",
        "role": "business",
        "location": "Test Location"
    },
    {
        "email": "composter@example.com",
        "password": "test123",
        "role": "composter",
        "location": "Test Location"
    },
    {
        "email": "buyer@example.com",
        "password": "test123",
        "role": "buyer",
        "location": "Test Location"
    }
]

print("Creating test users...")

for user_data in test_users:
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data["email"]).first()
    if existing_user:
        print(f"User {user_data['email']} already exists, skipping...")
        continue

    # Hash the password
    hashed_password = pwd_context.hash(user_data["password"])

    # Create the user
    user = User(
        email=user_data["email"],
        hashed_password=hashed_password,
        role=user_data["role"],
        location=user_data["location"]
    )

    db.add(user)
    print(f"Created user: {user_data['email']} with role {user_data['role']}")

db.commit()
db.close()

print("Database initialization complete!")
print("\nTest users created:")
print("1. Household user: household@example.com / test123")
print("2. Business user: business@example.com / test123")
print("3. Composter user: composter@example.com / test123")
print("4. Buyer user: buyer@example.com / test123")