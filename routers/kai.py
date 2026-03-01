from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Event, Club
from schemas import KaiChat
import google.generativeai as genai
import os

router = APIRouter()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

@router.post("/chat")
def kai_chat(data: KaiChat, db: Session = Depends(get_db)):
    events = db.query(Event).all()
    clubs = db.query(Club).all()
    
    context = f"""You are Kai, a campus assistant for KPRIET college.
    
Current Events: {[{"title": e.title, "venue": e.venue, "time": str(e.event_time)} for e in events]}
Clubs: {[{"name": c.name, "category": c.category, "description": c.description} for c in clubs]}

Answer the student's question helpfully and concisely."""

    response = model.generate_content(f"{context}\n\nStudent: {data.message}")
    return {"response": response.text}

@router.post("/recommend")
def recommend_clubs(data: KaiChat, db: Session = Depends(get_db)):
    clubs = db.query(Club).all()
    
    context = f"""You are Kai, a campus assistant for KPRIET college.
Available clubs: {[{"name": c.name, "category": c.category, "description": c.description} for c in clubs]}

Based on the student's interests, recommend 2-3 clubs from the list above.
Reply in this exact JSON format only:
{{"recommendations": [{{"name": "club name", "reason": "one line reason"}}]}}"""

    response = model.generate_content(f"{context}\n\nStudent interests: {data.message}")
    return {"response": response.text}