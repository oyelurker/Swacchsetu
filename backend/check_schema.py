#!/usr/bin/env python3
"""
Script to check the users table schema
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine
from sqlalchemy import text

def check_users_table_schema():
    """Check the users table schema"""
    with engine.connect() as connection:
        try:
            result = connection.execute(text("DESCRIBE users"))
            print("Users table schema:")
            for row in result:
                print(row)
        except Exception as e:
            print(f"Error checking schema: {e}")

if __name__ == "__main__":
    check_users_table_schema()