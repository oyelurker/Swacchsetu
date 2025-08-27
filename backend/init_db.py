from database import engine, Base
from models import User

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Database tables created.")
