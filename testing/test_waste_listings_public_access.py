import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000"

def get_waste_listings():
    """Get all waste listings (no auth required)"""
    response = requests.get(f"{BASE_URL}/waste-listings/")
    return response

def test_waste_listings_public_access():
    print("=== Waste Listings Public Access Test ===\n")
    
    # Test browsing waste listings without authentication
    print("1. Browsing waste listings (no auth required)...")
    
    response = get_waste_listings()
    if response.status_code == 200:
        listings = response.json()
        print(f"   [PASS] Found {len(listings)} waste listings")
        if len(listings) > 0:
            print(f"   [PASS] First listing: {listings[0]['title']} - {listings[0]['quantity']} kg")
    else:
        print(f"   [FAIL] Failed to get waste listings: {response.status_code} - {response.text}")
        return
    
    print("\n=== Test completed successfully! ===")

if __name__ == "__main__":
    test_waste_listings_public_access()