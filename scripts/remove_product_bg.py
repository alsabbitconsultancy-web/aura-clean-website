from pathlib import Path
from rembg import remove
from PIL import Image

public = Path(r"C:\Users\balav\aura cleans moon\public")
bak = public / "_bak_solid"
bak.mkdir(exist_ok=True)

files = [
    "product-toilet.webp",
    "product-bathroom.webp",
    "product-laundry.webp",
    "product-floor.webp",
    "product-dish.webp",
]

for name in files:
    src = public / name
    backup = bak / name
    if not backup.exists():
        backup.write_bytes(src.read_bytes())
    img = Image.open(src).convert("RGBA")
    cut = remove(img)
    bbox = cut.getbbox()
    if bbox:
        pad = 12
        l, t, r, b = bbox
        l = max(0, l - pad)
        t = max(0, t - pad)
        r = min(cut.width, r + pad)
        b = min(cut.height, b + pad)
        cut = cut.crop((l, t, r, b))
    cut.save(src, "WEBP", quality=92, method=6)
    print(f"{name}: {img.size} -> {cut.size}")

print("done")
