# import os

# # Folders to ignore
# IGNORE_FOLDERS = {"venv", "__pycache__", ".git", ".vscode", ".mypy_cache", ".history", "node_modules", ".idea"}

# def print_folder_structure(folder_path, indent=""):
#     for item in sorted(os.listdir(folder_path)):
#         if item in IGNORE_FOLDERS:
#             continue

#         item_path = os.path.join(folder_path, item)
#         if os.path.isdir(item_path):
#             print(f"{indent}📁 {item}/")
#             print_folder_structure(item_path, indent + "    ")
#         else:
#             print(f"{indent}📄 {item}")

# # Usage
# current_dir = os.getcwd()
# print(f"📂 Folder structure of: {current_dir}\n")
# print_folder_structure(current_dir)
from sqlalchemy import create_engine, text

# Paste your actual URI
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@localhost:3306/travel_db"

engine = create_engine(SQLALCHEMY_DATABASE_URI)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * from"))
        print("[✅] Connected! Test query result:", result.fetchone())
except Exception as e:
    print("[❌] Failed to connect:", e)
