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
