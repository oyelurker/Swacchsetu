from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from passlib.context import CryptContext
# Import models and schemas first
import models, schemas
# Import the matching service
from services.matching import get_recommended_composters as service_get_recommended_composters
# Import the location service
from services.location import populate_location_data

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        role=user.role,
        location=user.location,
        address=user.address,
        city=user.city,
        state=user.state,
        country=user.country,
        latitude=user.latitude,
        longitude=user.longitude
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # If user provided an address, populate location data automatically
    if user.address:
        populate_location_data(db, db_user)
    
    return db_user

def create_waste_listing(db: Session, waste_listing: schemas.WasteListingCreate, owner_id: int):
    db_waste_listing = models.WasteListing(
        **waste_listing.dict(), 
        owner_id=owner_id
    )
    db.add(db_waste_listing)
    db.commit()
    db.refresh(db_waste_listing)
    
    # If waste listing has an address, populate location data automatically
    if waste_listing.address:
        populate_location_data(db, db_waste_listing)
    
    return db_waste_listing

def get_waste_listings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.WasteListing).offset(skip).limit(limit).all()

def assign_composter_to_waste_listing(db: Session, waste_listing_id: int, composter_id: int):
    db_waste_listing = db.query(models.WasteListing).filter(models.WasteListing.id == waste_listing_id).first()
    if db_waste_listing:
        db_waste_listing.composter_id = composter_id
        db_waste_listing.status = models.WasteListingStatus.PENDING_PICKUP
        db.commit()
        db.refresh(db_waste_listing)
        return db_waste_listing
    return None

def update_waste_listing_status(db: Session, waste_listing_id: int, status: models.WasteListingStatus):
    db_waste_listing = db.query(models.WasteListing).filter(models.WasteListing.id == waste_listing_id).first()
    if db_waste_listing:
        db_waste_listing.status = status
        db.commit()
        db.refresh(db_waste_listing)
        return db_waste_listing
    return None

def get_household_stats(db: Session, user_id: int):
    total_listings = db.query(models.WasteListing).filter(models.WasteListing.owner_id == user_id).count()
    total_quantity = db.query(func.sum(models.WasteListing.quantity)).filter(models.WasteListing.owner_id == user_id).scalar() or 0
    return {"total_listings": total_listings, "total_quantity": total_quantity}

def get_business_stats(db: Session, user_id: int):
    total_listings = db.query(models.WasteListing).filter(models.WasteListing.owner_id == user_id).count()
    total_quantity = db.query(func.sum(models.WasteListing.quantity)).filter(models.WasteListing.owner_id == user_id).scalar() or 0
    return {"total_listings": total_listings, "total_quantity": total_quantity}

def get_composter_stats(db: Session, user_id: int):
    total_listings = db.query(models.WasteListing).filter(models.WasteListing.composter_id == user_id).count()
    total_quantity = db.query(func.sum(models.WasteListing.quantity)).filter(models.WasteListing.composter_id == user_id).scalar() or 0
    return {"total_listings": total_listings, "total_quantity": total_quantity}

def get_buyer_stats(db: Session, user_id: int):
    total_orders = db.query(models.Order).filter(models.Order.buyer_id == user_id).count()
    total_quantity = db.query(func.sum(models.Order.quantity_kg)).filter(models.Order.buyer_id == user_id).scalar() or 0
    return {"total_orders": total_orders, "total_quantity": total_quantity}

def create_compost_listing(db: Session, compost_listing: schemas.CompostMarketplaceCreate, seller_id: int):
    db_compost_listing = models.CompostMarketplace(**compost_listing.dict(), seller_id=seller_id)
    db.add(db_compost_listing)
    db.commit()
    db.refresh(db_compost_listing)
    return db_compost_listing

def get_compost_listings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CompostMarketplace).offset(skip).limit(limit).all()

def create_order(db: Session, order: schemas.OrderCreate, buyer_id: int):
    compost_listing = db.query(models.CompostMarketplace).filter(models.CompostMarketplace.id == order.compost_listing_id).first()
    if not compost_listing:
        raise HTTPException(status_code=404, detail="Compost listing not found")
    if compost_listing.quantity_available < order.quantity_kg:
        raise HTTPException(status_code=400, detail="Not enough quantity available")

    total_price = compost_listing.price_per_kg * order.quantity_kg
    db_order = models.Order(
        **order.dict(),
        buyer_id=buyer_id,
        total_price=total_price,
        status="pending"
    )
    compost_listing.quantity_available -= order.quantity_kg
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_user_orders(db: Session, user_id: int):
    return db.query(models.Order).filter(models.Order.buyer_id == user_id).all()

def get_recommended_composters(db: Session, waste_listing_id: int):
    waste_listing = db.query(models.WasteListing).filter(models.WasteListing.id == waste_listing_id).first()
    if not waste_listing:
        raise HTTPException(status_code=404, detail="Waste listing not found")

    # Use the smart matching service
    return service_get_recommended_composters(db, waste_listing_id)

def get_next_order_id(db: Session) -> int:
    """
    Gets the next available order ID.
    """
    last_order = db.query(models.Order).order_by(models.Order.id.desc()).first()
    if last_order:
        return last_order.id + 1
    return 1

def get_global_stats(db: Session):
    """
    Get global platform statistics
    """
    # Total users
    total_users = db.query(models.User).count()
    
    # Total waste listings
    total_waste_listings = db.query(models.WasteListing).count()
    
    # Total compost listings
    total_compost_listings = db.query(models.CompostMarketplace).count()
    
    # Total orders
    total_orders = db.query(models.Order).count()
    
    # Total waste quantity (sum of all waste listings)
    total_waste_quantity = db.query(func.sum(models.WasteListing.quantity)).scalar() or 0
    
    # Total compost quantity ordered
    total_compost_quantity = db.query(func.sum(models.Order.quantity_kg)).scalar() or 0
    
    # Estimate CO2 saved (assuming 1kg organic waste = 1kg CO2 saved)
    co2_saved = total_waste_quantity
    
    return {
        "total_users": total_users,
        "total_waste_listings": total_waste_listings,
        "total_compost_listings": total_compost_listings,
        "total_orders": total_orders,
        "total_waste_quantity_kg": round(total_waste_quantity, 2),
        "total_compost_quantity_kg": round(total_compost_quantity, 2),
        "co2_saved_kg": round(co2_saved, 2)
    }

