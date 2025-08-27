#!/usr/bin/env python3
"""
Script to alter the users table schema in steps
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine
from sqlalchemy import text

def alter_users_table_schema_in_steps():
    """Alter the users table in steps to avoid constraint issues"""
    with engine.connect() as connection:
        trans = connection.begin()
        try:
            # First, change the role column to VARCHAR to remove enum constraint
            print("Changing role column to VARCHAR...")
            connection.execute(text("ALTER TABLE users MODIFY COLUMN role VARCHAR(50)"))
            print("Role column changed to VARCHAR")
            
            # Then, update existing 'farmer' values to 'buyer'
            print("Updating existing 'farmer' values to 'buyer'...")
            update_result = connection.execute(text("UPDATE users SET role = 'buyer' WHERE role = 'farmer'"))
            print(f"Updated {update_result.rowcount} rows")
            
            # Finally, change the role column back to enum with the new values
            print("Changing role column back to ENUM with new values...")
            connection.execute(text("ALTER TABLE users MODIFY COLUMN role ENUM('household', 'business', 'composter', 'buyer')"))
            print("Role column changed back to ENUM with new values")
            
            trans.commit()
            print("Schema alteration completed successfully!")
            
        except Exception as e:
            print(f"Error altering schema: {e}")
            trans.rollback()

if __name__ == "__main__":
    print("Starting schema alteration in steps...")
    alter_users_table_schema_in_steps()