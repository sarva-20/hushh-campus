from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import ChatRequest
from google import genai

import os

router = APIRouter()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_CONTEXT = """You are Kai, a friendly AI assistant for KPRIET college campus. 
You help students discover events, join clubs, and navigate campus life. 
Be concise, helpful, and energetic."""

@router.post("/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{SYSTEM_CONTEXT}\n\nStudent: {request.message}"
        )
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend")
async def recommend(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        prompt = f"""Based on these interests: {request.message}
        Recommend 2-3 college clubs from: GDSC, IEEE, Rotaract, Photography Club.
        Be brief and enthusiastic."""
        
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))