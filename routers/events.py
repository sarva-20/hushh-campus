from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Event
from schemas import EventCreate, EventOut
from typing import List

router = APIRouter()

@router.get("/", response_model=List[EventOut])
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).order_by(Event.event_time).all()

@router.post("/", response_model=EventOut)
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    event = Event(**data.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: int, db: Session = Depends(get_db)):
    return db.query(Event).filter(Event.id == event_id).first()