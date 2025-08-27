import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend import models, schemas
from backend.database import SessionLocal, engine
from backend import crud, auth
from passlib.context import CryptContext
from datetime import timedelta

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

def test_user_creation_and_authentication():
    # Create a database session
    db = SessionLocal()
    
    try:
        # Create a test user
        user_data = schemas.UserCreate(
            email="test@example.com",
            password="testpassword",
            role="household",
            location="Test Location"
        )
        
        # Check if user already exists
        existing_user = crud.get_user_by_email(db, email=user_data.email)
        if existing_user:
            print(f"User {user_data.email} already exists")
            # Delete existing user for clean test
            db.delete(existing_user)
            db.commit()
        
        # Create new user
        new_user = crud.create_user(db=db, user=user_data)
        print(f"Created user: {new_user.email}")
        
        # Test authentication
        authenticated_user = auth.authenticate_user(db, "test@example.com", "testpassword")
        if authenticated_user:
            print(f"Authenticated user: {authenticated_user.email}")
            
            # Test JWT token creation
            access_token_expires = timedelta(minutes=30)
            access_token = auth.create_access_token(
                data={"sub": authenticated_user.email, "role": authenticated_user.role}, 
                expires_delta=access_token_expires
            )
            print(f"Generated token: {access_token}")
            
            # Test token verification
            try:
                payload = auth.jwt.decode(access_token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
                print(f"Token payload: {payload}")
            except Exception as e:
                print(f"Token verification failed: {e}")
        else:
            print("Authentication failed")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    test_user_creation_and_authentication()