from pydantic import BaseModel
from typing import Optional
from models import Role, WasteType, WasteListingStatus
from datetime import datetime

class UserBase(BaseModel):
    email: str
    role: Role
    location: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class WasteListingBase(BaseModel):
    title: str
    description: Optional[str] = None
    quantity: float
    waste_type: WasteType
    pickup_location: str
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class WasteListingCreate(WasteListingBase):
    pass

class WasteListing(WasteListingBase):
    id: int
    owner_id: int
    status: WasteListingStatus
    created_at: datetime

    class Config:
        from_attributes = True

class CompostMarketplaceBase(BaseModel):
    title: str
    description: Optional[str] = None
    price_per_kg: float
    quantity_available: float

class CompostMarketplaceCreate(CompostMarketplaceBase):
    pass

class CompostMarketplace(CompostMarketplaceBase):
    id: int
    seller_id: int

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    compost_listing_id: int
    quantity_kg: float

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    buyer_id: int
    total_price: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
