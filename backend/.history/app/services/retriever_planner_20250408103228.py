# # app/services/retrieval_planner.py

# from app.config import OPENAI_API_KEY
# import openai

# openai.api_key = OPENAI_API_KEY

# def decide_retrieval_plan(question: str) -> list:
#     """
#     Ask LLM what data sources are required for this question.
#     Possible sources: 'vector', 'sql', 'web'
#     """

#     prompt = f"""
#     Determine which data sources are required to answer this travel-related question.

#     Data sources:
#     - vector: for general travel/place/hotel/fellow traveler info from pre-embedded documents
#     - sql: for live data like flights, trains, bookings
#     - web: for real-time info like weather, festivals, seasonal suggestions

#     Question: "{question}"

#     Return a list of data sources in lowercase.
#     """

#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[{"role": "user", "content": prompt}]
#     )

#     sources = response.choices[0].message["content"]
#     # Parse string list -> real list
#     return [src.strip().lower() for src in sources.replace("[", "").replace("]", "").replace('"', '').split(',')]
