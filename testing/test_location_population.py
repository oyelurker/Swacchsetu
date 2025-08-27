import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_location_population():
    """Test that location data is populated correctly"""
    try:
        # Import required modules
        from backend.services.location import populate_location_data
        from backend.services.geocoding import get_coordinates_from_address, reverse_geocode
        from backend import models
        from sqlalchemy import create_engine
        from sqlalchemy.orm import sessionmaker
        
        # Create a mock database session
        class MockDB:
            def commit(self):
                pass
                
            def refresh(self, obj):
                pass
        
        # Create a mock object to test with
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
        
        print("Testing location data population...")
        print(f"Initial object: {obj.__dict__}")
        
        # Test populate_location_data function
        populate_location_data(db, obj)
        
        print(f"After population: {obj.__dict__}")
        print("Location data population test completed!")
        
        return True
    except Exception as e:
        print(f"Error testing location data population: {e}")
        return False

if __name__ == "__main__":
    print("Testing location data population...")
    
    if test_location_population():
        print("Location data population test completed!")
    else:
        print("Location data population test failed!")
        sys.exit(1)