#!/usr/bin/env python3
"""
Migration script to update 'farmer' role to 'buyer' in the database.
This script updates existing user records with role='farmer' to role='buyer'.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from database import engine
from models import User
import models  # This ensures the models are created

def migrate_farmer_to_buyer():
    """Migrate all users with role 'farmer' to role 'buyer'"""
    # Create a session
    session = Session(bind=engine)
    
    try:
        # Find all users with role 'farmer'
        farmer_users = session.query(User).filter(User.role == 'farmer').all()
        
        print(f"Found {len(farmer_users)} users with role 'farmer'")
        
        if len(farmer_users) > 0:
            # Update each user's role to 'buyer'
            for user in farmer_users:
                print(f"Updating user {user.email} from 'farmer' to 'buyer'")
                user.role = 'buyer'
            
            # Commit the changes
            session.commit()
            print("Migration completed successfully!")
        else:
            print("No users with role 'farmer' found. Nothing to migrate.")
            
    except Exception as e:
        print(f"Error during migration: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    print("Starting migration from 'farmer' to 'buyer'...")
    migrate_farmer_to_buyer()