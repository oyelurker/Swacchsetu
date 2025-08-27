import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_waste_listing_with_location():
    """Test waste listing creation with location data population"""
    try:
        # Import required modules
        from backend import models, schemas, database
        from backend.crud import create_waste_listing, create_user
        import time
        
        # Create a database session
        db = database.SessionLocal()
        
        # Create a test user first
        # Check if user already exists
        user = db.query(models.User).filter(models.User.email == "location_test@example.com").first()
        if not user:
            user_data = schemas.UserCreate(
                email="location_test@example.com",
                password="testpassword",
                role="household",
                location="Test Location",
                address="New Delhi, India"
            )
            user = create_user(db, user_data)
            print(f"Created user with ID: {user.id}")
        else:
            print(f"Using existing user with ID: {user.id}")
        
        # Create a waste listing with address
        waste_listing_data = schemas.WasteListingCreate(
            title="Test Waste with Location",
            description="Testing location data population",
            quantity=2.5,
            waste_type="organic",
            pickup_location="Test House",
            address="New Delhi, India"
        )
        
        print("Creating waste listing...")
        waste_listing = create_waste_listing(db, waste_listing_data, user.id)
        print(f"Created waste listing with ID: {waste_listing.id}")
        
        # Wait a moment for the location data to be populated
        time.sleep(2)
        
        # Refresh the object to get updated data
        db.refresh(waste_listing)
        
        print(f"Waste listing details:")
        print(f"  ID: {waste_listing.id}")
        print(f"  Title: {waste_listing.title}")
        print(f"  Address: {waste_listing.address}")
        print(f"  City: {waste_listing.city}")
        print(f"  State: {waste_listing.state}")
        print(f"  Country: {waste_listing.country}")
        print(f"  Latitude: {waste_listing.latitude}")
        print(f"  Longitude: {waste_listing.longitude}")
        print(f"  Pickup Location: {waste_listing.pickup_location}")
        
        # Close the database session
        db.close()
        
        print("\nWaste listing with location test completed!")
        return True
    except Exception as e:
        print(f"Error testing waste listing with location: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Testing waste listing creation with location data...")
    
    if test_waste_listing_with_location():
        print("Waste listing with location test passed!")
    else:
        print("Waste listing with location test failed!")
        sys.exit(1)