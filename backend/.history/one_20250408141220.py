import os

folder_path = os.getcwd()  # Get the current working directory

file_names = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

print("Current working directory:", folder_path)
print("Files in folder:", file_names)
