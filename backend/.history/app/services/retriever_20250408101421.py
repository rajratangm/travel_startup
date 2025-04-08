# app/services/retriever.py

import faiss
import numpy as np
from app.embeddings.embed_utils import get_embedding
from app.embeddings.indexer import load_index, load_documents

# Load index and docs at startup (in-memory)
faiss_index = load_index()
documents = load_documents()

def retrieve_context(query: str, k: int = 5) -> list:
    """
    Retrieves top-k relevant chunks from FAISS index based on semantic similarity.
    """
    query_vector = get_embedding(query)
    query_vector = np.array(query_vector).astype("float32").reshape(1, -1)

    D, I = faiss_index.search(query_vector, k)  # D = distances, I = indices

    # Get top-k matching documents
    context_chunks = [documents[i] for i in I[0] if i < len(documents)]

    return context_chunks
