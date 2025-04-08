# app/config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# === API KEYS ===
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SERPAPI_KEY = os.getenv("SERPAPI_KEY")  # for web search fallback

# === DATABASE ===
DATABASE_URL = os.getenv("DATABASE_URL")

# === EMBEDDINGS ===
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"  # can override from env too

# === APP SETTINGS ===
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
