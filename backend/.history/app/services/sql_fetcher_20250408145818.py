# app/services/sql_fetcher.py

from sqlalchemy import create_engine, text
from app.config import SQLALCHEMY_DATABASE_URI
import logging

# Set up SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URI)



def retrieve_from_sql(query_text: str) -> list:
    """
    Retrieve structured data from SQL database based on the user query.
    You may want to first prompt the LLM to generate SQL.
    This example assumes a pre-defined SQL based on heuristic matching.
    """

    try:
        # Example keyword mapping (replace with LLM-generated SQL if needed)
        if "flight" in query_text.lower():
            sql_query = "SELECT airline, origin, destination, price, departure_time FROM flights LIMIT 5"

        elif "train" in query_text.lower():
            sql_query = "SELECT train_name, origin, destination, price, departure_time FROM trains LIMIT 5"

        elif "hotel" in query_text.lower():
            sql_query = "SELECT name, location, price_per_night, rating FROM hotels LIMIT 5"

        else:
            # Fallback generic search (ideally use LLM to craft the SQL)
            sql_query = "SELECT * FROM travel_info LIMIT 5"

        with engine.connect() as connection:
            result = connection.execute(text(sql_query))
            rows = result.fetchall()

        # Format rows into readable strings
        # print("[✅ SQL DATA]:", data)  # 👈 Debug Print

        # return [str(dict(row._mapping)) for row in rows]

    except Exception as e:
        logging.error(f"[SQL Fetch Error] {e}")
        return []
