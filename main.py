from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import auth, events, clubs, referral, kai

app = FastAPI(title="Kai Campus API")

@app.on_event("startup")
def startup_event():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Warning: Could not initialize database on startup: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(events.router, prefix="/events")
app.include_router(clubs.router, prefix="/clubs")
app.include_router(referral.router, prefix="/referral")
app.include_router(kai.router, prefix="/kai")

@app.get("/")
def root():
    return {"message": "Kai Campus API is live 🚀"}