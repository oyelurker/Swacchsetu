import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend import models
from backend.database import SessionLocal, engine

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

def delete_user(email):
    # Create a database session
    db = SessionLocal()
    
    try:
        # Get the user
        user = db.query(models.User).filter(models.User.email == email).first()
        
        if not user:
            print(f"User {email} not found.")
        else:
            # Delete the user
            db.delete(user)
            db.commit()
            print(f"User {email} deleted successfully.")
                
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    delete_user("saurav5@gmail.com")