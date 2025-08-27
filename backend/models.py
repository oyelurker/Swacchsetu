import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Role(str, enum.Enum):
    household = "household"
    business = "business"
    composter = "composter"
    buyer = "buyer"

class WasteListingStatus(str, enum.Enum):
    AVAILABLE = "available"
    PENDING_PICKUP = "pending_pickup"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class WasteType(str, enum.Enum):
    ORGANIC = "organic"
    PLASTIC = "plastic"
    PAPER = "paper"
    GLASS = "glass"
    METAL = "metal"
    OTHER = "other"

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    is_active = Column(Boolean, default=True)
    role = Column(Enum(Role))
    location = Column(String(255), nullable=True)
    # More detailed location information
    address = Column(String(512), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Removing relationships that are causing issues
    # waste_listings = relationship("WasteListing", back_populates="owner")
    # composted_listings = relationship("WasteListing", back_populates="composter")
    # compost_listings = relationship("CompostMarketplace", back_populates="seller")
    # orders = relationship("Order", back_populates="buyer")

class WasteListing(Base):
    __tablename__ = "waste_listings"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String(1024))
    quantity = Column(Float) # in kg
    waste_type = Column(Enum(WasteType))
    pickup_location = Column(String(255))
    # More detailed location information
    address = Column(String(512), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    status = Column(Enum(WasteListingStatus), default=WasteListingStatus.AVAILABLE)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner_id = Column(Integer, ForeignKey("users.id"))
    composter_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Removing relationships that are causing issues
    # owner = relationship("User", back_populates="waste_listings")
    # composter = relationship("User", back_populates="composted_listings")

class CompostMarketplace(Base):
    __tablename__ = "compost_marketplace"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String(1024))
    price_per_kg = Column(Float)
    quantity_available = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    seller_id = Column(Integer, ForeignKey("users.id"))

    # Removing relationships that are causing issues
    # seller = relationship("User", back_populates="compost_listings")
    # orders = relationship("Order", back_populates="compost_listing")

class Order(Base):
    __tablename__ = "orders"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    compost_listing_id = Column(Integer, ForeignKey("compost_marketplace.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    quantity_kg = Column(Float)
    total_price = Column(Float)
    status = Column(String(50))  # pending, completed, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Removing relationships that are causing issues
    # compost_listing = relationship("CompostMarketplace", back_populates="orders")
    # buyer = relationship("User", back_populates="orders")