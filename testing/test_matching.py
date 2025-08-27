import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_imports():
    """Test that we can import our matching module without errors"""
    try:
        from backend.services import matching
        print("Successfully imported matching module")
        return True
    except Exception as e:
        print(f"Failed to import matching module: {e}")
        return False

def test_algorithm_logic():
    """Test the core logic of our matching algorithm"""
    # Mock classes for testing
    class MockWasteType:
        ORGANIC = "organic"
        
    class MockWasteListingStatus:
        PENDING_PICKUP = "pending_pickup"
        AVAILABLE = "available"
        
    class MockUser:
        def __init__(self, email, role, location, id, latitude=None, longitude=None, city=None, state=None):
            self.email = email
            self.role = role
            self.location = location
            self.id = id
            self.latitude = latitude
            self.longitude = longitude
            self.city = city
            self.state = state
            
    class MockWasteListing:
        def __init__(self, waste_type, pickup_location, latitude=None, longitude=None, city=None, state=None):
            self.waste_type = waste_type
            self.pickup_location = pickup_location
            self.latitude = latitude
            self.longitude = longitude
            self.city = city
            self.state = state
            
    # Test data with coordinates
    waste_listing = MockWasteListing(
        waste_type=MockWasteType.ORGANIC,
        pickup_location="Delhi",
        latitude=28.6139,
        longitude=77.2090,
        city="Delhi",
        state="Delhi"
    )
    
    composter1 = MockUser(
        email="composter1@example.com",
        role="composter",
        location="Delhi",
        id=1,
        latitude=28.6139,
        longitude=77.2090,
        city="Delhi",
        state="Delhi"
    )
    
    composter2 = MockUser(
        email="composter2@example.com",
        role="composter",
        location="Mumbai",
        id=2,
        latitude=19.0760,
        longitude=72.8777,
        city="Mumbai",
        state="Maharashtra"
    )
    
    # Test the scoring function directly
    from backend.services.matching import ComposterMatcher
    
    # Create a mock database session that returns predefined data
    class MockDB:
        def query(self, model):
            return MockQuery(model)
            
    class MockQuery:
        def __init__(self, model):
            self.model = model
            
        def filter(self, *args):
            return self
            
        def count(self):
            # For testing, return a small number
            return 3
            
        def first(self):
            return None
            
        def all(self):
            if self.model.__name__ == "User":
                return [composter1, composter2]
            return []
    
    # Create an instance of our matcher
    matcher = ComposterMatcher(MockDB())
    
    # Test the scoring function
    score1 = matcher._calculate_match_score(waste_listing, composter1)
    score2 = matcher._calculate_match_score(waste_listing, composter2)
    
    print(f"Score for composter in same location: {score1}")
    print(f"Score for composter in different location: {score2}")
    
    # The composter in the same location should have a higher score
    assert score1 > score2, "Composter in same location should have higher score"
    
    # Test with city matching (no coordinates)
    waste_listing_no_coords = MockWasteListing(
        waste_type=MockWasteType.ORGANIC,
        pickup_location="Delhi",
        city="Delhi",
        state="Delhi"
    )
    
    composter_no_coords = MockUser(
        email="composter3@example.com",
        role="composter",
        location="Delhi",
        id=3,
        city="Delhi",
        state="Delhi"
    )
    
    score3 = matcher._calculate_match_score(waste_listing_no_coords, composter_no_coords)
    print(f"Score for composter with city matching: {score3}")
    
    # Should still get a high score
    assert score3 >= 50, "Composter in same city should get high score"
    
    print("Algorithm logic test passed!")
    return True

if __name__ == "__main__":
    print("Running tests for matching algorithm...")
    
    if test_imports() and test_algorithm_logic():
        print("All tests passed!")
    else:
        print("Some tests failed!")
        sys.exit(1)