import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_geocoding():
    """Test the geocoding service"""
    try:
        from backend.services.geocoding import get_coordinates_from_address, reverse_geocode
        
        # Test forward geocoding (address to coordinates)
        address = "New Delhi, India"
        coordinates = get_coordinates_from_address(address)
        
        if coordinates:
            print(f"Coordinates for '{address}': {coordinates}")
            
            # Test reverse geocoding (coordinates to address)
            lat, lng = coordinates
            address_details = reverse_geocode(lat, lng)
            
            if address_details:
                print(f"Reverse geocoded address details: {address_details}")
            else:
                print("Failed to reverse geocode coordinates")
        else:
            print(f"Failed to geocode address: {address}")
            
        return True
    except Exception as e:
        print(f"Error testing geocoding service: {e}")
        return False

if __name__ == "__main__":
    print("Testing geocoding service...")
    
    if test_geocoding():
        print("Geocoding test completed!")
    else:
        print("Geocoding test failed!")
        sys.exit(1)