import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000"

# Test users credentials
HOUSEHOLD_USER = {
    "email": "household_test@example.com",
    "password": "household_password",
    "role": "household"
}

BUYER_USER = {
    "email": "buyer_test@example.com",
    "password": "buyer_password",
    "role": "buyer"
}

COMPOSTER_USER = {
    "email": "composter_test@example.com",
    "password": "composter_password",
    "role": "composter"
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

def test_compost_marketplace_workflow():
    print("=== Compost Marketplace Workflow Test ===\\n")
    
    # Step 1: Register users
    print("1. Registering users...")
    
    # Register household user
    response = register_user(HOUSEHOLD_USER)
    if response.status_code == 200:
        print("   [PASS] Household user registered")
    elif response.status_code == 400 and "already registered" in response.json().get("detail", ""):
        print("   [INFO] Household user already exists")
    else:
        print(f"   [FAIL] Failed to register household user: {response.status_code} - {response.text}")
        return
    
    # Register buyer user
    response = register_user(BUYER_USER)
    if response.status_code == 200:
        print("   [PASS] Buyer user registered")
    elif response.status_code == 400 and "already registered" in response.json().get("detail", ""):
        print("   [INFO] Buyer user already exists")
    else:
        print(f"   [FAIL] Failed to register buyer user: {response.status_code} - {response.text}")
        return
    
    # Register composter user
    response = register_user(COMPOSTER_USER)
    if response.status_code == 200:
        print("   [PASS] Composter user registered")
    elif response.status_code == 400 and "already registered" in response.json().get("detail", ""):
        print("   [INFO] Composter user already exists")
    else:
        print(f"   [FAIL] Failed to register composter user: {response.status_code} - {response.text}")
        return
    
    # Step 2: Login users
    print("\\n2. Logging in users...")
    
    # Login composter
    response = login_user(COMPOSTER_USER["email"], COMPOSTER_USER["password"])
    if response.status_code == 200:
        composter_token = response.json()["access_token"]
        print("   [PASS] Composter logged in")
    else:
        print(f"   [FAIL] Failed to login composter: {response.status_code} - {response.text}")
        return
    
    # Login buyer
    response = login_user(BUYER_USER["email"], BUYER_USER["password"])
    if response.status_code == 200:
        buyer_token = response.json()["access_token"]
        print("   [PASS] Buyer logged in")
    else:
        print(f"   [FAIL] Failed to login buyer: {response.status_code} - {response.text}")
        return
    
    # Step 3: Create compost listing
    print("\\n3. Creating compost listing...")
    
    compost_listing_data = {
        "title": "Premium Organic Compost",
        "description": "High-quality organic compost made from kitchen scraps",
        "price_per_kg": 50.0,
        "quantity_available": 100.0
    }
    
    response = create_compost_listing(composter_token, compost_listing_data)
    if response.status_code == 200:
        listing_id = response.json()["id"]
        print(f"   [PASS] Compost listing created with ID: {listing_id}")
    else:
        print(f"   [FAIL] Failed to create compost listing: {response.status_code} - {response.text}")
        return
    
    # Step 4: Browse compost listings (no auth required)
    print("\\n4. Browsing compost listings (no auth required)...")
    
    response = get_compost_listings()
    if response.status_code == 200:
        listings = response.json()
        print(f"   [PASS] Found {len(listings)} compost listings")
        if len(listings) > 0:
            print(f"   [PASS] First listing: {listings[0]['title']} - Rs{listings[0]['price_per_kg']}/kg")
    else:
        print(f"   [FAIL] Failed to get compost listings: {response.status_code} - {response.text}")
        return
    
    # Step 5: Place order (buyer)
    print("\n5. Placing order as buyer...")
    
    order_data = {
        "compost_listing_id": listing_id,
        "quantity_kg": 5.0
    }
    
    response = create_order(buyer_token, order_data)
    if response.status_code == 200:
        order_id = response.json()["id"]
        total_price = response.json()["total_price"]
        print(f"   [PASS] Order placed successfully with ID: {order_id}")
        print(f"   [PASS] Total price: Rs{total_price}")
    else:
        print(f"   [FAIL] Failed to place order: {response.status_code} - {response.text}")
        return
    
    # Step 6: Check farmer's orders
    print("\\n6. Checking farmer's orders...")
    
    response = get_user_orders(buyer_token)
    if response.status_code == 200:
        orders = response.json()
        print(f"   [PASS] Farmer has {len(orders)} orders")
        if len(orders) > 0:
            print(f"   [PASS] Latest order: {orders[0]['quantity_kg']} kg - Rs{orders[0]['total_price']}")
    else:
        print(f"   [FAIL] Failed to get farmer's orders: {response.status_code} - {response.text}")
        return
    
    # Step 7: Verify listing quantity was updated
    print("\\n7. Verifying listing quantity update...")
    
    response = get_compost_listings()
    if response.status_code == 200:
        listings = response.json()
        for listing in listings:
            if listing["id"] == listing_id:
                print(f"   [PASS] Listing quantity updated from 100.0 to {listing['quantity_available']} kg")
                break
    else:
        print(f"   [FAIL] Failed to verify listing quantity: {response.status_code} - {response.text}")
        return
    
    print("\\n=== All tests passed! ===")

if __name__ == "__main__":
    test_compost_marketplace_workflow()