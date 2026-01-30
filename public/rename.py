import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FOLDER_PATH = os.path.join(BASE_DIR, "images")

for filename in os.listdir(FOLDER_PATH):
    old_path = os.path.join(FOLDER_PATH, filename)

    if not os.path.isfile(old_path):
        continue

    name, ext = os.path.splitext(filename)

    # normalize name
    new_name = name.lower()
    new_name = new_name.replace("(", "").replace(")", "")
    new_name = re.sub(r"[^a-z0-9]+", "-", new_name)
    new_name = new_name.strip("-")

    new_filename = new_name + ext.lower()
    new_path = os.path.join(FOLDER_PATH, new_filename)

    # same name → skip
    if old_path.lower() == new_path.lower():
        continue

    # target already exists → skip safely
    if os.path.exists(new_path):
        print(f"SKIPPED (exists): {filename} → {new_filename}")
        continue

    os.rename(old_path, new_path)
    print(f"Renamed: {filename} → {new_filename}")
