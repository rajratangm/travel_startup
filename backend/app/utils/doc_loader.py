# # # app/utils/doc_loader.py

# # from langchain.document_loaders import DirectoryLoader, TextLoader
# # from typing import List
# # from langchain.docstore.document import Document

# # def load_documents(directory_path: str) -> List[Document]:
# #     """
# #     Loads text documents from the specified directory.
# #     """
# #     loader = DirectoryLoader(directory_path, glob="**/*.txt", loader_cls=TextLoader)
# #     return loader.load()

# from typing import List
# from langchain.document_loaders import DirectoryLoader, TextLoader
# from langchain.schema import Document
# from langchain.text_splitter import RecursiveCharacterTextSplitter


# def load_documents(directory: str) -> List[Document]:
#     """
#     Loads all .txt files from the specified directory.
#     You can swap in PDFLoader, CSVLoader, etc. as needed.
#     """

#     loader = DirectoryLoader(
#         directory,
#         glob="**/*.txt",
#         loader_cls=TextLoader,
#         show_progress=True
#     )
#     return loader.load()


# def chunk_documents(documents: List[Document], chunk_size=500, chunk_overlap=50) -> List[Document]:
#     """
#     Splits documents into smaller chunks for efficient embedding.
#     """
#     splitter = RecursiveCharacterTextSplitter(
#         chunk_size=chunk_size,
#         chunk_overlap=chunk_overlap
#     )
#     return splitter.split_documents(documents)


# app/utils/doc_loader.py

from typing import List, Tuple
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter


def load_documents(directory: str) -> List[Document]:
    """
    Loads all .txt files from the specified directory.
    """
    loader = DirectoryLoader(
        directory,
        glob="**/*.txt",
        loader_cls=TextLoader,
        show_progress=True
    )
    return loader.load()


def chunk_documents(documents: List[Document], chunk_size=500, chunk_overlap=50) -> List[Document]:
    """
    Splits documents into smaller chunks for efficient embedding.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    return splitter.split_documents(documents)


def extract_texts_and_metadata(chunks: List[Document]) -> Tuple[List[str], List[dict]]:
    """
    Extracts text and metadata (including the 'text' field required for retrieval).
    """
    texts = [doc.page_content for doc in chunks]
    metadata = [{"text": doc.page_content, **doc.metadata} for doc in chunks]
    return texts, metadata
