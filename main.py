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
def seed_data(db):
    if db.query(Club).count() == 0:
        clubs = [
            Club(name="Google Developer Student Club", description="Build with Google tech", category="Tech", join_link="https://chat.whatsapp.com/example1", logo_url=""),
            Club(name="IEEE Student Branch", description="Engineering excellence", category="Tech", join_link="https://chat.whatsapp.com/example2", logo_url=""),
            Club(name="Rotaract Club", description="Community service and leadership", category="Social", join_link="https://chat.whatsapp.com/example3", logo_url=""),
            Club(name="Photography Club", description="Capture moments, tell stories", category="Arts", join_link="https://chat.whatsapp.com/example4", logo_url=""),
        ]
        db.add_all(clubs)
        db.commit()

from database import SessionLocal
db = SessionLocal()
try:
    seed_data(db)
except:
    pass
finally:
    db.close()

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