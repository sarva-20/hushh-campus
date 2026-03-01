from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    referral_code = Column(String, unique=True)
    referral_count = Column(Integer, default=0)

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    venue = Column(String)
    event_time = Column(DateTime)
    join_link = Column(String)
    created_by = Column(Integer, ForeignKey("users.id"))

class Club(Base):
    __tablename__ = "clubs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    category = Column(String)
    join_link = Column(String)
    logo_url = Column(String)