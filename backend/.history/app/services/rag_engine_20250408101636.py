# app/services/rag_engine.py

from app.services.retriever import retrieve_context
from app.services.generator import generate_response
from app.services.web_search import fetch_from_web


def handle_query(query):
    question = query.question

    # Step 1: Let the LLM decide data sources required for this question
    source_plan = decide_retrieval_plan(question)

    # Step 2: Fetch relevant info based on the plan
    context_parts = []

    if "vector" in source_plan:
        context_parts += retrieve_from_vector_db(question)

    if "sql" in source_plan:
        context_parts += retrieve_from_sql(question)

    if "web" in source_plan:
        context_parts += fetch_from_web(question)

    # Step 3: Final answer from LLM using aggregated context
    final_response = generate_response(question, context_parts)

    return final_response
