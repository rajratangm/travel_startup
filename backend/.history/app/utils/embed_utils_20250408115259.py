import openai
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")


def get_embedding(text: str, model: str = "text-embedding-ada-002") -> List[float]:
    """
    Get embedding vector for a single text.
    """
    try:
        response = openai.Embedding.create(
            input=text,
            model=model
        )
        return response["data"][0]["embedding"]
    except Exception as e:
        print(f"[Embedding Error] {e}")
        return []


def batch_embed_texts(texts: List[str], model: str = "text-embedding-ada-002") -> List[List[float]]:
    """
    Get embeddings for a batch of texts.
    """
    embeddings = []
    for text in texts:
        embedding = get_embedding(text, model)
        embeddings.append(embedding)
    return embeddings
