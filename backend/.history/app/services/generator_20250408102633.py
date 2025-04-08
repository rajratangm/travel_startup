# app/services/generator.py

import os
import openai
from app.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY


def generate_response(query: str, context_chunks: list) -> str:
    """
    Uses OpenAI's GPT model to generate a response based on the given context and query.
    """
    try:
        context_text = "\n\n".join(context_chunks)

        prompt = f"""You are a smart travel assistant. Use the information provided to answer the user's query.

Context:
{context_text}

User Question:
{query}

Answer:"""

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful travel assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        return response['choices'][0]['message']['content'].strip()

    except Exception as e:
        print(f"[Generator Error] {e}")
        return "Sorry, I couldn't generate a response at the moment."
