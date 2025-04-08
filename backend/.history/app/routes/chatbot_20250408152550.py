# app/routes/chatbot.py

from fastapi import APIRouter
from app.schemas.query_schema import ChatQuery
from app.services.rag_engine import handle_query
# app/routes/chatbot.py or your processing module

from app.db.db_loader import flights_db, trains_db, hotels_db

router = APIRouter()

@router.post("/")
async def chat(query: ChatQuery):
    response = await handle_query(query)
    return {"response": response}
