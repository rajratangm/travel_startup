# app/routes/chatbot.py

from fastapi import APIRouter
from app.schemas.query_schema import ChatQuery
from app.services.rag_engine import handle_query

router = APIRouter()

@router.post("/")
async def chat(query: ChatQuery):
    response = handle_query(query)
    return {"response": response}
