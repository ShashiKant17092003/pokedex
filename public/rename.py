import os

FOLDER_PATH = "./images"  # change this to your folder path

for filename in os.listdir(FOLDER_PATH):
    old_path = os.path.join(FOLDER_PATH, filename)

    # skip folders
    if not os.path.isfile(old_path):
        continue

    new_filename = filename.replace("(", "")
    new_path = os.path.join(FOLDER_PATH, new_filename)

    if old_path != new_path:
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} → {new_filename}")
