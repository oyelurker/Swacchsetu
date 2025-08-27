import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def reset_database():
    """Reset the database by dropping and recreating all tables"""
    try:
        from backend import models, database
        
        # Drop all tables
        print("Dropping all tables...")
        models.Base.metadata.drop_all(bind=database.engine)
        
        # Create all tables
        print("Creating all tables...")
        models.Base.metadata.create_all(bind=database.engine)
        
        print("Database reset completed successfully!")
        return True
    except Exception as e:
        print(f"Error resetting database: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Resetting database...")
    
    if reset_database():
        print("\nDatabase reset successful!")
    else:
        print("\nDatabase reset failed!")
        sys.exit(1)