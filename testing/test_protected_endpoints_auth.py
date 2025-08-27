import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000"

# Test data
waste_listing_data = {
    "title": "Test Organic Waste",
    "description": "Test organic waste for authentication testing",
    "quantity": 10.0,
    "waste_type": "organic",
    "pickup_location": "Test Location"
}

compost_listing_data = {
    "title": "Test Compost",
    "description": "Test compost for authentication testing",
    "price_per_kg": 30.0,
    "quantity_available": 50.0
}

order_data = {
    "compost_listing_id": 1,
    "quantity_kg": 2.0
}

def test_protected_endpoints_without_auth():
    """Test that protected endpoints require authentication"""
    print("=== Protected Endpoints Authentication Test ===\n")
    
    # Test creating waste listing without auth
    print("1. Testing waste listing creation without auth...")
    response = requests.post(f"{BASE_URL}/waste-listings/", json=waste_listing_data)
    if response.status_code == 401:
        print("   [PASS] Waste listing creation correctly requires authentication")
    else:
        print(f"   [FAIL] Expected 401, got {response.status_code}: {response.text}")
    
    # Test creating compost listing without auth
    print("\n2. Testing compost listing creation without auth...")
    response = requests.post(f"{BASE_URL}/compost-listings/", json=compost_listing_data)
    if response.status_code == 401:
        print("   [PASS] Compost listing creation correctly requires authentication")
    else:
        print(f"   [FAIL] Expected 401, got {response.status_code}: {response.text}")
    
    # Test creating order without auth
    print("\n3. Testing order creation without auth...")
    response = requests.post(f"{BASE_URL}/orders/", json=order_data)
    if response.status_code == 401:
        print("   [PASS] Order creation correctly requires authentication")
    else:
        print(f"   [FAIL] Expected 401, got {response.status_code}: {response.text}")
    
    print("\n=== Test completed ===")

if __name__ == "__main__":
    test_protected_endpoints_without_auth()