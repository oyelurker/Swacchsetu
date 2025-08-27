import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_complete_workflow():
    """Test the complete workflow of the application"""
    try:
        import requests
        import json
        
        base_url = "http://localhost:8000"  # Change this if you're using a different port
        
        # 1. Register a new user (household)
        print("1. Registering household user...")
        household_data = {
            "email": "complete_test_household@example.com",
            "password": "testpassword",
            "role": "household",
            "location": "Test Household Location",
            "address": "New Delhi, India"
        }
        
        response = requests.post(f"{base_url}/register/", json=household_data)
        if response.status_code != 200:
            print(f"Failed to register household user: {response.json()}")
            return False
        print("Household user registered successfully!")
        
        # 2. Login as household user
        print("\n2. Logging in as household user...")
        login_data = {
            "username": "complete_test_household@example.com",
            "password": "testpassword"
        }
        response = requests.post(f"{base_url}/token", data=login_data)
        if response.status_code != 200:
            print(f"Failed to login as household user: {response.json()}")
            return False
        household_token = response.json()["access_token"]
        print("Household user logged in successfully!")
        
        # 3. Create a waste listing
        print("\n3. Creating waste listing...")
        waste_listing_data = {
            "title": "Organic Kitchen Waste",
            "description": "Daily kitchen organic waste",
            "quantity": 4.5,
            "waste_type": "organic",
            "pickup_location": "Household Address",
            "address": "New Delhi, India"
        }
        
        headers = {
            "Authorization": f"Bearer {household_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(f"{base_url}/waste-listings/", json=waste_listing_data, headers=headers)
        if response.status_code != 200:
            print(f"Failed to create waste listing: {response.json()}")
            return False
        waste_listing_id = response.json()["id"]
        print(f"Waste listing created successfully with ID: {waste_listing_id}!")
        
        # 4. Register a composter user
        print("\n4. Registering composter user...")
        composter_data = {
            "email": "complete_test_composter@example.com",
            "password": "testpassword",
            "role": "composter",
            "location": "Test Composter Location",
            "address": "New Delhi, India"
        }
        
        response = requests.post(f"{base_url}/register/", json=composter_data)
        if response.status_code != 200:
            print(f"Failed to register composter user: {response.json()}")
            return False
        print("Composter user registered successfully!")
        
        # 5. Login as composter user
        print("\n5. Logging in as composter user...")
        login_data = {
            "username": "complete_test_composter@example.com",
            "password": "testpassword"
        }
        response = requests.post(f"{base_url}/token", data=login_data)
        if response.status_code != 200:
            print(f"Failed to login as composter user: {response.json()}")
            return False
        composter_token = response.json()["access_token"]
        print("Composter user logged in successfully!")
        
        # 6. Get recommended composters for the waste listing
        print("\n6. Getting recommended composters...")
        headers = {
            "Authorization": f"Bearer {composter_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(f"{base_url}/waste-listings/{waste_listing_id}/recommended-composters", headers=headers)
        if response.status_code != 200:
            print(f"Failed to get recommended composters: {response.json()}")
            return False
        print("Recommended composters retrieved successfully!")
        
        # 7. Create a compost listing
        print("\n7. Creating compost listing...")
        compost_listing_data = {
            "title": "Premium Organic Compost",
            "description": "High-quality organic compost from food waste",
            "price_per_kg": 15.0,
            "quantity_available": 50.0
        }
        
        headers = {
            "Authorization": f"Bearer {composter_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(f"{base_url}/compost-listings/", json=compost_listing_data, headers=headers)
        if response.status_code != 200:
            print(f"Failed to create compost listing: {response.json()}")
            return False
        compost_listing_id = response.json()["id"]
        print(f"Compost listing created successfully with ID: {compost_listing_id}!")
        
        # 8. Register a farmer user
        print("\n8. Registering farmer user...")
        farmer_data = {
            "email": "complete_test_farmer@example.com",
            "password": "testpassword",
            "role": "farmer",
            "location": "Test Farmer Location",
            "address": "New Delhi, India"
        }
        
        response = requests.post(f"{base_url}/register/", json=farmer_data)
        if response.status_code != 200:
            print(f"Failed to register farmer user: {response.json()}")
            return False
        print("Farmer user registered successfully!")
        
        # 9. Login as farmer user
        print("\n9. Logging in as farmer user...")
        login_data = {
            "username": "complete_test_farmer@example.com",
            "password": "testpassword"
        }
        response = requests.post(f"{base_url}/token", data=login_data)
        if response.status_code != 200:
            print(f"Failed to login as farmer user: {response.json()}")
            return False
        farmer_token = response.json()["access_token"]
        print("Farmer user logged in successfully!")
        
        # 10. Create an order for compost
        print("\n10. Creating order for compost...")
        order_data = {
            "compost_listing_id": compost_listing_id,
            "quantity_kg": 5.0
        }
        
        headers = {
            "Authorization": f"Bearer {farmer_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(f"{base_url}/orders/", json=order_data, headers=headers)
        if response.status_code != 200:
            print(f"Failed to create order: {response.json()}")
            return False
        order_id = response.json()["id"]
        print(f"Order created successfully with ID: {order_id}!")
        
        # 11. Get user orders
        print("\n11. Getting user orders...")
        response = requests.get(f"{base_url}/users/me/orders", headers=headers)
        if response.status_code != 200:
            print(f"Failed to get user orders: {response.json()}")
            return False
        print("User orders retrieved successfully!")
        
        print("\n" + "="*50)
        print("COMPLETE WORKFLOW TEST PASSED!")
        print("="*50)
        print("All features are working correctly:")
        print("1. User registration and authentication")
        print("2. Waste listing creation")
        print("3. Smart matching algorithm")
        print("4. Compost marketplace")
        print("5. Order management")
        print("="*50)
        
        return True
    except Exception as e:
        print(f"Error testing complete workflow: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Testing complete workflow of the application...")
    
    if test_complete_workflow():
        print("\nAll tests passed! The application is ready for demo.")
    else:
        print("\nSome tests failed!")
        sys.exit(1)