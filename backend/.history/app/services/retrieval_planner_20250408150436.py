# # # app/services/retrieval_planner.py

# # from app.config import OPENAI_API_KEY
# # import openai

# # openai.api_key = OPENAI_API_KEY

# # def decide_retrieval_plan(question: str) -> list:
# #     """
# #     Ask LLM what data sources are required for this question.
# #     Possible sources: 'vector', 'sql', 'web'
# #     """

# #     prompt = f"""
# #     Determine which data sources are required to answer this travel-related question.

# #     Data sources:
# #     - vector: for general travel/place/hotel/fellow traveler info from pre-embedded documents
# #     - sql: for live data like flights, trains, bookings
# #     - web: for real-time info like weather, festivals, seasonal suggestions

# #     Question: "{question}"

# #     Return a list of data sources in lowercase.
# #     """

# #     response = openai.ChatCompletion.create(
# #         model="gpt-3.5-turbo",
# #         messages=[{"role": "user", "content": prompt}]
# #     )

# #     sources = response.choices[0].message["content"]
# #     # Parse string list -> real list
# #     return [src.strip().lower() for src in sources.replace("[", "").replace("]", "").replace('"', '').split(',')]

# # app/services/retrieval_planner.py

# import openai
# from app.config import OPENAI_API_KEY

# openai.api_key = OPENAI_API_KEY

# def decide_retrieval_plan(query: str) -> list:
#     """
#     LLM-powered decision maker that determines which data sources to use.
#     Returns a list like ["sql", "vector", "web"]
#     """
#     try:
#         prompt = f"""
# You are a smart query planner. Based on the user's travel-related query,
# decide which data sources are needed to answer it. Choose from:

# - vector : for general knowledge or pre-embedded documents
# - sql    : for structured data like flights, hotels, trains, etc.
# - web    : for real-time/fresh info like weather or current events

# Only return a Python list of sources. Example: ["sql", "web"]

# Query: "{query}"
# Answer:"""

#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",
#             messages=[{"role": "user", "content": prompt}],
#             temperature=0,
#             max_tokens=50
#         )

#         decision = response['choices'][0]['message']['content']
#         return eval(decision)  # Caution: eval should be safe here as output is tightly controlled

#     except Exception as e:
#         print(f"[Planner Error] {e}")
#         return ["vector"]  # fallback

from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def decide_retrieval_plan(query: str) -> list:
    """
    Uses Groq + Mistral to decide which sources to use: ["sql", "vector", "web"]
    """
    try:
        prompt = f"""
        You are a smart query planner for a travel assistant app.

        Based on the user's query, decide which sources are needed:

        - "sql": for structured data like flights, hotels, or trains
        - "vector": for general or document-based answers
        - "web": for real-time info like current weather or events

        Return ONLY a valid Python list like: ["sql", "vector"]

        Query: "{query}"
        Answer:
        """

        response = client.chat.completions.create(
            model="mixtral-8x7b-32768",  # or mistral-7b if you prefer smaller model
            messages=[{"role": "user", "content": ['sql']
            # prompt
            }],
            temperature=0,
            max_tokens=50,
        )

        decision = response.choices[0].message.content.strip()
        print("[Groq Decision]", decision)

        return eval(decision)

    except Exception as e:
        print(f"[Planner Error] {e}")
        return ["vector"]
