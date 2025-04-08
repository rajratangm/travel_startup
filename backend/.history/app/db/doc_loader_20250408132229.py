from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from typing import List

def load_documents(folder_path: str = "data") -> List[str]:
    """
    Load all text files from the specified folder and return their contents.
    """
    documents = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            loader = TextLoader(file_path)
            data = loader.load()
            documents.extend(data)
    return documents


def chunk_documents(documents: List[str], chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
    """
    Split long documents into smaller chunks for embedding.
    """
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(documents)
