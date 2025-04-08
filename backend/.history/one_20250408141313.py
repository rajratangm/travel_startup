import os

folder_path = os.getcwd()  # current working directory
all_files = []

for root, dirs, files in os.walk(folder_path):
    for file in files:
        full_path = os.path.join(root, file)
        all_files.append(full_path)

print("Files in folder and subfolders:")
for f in all_files:
    print(f)
