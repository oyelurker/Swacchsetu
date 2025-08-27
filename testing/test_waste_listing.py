import requests
import json

# Test the waste listing creation
def test_waste_listing_creation():
    # First, register a user
    register_data = {
        "email": "test2@example.com",
        "password": "testpassword",
        "role": "household",
        "location": "Test Location",
        "address": "New Delhi, India"
    }
    
    print("Registering user...")
    response = requests.post("http://localhost:8000/register/", json=register_data)
    print(f"Registration response: {response.status_code}")
    print(f"Registration response body: {response.json()}")
    
    if response.status_code != 200:
        print("Failed to register user")
        return
    
    # Login to get token
    print("\nLogging in...")
    login_data = {
        "username": "test2@example.com",
        "password": "testpassword"
    }
    response = requests.post("http://localhost:8000/token", data=login_data)
    print(f"Login response: {response.status_code}")
    
    if response.status_code != 200:
        print("Failed to login")
        return
    
    token_data = response.json()
    access_token = token_data["access_token"]
    print(f"Access token: {access_token}")
    
    # Create a waste listing
    waste_listing_data = {
        "title": "Organic Waste",
        "description": "Kitchen waste",
        "quantity": 5.5,
        "waste_type": "organic",
        "pickup_location": "My House",
        "address": "New Delhi, India"
    }
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    print("\nCreating waste listing...")
    response = requests.post("http://localhost:8000/waste-listings/", json=waste_listing_data, headers=headers)
    print(f"Waste listing creation response: {response.status_code}")
    print(f"Waste listing creation response body: {response.json()}")
    
    if response.status_code != 200:
        print("Failed to create waste listing")
        return
    
    # Get all waste listings
    print("\nGetting all waste listings...")
    response = requests.get("http://localhost:8000/waste-listings/", headers=headers)
    print(f"Waste listings response: {response.status_code}")
    print(f"Waste listings response body: {response.json()}")
    
    print("\nTest completed!")

if __name__ == "__main__":
    test_waste_listing_creation()