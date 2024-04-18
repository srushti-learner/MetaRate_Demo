from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_URL = "mysql://YOUR_USERNAME:YOUR_PASSWORD@localhost:3305/YOUR_DATABASE_NAME"

engine=create_engine(DB_URL)

Base=declarative_base()

SessionLocal = sessionmaker(autocommit=False, bind=engine)
