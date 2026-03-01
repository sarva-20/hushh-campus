from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class EventCreate(BaseModel):
    title: str
    description: str
    venue: str
    event_time: datetime
    join_link: str

class EventOut(BaseModel):
    id: int
    title: str
    description: str
    venue: str
    event_time: datetime
    join_link: str
    class Config:
        from_attributes = True

class ClubOut(BaseModel):
    id: int
    name: str
    description: str
    category: str
    join_link: str
    logo_url: Optional[str]
    class Config:
        from_attributes = True

class KaiChat(BaseModel):
    message: str
class ChatRequest(BaseModel):
    message: str
