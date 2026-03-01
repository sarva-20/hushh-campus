from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Club
from schemas import ClubOut
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ClubOut])
def get_clubs(db: Session = Depends(get_db)):
    return db.query(Club).all()

@router.get("/{club_id}", response_model=ClubOut)
def get_club(club_id: int, db: Session = Depends(get_db)):
    return db.query(Club).filter(Club.id == club_id).first()