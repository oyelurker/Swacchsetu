#!/usr/bin/env python3
"""
Script to alter the users table schema and update the enum values
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine
from sqlalchemy import text

def alter_users_table_schema():
    """Alter the users table to update the enum values"""
    with engine.connect() as connection:
        try:
            # First, update existing 'farmer' values to 'buyer'
            print("Updating existing 'farmer' values to 'buyer'...")
            update_result = connection.execute(text("UPDATE users SET role = 'buyer' WHERE role = 'farmer'"))
            print(f"Updated {update_result.rowcount} rows")
            
            # Then, alter the table to change the enum definition
            print("Altering table schema to update enum values...")
            alter_result = connection.execute(text("ALTER TABLE users MODIFY COLUMN role ENUM('household', 'business', 'composter', 'buyer')"))
            print("Table schema altered successfully!")
            
            connection.commit()
            
        except Exception as e:
            print(f"Error altering schema: {e}")
            connection.rollback()

if __name__ == "__main__":
    print("Starting schema alteration...")
    alter_users_table_schema()