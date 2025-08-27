import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_database_connection():
    \"\"\"Test database connection\"\"\"
    try:
        from backend.database import engine
        from backend import models
        
        # Test connection
        print(\"Testing database connection...\")
        connection = engine.connect()
        print(\"Database connection successful!\")
        connection.close()
        
        return True
    except Exception as e:
        print(f\"Error connecting to database: {e}\")
        import traceback
        traceback.print_exc()
        return False

if __name__ == \"__main__\":
    if test_database_connection():
        print(\"\nDatabase connection test passed!\")
    else:
        print(\"\nDatabase connection test failed!\")
        sys.exit(1)