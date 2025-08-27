import requests
import json

# Test the register endpoint
try:
    register_data = {
        "email": "connection_test@example.com",
        "password": "testpassword",
        "role": "household",
        "location": "Test Location",
        "address": "New Delhi, India"
    }
    
    print("Testing register endpoint...")
    response = requests.post("http://localhost:8000/register/", json=register_data)
    print(f"Status code: {response.status_code}")
    print(f"Response text: {response.text}")
    
    if response.status_code == 200:
        print("Registration successful!")
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Registration failed with status code: {response.status_code}")
        try:
            print(f"Error details: {response.json()}")
        except:
            print("Could not parse error response as JSON")
            
except Exception as e:
    print(f"Error testing register endpoint: {e}")
    import traceback
    traceback.print_exc()