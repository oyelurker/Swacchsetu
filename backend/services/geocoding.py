import requests
from typing import Tuple, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables
OPENCAGE_API_KEY = os.getenv("OPENCAGE_API_KEY")

def get_coordinates_from_address(address: str) -> Optional[Tuple[float, float]]:
    """
    Get latitude and longitude coordinates from an address using OpenCage Geocoding API.
    
    Args:
        address: The address to geocode
        
    Returns:
        A tuple of (latitude, longitude) or None if geocoding failed
    """
    if not OPENCAGE_API_KEY:
        print("Warning: OPENCAGE_API_KEY not found in environment variables")
        return None
        
    try:
        # Make request to OpenCage Geocoding API
        url = f"https://api.opencagedata.com/geocode/v1/json"
        params = {
            "q": address,
            "key": OPENCAGE_API_KEY,
            "limit": 1
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data["results"]:
            # Get the first result
            result = data["results"][0]
            lat = result["geometry"]["lat"]
            lng = result["geometry"]["lng"]
            return (lat, lng)
        else:
            print(f"No results found for address: {address}")
            return None
            
    except requests.RequestException as e:
        print(f"Error making request to geocoding service: {e}")
        return None
    except KeyError as e:
        print(f"Unexpected response format from geocoding service: {e}")
        return None

def reverse_geocode(latitude: float, longitude: float) -> Optional[dict]:
    """
    Get address details from latitude and longitude coordinates using OpenCage Geocoding API.
    
    Args:
        latitude: Latitude coordinate
        longitude: Longitude coordinate
        
    Returns:
        A dictionary with address details or None if reverse geocoding failed
    """
    if not OPENCAGE_API_KEY:
        print("Warning: OPENCAGE_API_KEY not found in environment variables")
        return None
        
    try:
        # Make request to OpenCage Geocoding API
        url = f"https://api.opencagedata.com/geocode/v1/json"
        params = {
            "q": f"{latitude},{longitude}",
            "key": OPENCAGE_API_KEY,
            "limit": 1
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data["results"]:
            # Get the first result
            result = data["results"][0]
            components = result["components"]
            
            # Extract relevant address components
            address_details = {
                "city": components.get("city") or components.get("town") or components.get("village"),
                "state": components.get("state"),
                "country": components.get("country"),
                "formatted": result.get("formatted")
            }
            
            return address_details
        else:
            print(f"No results found for coordinates: {latitude}, {longitude}")
            return None
            
    except requests.RequestException as e:
        print(f"Error making request to geocoding service: {e}")
        return None
    except KeyError as e:
        print(f"Unexpected response format from geocoding service: {e}")
        return None

# Example usage:
# coordinates = get_coordinates_from_address("New Delhi, India")
# if coordinates:
#     print(f"Coordinates: {coordinates}")
#     
#     # Reverse geocode to get address details
#     address_details = reverse_geocode(coordinates[0], coordinates[1])
#     if address_details:
#         print(f"Address details: {address_details}")