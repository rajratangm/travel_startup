# # app/services/retriever.py

# import numpy as np
# import faiss
# from app.embeddings.embed_utils import get_embedding
# from app.embeddings.indexer import load_index, load_documents


# # Load FAISS index and corresponding document chunks
# faiss_index = load_index()          # Returns faiss.IndexFlatL2 or similar
# documents = load_documents()        # List of document strings mapped to FAISS index


# def retrieve_from_vector_db(query: str, k: int = 5) -> list:
#     """
#     Retrieve top-k relevant documents from vector DB using semantic similarity.
#     """
#     try:
#         query_vector = get_embedding(query)
#         query_vector = np.array(query_vector).astype("float32").reshape(1, -1)

#         # Perform similarity search
#         distances, indices = faiss_index.search(query_vector, k)

#         # Map indices to original document chunks
#         results = [documents[i] for i in indices[0] if i < len(documents)]

#         return results

#     except Exception as e:
#         print(f"[Retriever Error] {e}")
#         return []


import numpy as np
import faiss
import os

from app.embeddings.embed_utils import get_embedding
# ✅ Corrected
from app.services.indexer import load_index, build_index
from app.embeddings.pdf_loader import load_documents

# Constants
INDEX_PATH = "vector_index/faiss_index.bin"

# Ensure FAISS index is built if not present
def ensure_index():
    if not os.path.exists(INDEX_PATH):
        print("⚠️ FAISS index not found. Rebuilding from PDFs...")
        docs = load_documents("data/travel_guides")  # Adjust this path to your actual folder
        texts = [doc["text"] for doc in docs]
        metadata = [{"source": doc["source"], "text": doc["text"]} for doc in docs]
        build_index(texts, metadata)
    else:
        print("✅ FAISS index found.")

# Main retrieval function
def retrieve_from_vector_db(query: str, k: int = 5) -> list:
    try:
        ensure_index()
        index, metadata = load_index()  # Now returns both

        query_vector = get_embedding(query)
        query_vector = np.array(query_vector).astype("float32").reshape(1, -1)

        distances, indices = index.search(query_vector, k)

        results = [metadata[i]["text"] for i in indices[0] if i < len(metadata)]
        return results

    except Exception as e:
        print(f"[Retriever Error] {e}")
        return []
