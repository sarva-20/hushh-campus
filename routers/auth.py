from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserRegister, UserLogin
from passlib.context import CryptContext
from jose import jwt
import os, random, string

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12)
SECRET = os.getenv("JWT_SECRET", "kaicampussecret")

def generate_referral():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

@router.post("/register")
def register(data: UserRegister, db: Session = Depends(get_db)):
    if not data.email.endswith("@kpriet.ac.in"):
        raise HTTPException(status_code=400, detail="Only @kpriet.ac.in emails allowed")
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=data.email,
        hashed_password=pwd_context.hash(data.password),
        name=data.name,
        referral_code=generate_referral()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = jwt.encode({"sub": str(user.id)}, SECRET, algorithm="HS256")
    return {"token": token, "name": user.name, "referral_code": user.referral_code}

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not pwd_context.verify(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode({"sub": str(user.id)}, SECRET, algorithm="HS256")
    return {"token": token, "name": user.name, "referral_code": user.referral_code}