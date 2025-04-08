# app/services/rag_engine.py

from app.services.retriever import retrieve_from_vector_db
from app.services.sql_fetcher import retrieve_from_sql
from app.services.generator import generate_response
from app.services.web_search import fetch_from_web
from app.services.retrieval_planner import decide_retrieval_plan


def handle_query(query):
    question = query.question

    # Step 1: Let the LLM decide data sources required for this question
    source_plan = decide_retrieval_plan(question)

    # Step 2: Fetch relevant info based on the plan
    context_parts = []

    if "vector" in source_plan:
        vector_data = retrieve_from_vector_db(question)
        context_parts.extend(vector_data)

    if "sql" in source_plan:
        sql_data = retrieve_from_sql(question)    print("[🗄 SQL Data]:", sql_data)

        context_parts.extend(sql_data)

    if "web" in source_plan:
        web_data = fetch_from_web(question)
        context_parts.extend(web_data)

    # Step 3: Final answer from LLM using aggregated context
    final_response = generate_response(question, context_parts)

    return final_response
