# app/services/web_search.py

import os
import requests
from app.config import SERPAPI_API_KEY


def fetch_from_web(query: str, num_results: int = 5) -> list:
    """
    Fetch relevant data from the internet using SerpAPI (Google Search).
    Returns a list of snippets.
    """
    try:
        url = "https://serpapi.com/search"
        params = {
            "q": query,
            "api_key": SERPAPI_API_KEY,
            "num": num_results,
            "engine": "google",
        }

        response = requests.get(url, params=params)
        data = response.json()

        snippets = []
        for result in data.get("organic_results", []):
            title = result.get("title", "")
            snippet = result.get("snippet", "")
            link = result.get("link", "")
            snippets.append(f"{title}:\n{snippet}\nSource: {link}")

        return snippets[:num_results]

    except Exception as e:
        print(f"[Web Search Error] {e}")
        return []
