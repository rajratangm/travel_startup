import os

def print_folder_structure(folder_path, indent=""):
    for item in sorted(os.listdir(folder_path)):
        item_path = os.path.join(folder_path, item)
        if os.path.isdir(item_path):
            print(f"{indent}📁 {item}/")
            print_folder_structure(item_path, indent + "    ")
        else:
            print(f"{indent}📄 {item}")

# Usage
current_dir = os.getcwd()
print(f"📂 Folder structure of: {current_dir}\n")
print_folder_structure(current_dir)
