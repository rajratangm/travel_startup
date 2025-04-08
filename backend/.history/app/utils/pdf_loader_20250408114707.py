# app/utils/pdf_loader.py

import os
from PyPDF2 import PdfReader

def load_pdfs_and_chunk(folder_path="data/travel_guides/", chunk_size=300, overlap=50):
    docs = []
    meta = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            path = os.path.join(folder_path, filename)
            reader = PdfReader(path)
            full_text = "".join([page.extract_text() or "" for page in reader.pages])
            chunks = chunk_text(full_text, chunk_size, overlap)
            for chunk in chunks:
                docs.append(chunk)
                meta.append({"source": filename, "text": chunk})
    return docs, meta


def chunk_text(text, chunk_size=300, overlap=50):
    chunks = []
    for i in range(0, len(text), chunk_size - overlap):
        chunk = text[i:i + chunk_size]
        if len(chunk.strip()) > 0:
            chunks.append(chunk)
    return chunks
