#!/usr/bin/env python3
"""
Direct SQL migration script to update 'farmer' role to 'buyer' in the database.
This script uses raw SQL to bypass SQLAlchemy enum validation issues.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine
from sqlalchemy import text

def migrate_farmer_to_buyer_direct_sql():
    """Migrate all users with role 'farmer' to role 'buyer' using raw SQL"""
    # Create a connection
    with engine.connect() as connection:
        try:
            # Count how many users have role 'farmer'
            count_query = text("SELECT COUNT(*) FROM users WHERE role = :old_role")
            result = connection.execute(count_query, {"old_role": "farmer"})
            count = result.scalar()
            
            print(f"Found {count} users with role 'farmer'")
            
            if count > 0:
                # Update users with role 'farmer' to 'buyer'
                update_query = text("UPDATE users SET role = :new_role WHERE role = :old_role")
                connection.execute(update_query, {"new_role": "buyer", "old_role": "farmer"})
                connection.commit()
                print("Migration completed successfully!")
                print(f"Updated {count} users from 'farmer' to 'buyer'")
            else:
                print("No users with role 'farmer' found. Nothing to migrate.")
                
        except Exception as e:
            print(f"Error during migration: {e}")
            connection.rollback()

if __name__ == "__main__":
    print("Starting direct SQL migration from 'farmer' to 'buyer'...")
    migrate_farmer_to_buyer_direct_sql()