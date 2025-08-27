import os
import sys
from crud import pwd_context

# Get password from command line argument
if len(sys.argv) != 2:
    print("Usage: python verify_password.py <password>")
    sys.exit(1)

password = sys.argv[1]

# Hashed password from the database (from the previous check)
hashed_password = "$2b$12$FsEHqyLiwCR7LSZBgnXNk.QtYVr8v6zsgL9.xYF9Dszo3qlASqjhO"

# Verify the password
if pwd_context.verify(password, hashed_password):
    print("Password is correct!")
else:
    print("Password is incorrect!")