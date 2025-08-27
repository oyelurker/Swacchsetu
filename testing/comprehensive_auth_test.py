import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend import models, schemas
from backend.database import SessionLocal, engine
from backend import crud, auth
from datetime import timedelta
import json

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

def test_authentication_flow():
    # Create a database session
    db = SessionLocal()
    
    try:
        # Test user data
        test_users = [
            {
                "email": "comprehensive_test1@example.com",
                "password": "comprehensive_password1",
                "role": "household",
                "location": "Test Location 1"
            },
            {
                "email": "comprehensive_test2@example.com",
                "password": "comprehensive_password2",
                "role": "farmer",
                "location": "Test Location 2"
            }
        ]
        
        for user_data in test_users:
            print(f"\n--- Testing user: {user_data['email']} ---")
            
            # Check if user already exists
            existing_user = crud.get_user_by_email(db, email=user_data['email'])
            if existing_user:
                print(f"User {user_data['email']} already exists, deleting...")
                db.delete(existing_user)
                db.commit()
            
            # Create new user
            user_create_schema = schemas.UserCreate(**user_data)
            new_user = crud.create_user(db=db, user=user_create_schema)
            print(f"Created user: {new_user.email} with ID {new_user.id}")
            
            # Test authentication
            authenticated_user = auth.authenticate_user(db, user_data['email'], user_data['password'])
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
                    
                    # Test get_current_user function
                    from fastapi import HTTPException
                    try:
                        # Create a mock request with the token
                        user_from_token = auth.get_current_user(db, access_token)
                        print(f"User from token: {user_from_token.email}")
                        print("Authentication test passed!")
                    except HTTPException as e:
                        print(f"get_current_user failed: {e.detail}")
                    except Exception as e:
                        print(f"get_current_user failed with exception: {e}")
                except Exception as e:
                    print(f"Token verification failed: {e}")
            else:
                print("Authentication failed")
                
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    test_authentication_flow()