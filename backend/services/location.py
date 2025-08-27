from sqlalchemy.orm import Session
# Use absolute imports instead of relative imports
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models
from services.geocoding import get_coordinates_from_address, reverse_geocode

def populate_location_data(db: Session, db_obj, address: str = None):
    """
    Automatically populate location data (coordinates, city, state, country) 
    from an address using geocoding services.
    
    Args:
        db: Database session
        db_obj: User or WasteListing object to update
        address: Address string to geocode (if not provided, uses obj.address)
    """
    # Use provided address or object's address field
    addr = address or getattr(db_obj, 'address', None)
    
    if not addr:
        return  # Nothing to geocode
    
    # Get coordinates from address
    coordinates = get_coordinates_from_address(addr)
    if coordinates:
        lat, lng = coordinates
        db_obj.latitude = lat
        db_obj.longitude = lng
        
        # Get address details from coordinates
        address_details = reverse_geocode(lat, lng)
        if address_details:
            db_obj.city = address_details.get('city')
            db_obj.state = address_details.get('state')
            db_obj.country = address_details.get('country')
            if not db_obj.pickup_location and hasattr(db_obj, 'pickup_location'):
                db_obj.pickup_location = address_details.get('formatted') or addr
            elif not db_obj.location and hasattr(db_obj, 'location'):
                db_obj.location = address_details.get('formatted') or addr
                
        # Commit changes to database
        db.commit()
        db.refresh(db_obj)

def update_user_location(db: Session, user_id: int, address: str):
    """
    Update a user's location data based on their address.
    
    Args:
        db: Database session
        user_id: ID of the user to update
        address: New address for the user
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        user.address = address
        populate_location_data(db, user, address)
        return user
    return None

def update_waste_listing_location(db: Session, listing_id: int, address: str):
    """
    Update a waste listing's location data based on its address.
    
    Args:
        db: Database session
        listing_id: ID of the waste listing to update
        address: New address for the waste listing
    """
    listing = db.query(models.WasteListing).filter(models.WasteListing.id == listing_id).first()
    if listing:
        listing.address = address
        populate_location_data(db, listing, address)
        return listing
    return None