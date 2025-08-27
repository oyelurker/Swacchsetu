# SwacchSetu - Complete Platform Workflow Test

import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000"

# Test users credentials
HOUSEHOLD_USER = {
    "email": "household_complete_test@example.com",
    "password": "household_password",
    "role": "household"
}

BUSINESS_USER = {
    "email": "business_complete_test@example.com",
    "password": "business_password",
    "role": "business"
}

COMPOSTER_USER = {
    "email": "composter_complete_test@example.com",
    "password": "composter_password",
    "role": "composter"
}

FARMER_USER = {
    "email": "farmer_complete_test@example.com",
    "password": "farmer_password",
    "role": "farmer"
}

def register_user(user_data):
    """Register a new user"""
    response = requests.post(f"{BASE_URL}/register/", json=user_data)
    return response

def login_user(email, password):
    """Login user and return token"""
    response = requests.post(
        f"{BASE_URL}/token",
        data={
            "username": email,
            "password": password
        }
    )
    return response

def create_waste_listing(token, listing_data):
    """Create a waste listing"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/waste-listings/", json=listing_data, headers=headers)
    return response

def get_waste_listings():
    """Get all waste listings (no auth required)"""
    response = requests.get(f"{BASE_URL}/waste-listings/")
    return response

def create_compost_listing(token, listing_data):
    """Create a compost listing"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/compost-listings/", json=listing_data, headers=headers)
    return response

def get_compost_listings():
    """Get all compost listings (no auth required)"""
    response = requests.get(f"{BASE_URL}/compost-listings/")
    return response

def create_order(token, order_data):
    """Create an order"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/orders/", json=order_data, headers=headers)
    return response

def get_user_orders(token):
    """Get user orders"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/users/me/orders", headers=headers)
    return response

def test_complete_platform_workflow():
    print("=== SwacchSetu Complete Platform Workflow Test ===\n")
    
    # Step 1: Register all users
    print("1. Registering all user types...")
    
    users = [HOUSEHOLD_USER, BUSINESS_USER, COMPOSTER_USER, FARMER_USER]
    tokens = {}
    
    for user in users:
        response = register_user(user)
        if response.status_code == 200:
            print(f"   [PASS] {user['role'].title()} user registered")
        elif response.status_code == 400 and "already registered" in response.json().get("detail", ""):
            print(f"   [INFO] {user['role'].title()} user already exists")
        else:
            print(f"   [FAIL] Failed to register {user['role']} user: {response.status_code} - {response.text}")
            return
    
    # Step 2: Login all users
    print("\n2. Logging in all users...")
    
    user_credentials = [
        (HOUSEHOLD_USER["email"], HOUSEHOLD_USER["password"], "household"),
        (BUSINESS_USER["email"], BUSINESS_USER["password"], "business"),
        (COMPOSTER_USER["email"], COMPOSTER_USER["password"], "composter"),
        (FARMER_USER["email"], FARMER_USER["password"], "farmer")
    ]
    
    for email, password, role in user_credentials:
        response = login_user(email, password)
        if response.status_code == 200:
            tokens[role] = response.json()["access_token"]
            print(f"   [PASS] {role.title()} logged in")
        else:
            print(f"   [FAIL] Failed to login {role}: {response.status_code} - {response.text}")
            return
    
    # Step 3: Create waste listing (household)
    print("\n3. Creating waste listing (household)...")
    
    waste_listing_data = {
        "title": "Organic Kitchen Waste",
        "description": "Daily kitchen scraps for composting",
        "quantity": 5.0,
        "waste_type": "organic",
        "pickup_location": "House Address"
    }
    
    response = create_waste_listing(tokens["household"], waste_listing_data)
    if response.status_code == 200:
        waste_listing_id = response.json()["id"]
        print(f"   [PASS] Waste listing created with ID: {waste_listing_id}")
    else:
        print(f"   [FAIL] Failed to create waste listing: {response.status_code} - {response.text}")
        return
    
    # Step 4: Create compost listing (composter)
    print("\n4. Creating compost listing (composter)...")
    
    compost_listing_data = {
        "title": "Premium Organic Compost",
        "description": "High-quality organic compost made from kitchen scraps",
        "price_per_kg": 50.0,
        "quantity_available": 100.0
    }
    
    response = create_compost_listing(tokens["composter"], compost_listing_data)
    if response.status_code == 200:
        compost_listing_id = response.json()["id"]
        print(f"   [PASS] Compost listing created with ID: {compost_listing_id}")
    else:
        print(f"   [FAIL] Failed to create compost listing: {response.status_code} - {response.text}")
        return
    
    # Step 5: Browse listings (no auth required)
    print("\n5. Browsing listings (no auth required)...")
    
    # Browse waste listings
    response = get_waste_listings()
    if response.status_code == 200:
        listings = response.json()
        print(f"   [PASS] Found {len(listings)} waste listings")
    else:
        print(f"   [FAIL] Failed to get waste listings: {response.status_code} - {response.text}")
        return
    
    # Browse compost listings
    response = get_compost_listings()
    if response.status_code == 200:
        listings = response.json()
        print(f"   [PASS] Found {len(listings)} compost listings")
    else:
        print(f"   [FAIL] Failed to get compost listings: {response.status_code} - {response.text}")
        return
    
    # Step 6: Place order (farmer)
    print("\n6. Placing order as farmer...")
    
    order_data = {
        "compost_listing_id": compost_listing_id,
        "quantity_kg": 5.0
    }
    
    response = create_order(tokens["farmer"], order_data)
    if response.status_code == 200:
        order_id = response.json()["id"]
        total_price = response.json()["total_price"]
        print(f"   [PASS] Order placed successfully with ID: {order_id}")
        print(f"   [PASS] Total price: Rs{total_price}")
    else:
        print(f"   [FAIL] Failed to place order: {response.status_code} - {response.text}")
        return
    
    # Step 7: Check farmer's orders
    print("\n7. Checking farmer's orders...")
    
    response = get_user_orders(tokens["farmer"])
    if response.status_code == 200:
        orders = response.json()
        print(f"   [PASS] Farmer has {len(orders)} orders")
    else:
        print(f"   [FAIL] Failed to get farmer's orders: {response.status_code} - {response.text}")
        return
    
    # Step 8: Verify authentication requirements
    print("\n8. Verifying authentication requirements...")
    
    # Test that creating listings requires auth
    response = requests.post(f"{BASE_URL}/waste-listings/", json=waste_listing_data)
    if response.status_code == 401:
        print("   [PASS] Waste listing creation correctly requires authentication")
    else:
        print(f"   [FAIL] Expected 401, got {response.status_code}")
        return
    
    response = requests.post(f"{BASE_URL}/compost-listings/", json=compost_listing_data)
    if response.status_code == 401:
        print("   [PASS] Compost listing creation correctly requires authentication")
    else:
        print(f"   [FAIL] Expected 401, got {response.status_code}")
        return
    
    response = requests.post(f"{BASE_URL}/orders/", json=order_data)
    if response.status_code == 401:
        print("   [PASS] Order creation correctly requires authentication")
    else:
        print(f"   [FAIL] Expected 401, got {response.status_code}")
        return
    
    print("\n=== All tests passed! Complete platform workflow verified ===")

if __name__ == "__main__":
    test_complete_platform_workflow()