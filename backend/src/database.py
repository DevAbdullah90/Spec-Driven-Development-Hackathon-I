from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from .models import Base  # Import Base from models.py

# Make DATABASE_URL optional - use SQLite in-memory if not provided
DATABASE_URL = os.getenv("DATABASE_URL") # Assuming .env will set this to postgres
# Fallback to SQLite if DATABASE_URL is not set for development/testing
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./test.db"

try:
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    # Base is now imported from models.py
    database_available = True
except Exception as e:
    print(f"Database connection failed: {e}")
    print("Running without database support")
    engine = None
    SessionLocal = None
    database_available = False

def get_db():
    if not database_available:
        return None
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()