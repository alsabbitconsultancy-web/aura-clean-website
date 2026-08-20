from pathlib import Path
from PIL import Image

src = Path(r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets")
dst = Path(r"C:\Users\balav\aura cleans moon\public")

jobs = [
    ("range-toilet.png", "range-toilet.webp", 640),
    ("range-bathroom.png", "range-bathroom.webp", 640),
    ("range-laundry.png", "range-laundry.webp", 640),
    ("range-floor.png", "range-floor.webp", 640),
    ("range-dish.png", "range-dish.webp", 640),
    ("family-hands.png", "family-hands.webp", 1400),
]
for name, out, max_w in jobs:
    im = Image.open(src / name).convert("RGB")
    if im.width > max_w:
        nh = int(im.height * max_w / im.width)
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
    im.save(dst / out, "WEBP", quality=82, method=6)
    print(out, (dst / out).stat().st_size // 1024, "KB")
