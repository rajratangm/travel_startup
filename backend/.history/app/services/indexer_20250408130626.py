# # app/services/indexer.py

# import os
# import faiss
# import pickle
# from typing import List, Tuple
# from app.utils.embed_utils import batch_embed_texts


# # Choose dimension based on embedding model (1536 for OpenAI's ada-002)
# EMBEDDING_DIM = 1536
# INDEX_FILE = "vector_index/faiss_index.bin"
# META_FILE = "vector_index/metadata.pkl"

# os.makedi
# rs("vector_index", exist_ok=True)


# def build_index(documents: List[str], metadata: List[dict]) -> None:
#     """
#     Build FAISS index from documents and store metadata.
#     """
#     print("🔍 Embedding documents...")
#     vectors = batch_embed_texts(documents)

#     print("📦 Building FAISS index...")
#     index = faiss.IndexFlatL2(EMBEDDING_DIM)
#     index.add(np.array(vectors).astype("float32"))

#     print("💾 Saving index and metadata...")
#     faiss.write_index(index, INDEX_FILE)

#     with open(META_FILE, "wb") as f:
#         pickle.dump(metadata, f)

#     print("✅ Index built and saved!")


# def load_index() -> Tuple[faiss.IndexFlatL2, List[dict]]:
#     """
#     Load FAISS index and metadata.
#     """
#     print("📥 Loading index and metadata...")
#     index = faiss.read_index(INDEX_FILE)

#     with open(META_FILE, "rb") as f:
#         metadata = pickle.load(f)

#     return index, metadata


# def search_index(query: str, k: int = 5) -> List[Tuple[str, dict]]:
#     """
#     Search the FAISS index for similar content to the query.
#     Returns top-k matched texts with their metadata.
#     """
#     from app.utils.embed_utils import get_embedding
#     index, metadata = load_index()

#     query_vec = get_embedding(query)
#     D, I = index.search(np.array([query_vec]).astype("float32"), k)

#     results = []
#     for idx in I[0]:
#         if idx < len(metadata):
#             results.append((metadata[idx]["text"], metadata[idx]))

#     return results

# app/services/indexer.py

import os
import faiss
import pickle
import numpy as np
from typing import List, Tuple
from app.utils.embed_utils import batch_embed_texts, get_embedding

# Choose dimension based on embedding model (1536 for OpenAI's ada-002)
EMBEDDING_DIM = 1536
INDEX_FILE = "vector_index/faiss_index.bin"
META_FILE = "vector_index/metadata.pkl"

# Ensure the folder exists
os.makedirs("vector_index", exist_ok=True)


# def build_index(documents: List[str], metadata: List[dict]) -> None:
#     """
#     Build FAISS index from documents and store metadata.
#     """
#     print("🔍 Embedding documents...")
#     vectors = batch_embed_texts(documents)

#     print("📦 Building FAISS index...")
#     index = faiss.IndexFlatL2(EMBEDDING_DIM)
#     index.add(np.array(vectors).astype("float32"))

#     print("💾 Saving index and metadata...")
#     faiss.write_index(index, INDEX_FILE)
#     with open(META_FILE, "wb") as f:
#         pickle.dump(metadata, f)

#     print("✅ Index built and saved!")

def build_index(documents: List[str], metadata: List[dict]) -> None:
    """
    Build FAISS index from documents and store metadata.
    """
    if not documents:
        print("❌ No documents provided. Skipping index build.")
        return

    print(f"📄 Received {len(documents)} documents to embed...")

    print("🔍 Embedding documents...")
    vectors = batch_embed_texts(documents)

    if not vectors or not all(vectors):
        print("❌ Embedding failed or returned empty vectors. Skipping index build.")
        return

    print(f"✅ Generated {len(vectors)} vectors. Vector dimension: {len(vectors[0]) if vectors else 'N/A'}")

    if len(vectors[0]) != EMBEDDING_DIM:
        print(f"❌ Vector dimensions mismatch. Expected {EMBEDDING_DIM}, got {len(vectors[0])}")
        return

    print("📦 Building FAISS index...")
    index = faiss.IndexFlatL2(EMBEDDING_DIM)
    index.add(np.array(vectors).astype("float32"))

    print("💾 Saving index and metadata...")
    faiss.write_index(index, INDEX_FILE)
    with open(META_FILE, "wb") as f:
        pickle.dump(metadata, f)

    print("✅ Index built and saved successfully!")

def load_index() -> Tuple[faiss.IndexFlatL2, List[dict]]:
    """
    Load FAISS index and metadata.
    """
    print("📥 Loading index and metadata...")
    index = faiss.read_index(INDEX_FILE)
    with open(META_FILE, "rb") as f:
        metadata = pickle.load(f)
    return index, metadata

def search_index(query: str, k: int = 5) -> List[Tuple[str, dict]]:
    """
    Search the FAISS index for similar content to the query.
    Returns top-k matched texts with their metadata.
    """
    index, metadata = load_index()
    query_vec = get_embedding(query)
    D, I = index.search(np.array([query_vec]).astype("float32"), k)

    results = []
    for idx in I[0]:
        if idx < len(metadata):
            results.append((metadata[idx]["text"], metadata[idx]))

    return results
