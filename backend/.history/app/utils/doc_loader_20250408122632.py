# app/utils/doc_loader.py

from langchain.document_loaders import DirectoryLoader, TextLoader
from typing import List
from langchain.docstore.document import Document

def load_documents(directory_path: str) -> List[Document]:
    """
    Loads text documents from the specified directory.
    """
    loader = DirectoryLoader(directory_path, glob="**/*.txt", loader_cls=TextLoader)
    return loader.load()
