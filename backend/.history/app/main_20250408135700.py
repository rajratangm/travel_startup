# # app/main.py

# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from app.routes import chatbot
# from app.services.initialize_vector_store import initialize_vector_store_if_needed

# initialize_vector_store_if_needed()

# app = FastAPI(title="TripWise RAG Backend")

# # CORS for allowing Streamlit frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Replace with Streamlit URL in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include chatbot route
# app.include_router(chatbot.router, prefix="/chat", tags=["Chatbot"])

# @app.get("/")
# async def root():
#     return {"message": "TripWise Backend is running"}

# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chatbot

from app.utils.doc_loader import load_documents, chunk_documents, extract_texts_and_metadata
from app.services.indexer import build_index
import os

app = FastAPI(title="TripWise RAG Backend")

# CORS settings (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with Streamlit URL or specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chatbot route
app.include_router(chatbot.router, prefix="/chat", tags=["Chatbot"])


@app.get("/")
async def root():
    return {"message": "TripWise Backend is running"}


# 🧠 Run at startup: Build vector index if not already present
@app.on_event("startup")
def initialize_vector_store_if_needed():
    index_file = "vector_index/faiss_index.bin"
    metadata_file = "vector_index/metadata.pkl"

    if os.path.exists(index_file) and os.path.exists(metadata_file):
        print("✅ FAISS index and metadata already exist. Skipping index creation.")
        return

    print("🚀 Initializing vector store from documents...")
    documents = load_documents("data/travel_guides")
    chunks = chunk_documents(documents)
    texts, metadata = extract_texts_and_metadata(chunks)
    build_index(texts, metadata)
