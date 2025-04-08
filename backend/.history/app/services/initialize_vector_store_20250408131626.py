import os
from app.db.doc_loader import load_documents, chunk_documents
from app.services.indexer import build_index

VECTOR_STORE_DIR = "vector_index"

def is_vector_store_empty() -> bool:
    return not os.path.exists(VECTOR_STORE_DIR) or len(os.listdir(VECTOR_STORE_DIR)) == 0


def initialize_vector_store_if_needed():
    if is_vector_store_empty():
        print("Vector store is empty. Creating embeddings and building index...")
        documents = load_documents(os.path.join("data", "travel_guides"))  # Replace "data" with your actual folder
        chunks = chunk_documents(documents)
        
        texts = [doc.page_content for doc in chunks]
        metadata = [doc.metadata for doc in chunks]

        build_index(texts, metadata)
        print("Vector store created and saved in 'vector_index'.")
    else:
        print("Vector store already exists. Skipping embedding.")
