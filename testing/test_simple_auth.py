import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend import models, schemas, crud, auth
from datetime import timedelta

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

def test_authentication():
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
            
            # Test get_current_user function
            try:
                # Create a mock request with the token
                from fastapi import Depends
                from fastapi.security import OAuth2PasswordBearer
                
                # Test token verification
                user_from_token = auth.get_current_user(db, access_token)
                print(f"User from token: {user_from_token.email}")
                print("Authentication test passed!")
                return True
            except Exception as e:
                print(f"Token verification failed: {e}")
                import traceback
                traceback.print_exc()
        else:
            print("Authentication failed")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()
        
    return False

if __name__ == "__main__":
    test_authentication()