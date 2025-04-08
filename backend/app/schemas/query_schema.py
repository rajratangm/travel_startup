# app/schemas/query_schema.py

from pydantic import BaseModel
from typing import Optional

class ChatQuery(BaseModel):
    question: str
    user_id: Optional[str] = None  # Optional if you're tracking individual users
