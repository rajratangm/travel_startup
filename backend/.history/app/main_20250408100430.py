# app/main.py

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chatbot

app = FastAPI(title="TripWise RAG Backend")

# CORS for allowing Streamlit frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with Streamlit URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chatbot route
app.include_router(chatbot.router, prefix="/chat", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "TripWise Backend is running"}
