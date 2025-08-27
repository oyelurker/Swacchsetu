import sys
import os
try:
    import razorpay
    RAZORPAY_AVAILABLE = True
except ImportError:
    RAZORPAY_AVAILABLE = False
    print("Razorpay not available, continuing without payment functionality")
from dotenv import load_dotenv
from pydantic import BaseModel

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import Depends, FastAPI, HTTPException, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from fastapi.middleware.cors import CORSMiddleware

import auth, crud, models, schemas
from database import SessionLocal, engine, get_db

# Load environment variables from .env file
load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Get the frontend URL from environment variables, with localhost as fallback
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://swacchxyz.netlify.app",
    frontend_url,  # For deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Access-Control-Allow-Origin"]
)

# Initialize Razorpay client only if available
razorpay_client = None
if RAZORPAY_AVAILABLE:
    try:
        razorpay_client = razorpay.Client(
            auth=(os.getenv("RAZORPAY_KEY_ID"), os.getenv("RAZORPAY_KEY_SECRET"))
        )
    except Exception as e:
        print(f"Error initializing Razorpay client: {e}")
        razorpay_client = None
else:
    print("Razorpay not available, payment functionality disabled")

class RazorpayOrderRequest(BaseModel):
    amount: int
    currency: str = "INR"

class PaymentVerificationRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

@app.post("/create-razorpay-order")
def create_razorpay_order(order_request: RazorpayOrderRequest, db: Session = Depends(get_db)):
    if not RAZORPAY_AVAILABLE or not razorpay_client:
        raise HTTPException(status_code=500, detail="Payment functionality not available")
    try:
        order_amount = order_request.amount * 100  # Amount in paise
        order_currency = order_request.currency
        order_receipt = f"receipt_{crud.get_next_order_id(db=db)}"

        order = razorpay_client.order.create({
            "amount": order_amount,
            "currency": order_currency,
            "receipt": order_receipt,
            "payment_capture": 1
        })
        return {"order_id": order["id"], "amount": order["amount"], "currency": order["currency"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify-payment")
def verify_payment(verification_request: PaymentVerificationRequest):
    if not RAZORPAY_AVAILABLE or not razorpay_client:
        raise HTTPException(status_code=500, detail="Payment functionality not available")
    try:
        params_dict = {
            'razorpay_order_id': verification_request.razorpay_order_id,
            'razorpay_payment_id': verification_request.razorpay_payment_id,
            'razorpay_signature': verification_request.razorpay_signature
        }
        razorpay_client.utility.verify_payment_signature(params_dict)
        # Here you would typically update your database that the order is paid
        return {"status": "success", "message": "Payment verified successfully"}
    except razorpay.errors.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/register/")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = crud.create_user(db=db, user=user)
    return new_user


@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(auth.get_current_user)):
    return current_user

@app.post("/waste-listings/", response_model=schemas.WasteListing)
def create_waste_listing(
    waste_listing: schemas.WasteListingCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    return crud.create_waste_listing(
        db=db, waste_listing=waste_listing, owner_id=current_user.id
    )

@app.get("/waste-listings/", response_model=list[schemas.WasteListing])
def read_waste_listings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    waste_listings = crud.get_waste_listings(db, skip=skip, limit=limit)
    return waste_listings

@app.put("/waste-listings/{waste_listing_id}/assign-composter", response_model=schemas.WasteListing)
def assign_composter(
    waste_listing_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "composter":
        raise HTTPException(status_code=403, detail="Only composters can accept listings")
    return crud.assign_composter_to_waste_listing(
        db=db, waste_listing_id=waste_listing_id, composter_id=current_user.id
    )

@app.put("/waste-listings/{waste_listing_id}/update-status", response_model=schemas.WasteListing)
def update_status(
    waste_listing_id: int,
    status: models.WasteListingStatus,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    # Add authorization logic here to ensure only authorized users can update the status
    return crud.update_waste_listing_status(
        db=db, waste_listing_id=waste_listing_id, status=status
    )

@app.get("/users/me/household-stats")
def get_household_stats(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "household":
        raise HTTPException(status_code=403, detail="Only household users can access these stats")
    return crud.get_household_stats(db=db, user_id=current_user.id)

@app.get("/users/me/business-stats")
def get_business_stats(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "business":
        raise HTTPException(status_code=403, detail="Only business users can access these stats")
    return crud.get_business_stats(db=db, user_id=current_user.id)

@app.get("/users/me/composter-stats")
def get_composter_stats(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "composter":
        raise HTTPException(status_code=403, detail="Only composter users can access these stats")
    return crud.get_composter_stats(db=db, user_id=current_user.id)

@app.get("/users/me/buyer-stats")
def get_buyer_stats(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "buyer":
        raise HTTPException(status_code=403, detail="Only buyer users can access these stats")
    return crud.get_buyer_stats(db=db, user_id=current_user.id)

@app.post("/compost-listings/", response_model=schemas.CompostMarketplace)
def create_compost_listing(
    compost_listing: schemas.CompostMarketplaceCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "composter":
        raise HTTPException(status_code=403, detail="Only composters can create listings")
    return crud.create_compost_listing(
        db=db, compost_listing=compost_listing, seller_id=current_user.id
    )

@app.get("/compost-listings/", response_model=list[schemas.CompostMarketplace])
def read_compost_listings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    compost_listings = crud.get_compost_listings(db, skip=skip, limit=limit)
    return compost_listings

@app.post("/orders/", response_model=schemas.Order)
def create_order(
    order: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    if current_user.role != "buyer":
        raise HTTPException(status_code=403, detail="Only buyers can create orders")
    return crud.create_order(db=db, order=order, buyer_id=current_user.id)

@app.get("/users/me/orders", response_model=list[schemas.Order])
def read_user_orders(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    return crud.get_user_orders(db=db, user_id=current_user.id)

@app.get("/waste-listings/{waste_listing_id}/recommended-composters", response_model=list[schemas.User])
def get_recommended_composters(
    waste_listing_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(auth.get_current_user),
):
    return crud.get_recommended_composters(db=db, waste_listing_id=waste_listing_id)

@app.get("/global-stats")
def get_global_stats(db: Session = Depends(get_db)):
    return crud.get_global_stats(db=db)
