from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User

router = APIRouter()

@router.get("/{code}")
def get_referral(code: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.referral_code == code).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid referral code")
    user.referral_count += 1
    db.commit()
    return {"message": "Referral tracked", "referral_count": user.referral_count}