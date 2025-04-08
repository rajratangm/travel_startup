# # app/utils/embed_utils.py

# from typing import List
# import os
# from app.config import OPENAI_API_KEY

# import openai

# openai.api_key = OPENAI_API_KEY


# def get_embedding(text: str, model: str = "text-embedding-ada-002") -> List[float]:
#     """
#     Get vector embedding from OpenAI's model for a single text input.
#     """
#     try:
#         response = openai.Embedding.create(
#             input=text,
#             model=model
#         )
#         return response['data'][0]['embedding']
#     except Exception as e:
#         print(f"[Embedding Error] {e}")
#         return []


# def batch_embed_texts(texts: List[str], model: str = "text-embedding-ada-002") -> List[List[float]]:
#     """
#     Embed a batch of text chunks.
#     """
#     try:
#         response = openai.Embedding.create(
#             input=texts,
#             model=model
#         )
#         return [res["embedding"] for res in response["data"]]
#     except Exception as e:
#         print(f"[Batch Embedding Error] {e}")
#         return [[] for _ in texts]

# app/utils/embed_utils.py

from typing import List
from sentence_transformers import SentenceTransformer

# Load once at module level
model = SentenceTransformer("all-MiniLM-L6-v2")


def get_embedding(text: str) -> List[float]:
    """
    Get vector embedding for a single text input using a local sentence transformer.
    """
    try:
        return model.encode(text).tolist()
    except Exception as e:
        print(f"[Embedding Error] {e}")
        return []


def batch_embed_texts(texts: List[str]) -> List[List[float]]:
    """
    Embed a batch of text chunks.
    """
    try:
        return model.encode(texts, show_progress_bar=True).tolist()
    except Exception as e:
        print(f"[Batch Embedding Error] {e}")
        return [[] for _ in texts]
