import os

folder_path = "/"  # Replace with your folder path

file_names = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

print("Files in folder:", file_names)
