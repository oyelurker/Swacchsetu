import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend import models
from backend.database import SessionLocal, engine
from backend import crud
from passlib.context import CryptContext

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

# Password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def check_users():
    # Create a database session
    db = SessionLocal()
    
    try:
        # Get all users
        users = db.query(models.User).all()
        
        if not users:
            print("No users found in the database.")
        else:
            print("Users in the database:")
            for user in users:
                print(f"- ID: {user.id}, Email: {user.email}, Role: {user.role}")
                # Note: We won't print the hashed password for security reasons
                
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_users()