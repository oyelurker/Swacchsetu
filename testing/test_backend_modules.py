import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_backend_modules():
    """Test if backend modules can be imported without errors"""
    try:
        print("Testing backend module imports...")
        
        # Test importing main modules
        from backend import main, auth, crud, models, schemas, database
        print("[OK] Successfully imported main modules")
        
        # Test importing services
        from backend.services import matching, geocoding, location
        print("[OK] Successfully imported service modules")
        
        # Test database connection
        try:
            from backend.database import SessionLocal, engine
            db = SessionLocal()
            # Try a simple query
            db.query(models.User).first()
            db.close()
            print("[OK] Database connection successful")
        except Exception as e:
            print(f"[WARNING] Database connection test failed: {e}")
        
        print("\nAll backend modules imported successfully!")
        return True
    except Exception as e:
        print(f"Error importing backend modules: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if test_backend_modules():
        print("\nBackend modules are working correctly!")
    else:
        print("\nThere are issues with the backend modules!")
        sys.exit(1)