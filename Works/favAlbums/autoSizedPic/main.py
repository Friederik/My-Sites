from pathlib import Path
from PIL import Image
import time

folder_path = Path(r"D:\petProjects\favAlbums\images")

# Перебор только файлов .txt
for file in folder_path.iterdir():
    if file.suffix != ".jpg":
        new_file = file.with_suffix(".jpg")
        file.rename(new_file)
for file in folder_path.iterdir():
    image = Image.open(file)
    resized_image = image.resize((300, 300))
    resized_image.save(file)
