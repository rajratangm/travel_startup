# app/services/rag_engine.py

from app.services.retriever import retrieve_context
from app.services.generator import generate_response
from app.services.web_search import fetch_from_web

def handle_query(query):
    """
    Main RAG pipeline:
    1. Tries to retrieve relevant context from vector DB
    2. Falls back to web search if no relevant context found
    3. Passes context + question to LLM to generate a response
    """
    question = query.question

    # Step 1: Retrieve from embeddings (vector DB)
    context = retrieve_context(question)

    # Step 2: Optional fallback to web if context is missing
    if not context or len(context) == 0:
        context = fetch_from_web(question)

    # Step 3: Generate final response from LLM
    response = generate_response(question, context)

    return response
