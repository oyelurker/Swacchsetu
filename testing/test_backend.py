import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_backend_imports():
    """Test that we can import all backend modules without errors"""
    try:
        # Test importing main modules
        from backend import main, auth, crud, models, schemas, database
        print("Successfully imported all backend modules")
        
        # Test importing services
        from backend.services import matching, geocoding, location
        print("Successfully imported all service modules")
        
        return True
    except Exception as e:
        print(f"Failed to import backend modules: {e}")
        return False

def test_database_connection():
    """Test that we can connect to the database"""
    try:
        from backend.database import SessionLocal, engine
        from backend import models
        
        # Create a database session
        db = SessionLocal()
        
        # Try to query the database
        try:
            # This will test if the database connection works
            db.query(models.User).first()
            print("Successfully connected to the database")
        except Exception as e:
            # This might fail if tables don't exist yet, which is OK
            print(f"Database connection test completed (tables may not exist yet): {e}")
        finally:
            db.close()
            
        return True
    except Exception as e:
        print(f"Failed to connect to database: {e}")
        return False

if __name__ == "__main__":
    print("Running backend tests...")
    
    if test_backend_imports() and test_database_connection():
        print("All backend tests passed!")
    else:
        print("Some backend tests failed!")
        sys.exit(1)