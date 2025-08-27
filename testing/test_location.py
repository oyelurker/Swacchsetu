import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_location_service():
    """Test the location service"""
    try:
        # Import the function directly from the module
        from backend.services.location import populate_location_data
        
        # Mock database session and object
        class MockDB:
            def commit(self):
                pass
                
            def refresh(self, obj):
                pass
                
        class MockObject:
            def __init__(self):
                self.address = "New Delhi, India"
                self.latitude = None
                self.longitude = None
                self.city = None
                self.state = None
                self.country = None
                self.location = None
                self.pickup_location = None
        
        # Create mock objects
        db = MockDB()
        obj = MockObject()
        
        # Test populate_location_data function
        # Note: This will print a warning about missing API key, which is expected
        populate_location_data(db, obj)
        
        print("Location service test completed (missing API key is expected)")
        return True
    except Exception as e:
        print(f"Error testing location service: {e}")
        return False

if __name__ == "__main__":
    print("Testing location service...")
    
    if test_location_service():
        print("Location service test completed!")
    else:
        print("Location service test failed!")
        sys.exit(1)