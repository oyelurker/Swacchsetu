import sys
import os

# Add the parent directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def test_frontend_integration():
    """Test that the frontend can communicate with the backend"""
    try:
        import requests
        import json
        
        # Test the waste listing creation
        def test_waste_listing_creation():
            base_url = "http://localhost:8000"
            
            # First, register a user
            register_data = {
                "email": "frontend_test@example.com",
                "password": "testpassword",
                "role": "household",
                "location": "Test Location",
                "address": "New Delhi, India"
            }
            
            print("Registering user...")
            response = requests.post(f"{base_url}/register/", json=register_data)
            print(f"Registration response: {response.status_code}")
            
            if response.status_code != 200:
                print("Failed to register user")
                return False
            
            # Login to get token
            print("\nLogging in...")
            login_data = {
                "username": "frontend_test@example.com",
                "password": "testpassword"
            }
            response = requests.post(f"{base_url}/token", data=login_data)
            
            if response.status_code != 200:
                print("Failed to login")
                return False
            
            token_data = response.json()
            access_token = token_data["access_token"]
            print(f"Access token obtained successfully")
            
            # Create a waste listing
            waste_listing_data = {
                "title": "Plastic Waste",
                "description": "Plastic bottles and containers",
                "quantity": 3.2,
                "waste_type": "plastic",
                "pickup_location": "Frontend Test House",
                "address": "Mumbai, India"
            }
            
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            
            print("\nCreating waste listing...")
            response = requests.post(f"{base_url}/waste-listings/", json=waste_listing_data, headers=headers)
            print(f"Waste listing creation response: {response.status_code}")
            
            if response.status_code != 200:
                print("Failed to create waste listing")
                return False
            
            # Get all waste listings
            print("\nGetting all waste listings...")
            response = requests.get(f"{base_url}/waste-listings/", headers=headers)
            print(f"Waste listings response: {response.status_code}")
            
            if response.status_code != 200:
                print("Failed to get waste listings")
                return False
                
            listings = response.json()
            print(f"Found {len(listings)} waste listings")
            
            print("\nFrontend integration test completed successfully!")
            return True
        
        return test_waste_listing_creation()
    except Exception as e:
        print(f"Error testing frontend integration: {e}")
        return False

if __name__ == "__main__":
    print("Testing frontend integration with backend...")
    
    if test_frontend_integration():
        print("Frontend integration test passed!")
    else:
        print("Frontend integration test failed!")
        sys.exit(1)