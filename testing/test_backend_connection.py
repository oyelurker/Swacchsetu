import requests

# Test if the backend is running
try:
    response = requests.get("http://localhost:8000/")
    print(f"Status code: {response.status_code}")
    print(f"Response text: {response.text}")
    print(f"Response headers: {response.headers}")
except Exception as e:
    print(f"Error connecting to backend: {e}")
    
    # Try to get more details about the error
    try:
        response = requests.get("http://localhost:8000/", timeout=5)
    except requests.exceptions.ConnectionError as ce:
        print(f"Connection error: {ce}")
    except requests.exceptions.Timeout as te:
        print(f"Timeout error: {te}")
    except Exception as e:
        print(f"Other error: {e}")