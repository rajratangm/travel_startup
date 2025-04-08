# import openai
# import os
# from typing import List
# from dotenv import load_dotenv

# load_dotenv()

# # Set your OpenAI API key
# openai.api_key = os.getenv("OPENAI_API_KEY")


# def get_embedding(text: str, model: str = "text-embedding-ada-002") -> List[float]:
#     """
#     Get embedding vector for a single text.
#     """
#     try:
#         response = openai.Embedding.create(
#             input=text,
#             model=model
#         )
#         return response["data"][0]["embedding"]
#     except Exception as e:
#         print(f"[Embedding Error] {e}")
#         return []


# def batch_embed_texts(texts: List[str], model: str = "text-embedding-ada-002") -> List[List[float]]:
#     """
#     Get embeddings for a batch of texts.
#     """
#     embeddings = []
#     for text in texts:
#         embedding = get_embedding(text, model)
#         embeddings.append(embedding)
#     return embeddings

from sentence_transformers import SentenceTransformer
from typing import List

# Load a lightweight embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")  # You can use others like "paraphrase-MiniLM-L6-v2"

def get_embedding(text: str) -> List[float]:
    """
    Get embedding vector for a single text using Hugging Face model.
    """
    try:
        embedding = model.encode(text)
        return embedding.tolist()  # Convert numpy array to list for compatibility
    except Exception as e:
        print(f"[Embedding Error] {e}")
        return []

def batch_embed_texts(texts: List[str]) -> List[List[float]]:
    """
    Get embeddings for a batch of texts using Hugging Face model.
    """
    try:
        embeddings = model.encode(texts)
        return [e.tolist() for e in embeddings]
    except Exception as e:
        print(f"[Batch Embedding Error] {e}")
        return []
