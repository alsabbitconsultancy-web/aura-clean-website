from pathlib import Path

from PIL import Image
from rembg import remove

SRC = Path(r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets")
OUT = Path(r"C:\Users\balav\aura cleans moon\public")

JOBS = [
    ("ad403bd7", "product-floor.webp", 720),
    ("e6563ba4", "product-toilet.webp", 640),
    ("bf49fe21", "product-handwash-lemon.webp", 560),
    ("d00cf6ff", "product-dish.webp", 720),
    ("bee04782", "product-handwash-charcoal.webp", 560),
    ("640e9661", "product-laundry.webp", 720),
    ("207796ab", "product-bathroom.webp", 640),
    ("9e5b467d", "product-handwash-lemon-alt.webp", 560),
]


def find(token: str) -> Path:
    matches = list(SRC.glob(f"*{token}*.png"))
    if not matches:
        raise FileNotFoundError(token)
    return matches[0]


def tight(im: Image.Image, pad: int = 8) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    w, h = im.size
    return im.crop(
        (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad),
        )
    )


def fit(im: Image.Image, max_w: int) -> Image.Image:
    if im.width <= max_w:
        return im
    nh = int(im.height * max_w / im.width)
    return im.resize((max_w, nh), Image.Resampling.LANCZOS)


for token, name, max_w in JOBS:
    src = Image.open(find(token)).convert("RGBA")
    print("rembg", token, src.size, flush=True)
    out = remove(src)
    if not isinstance(out, Image.Image):
        out = Image.fromarray(out)
    out = fit(tight(out.convert("RGBA")), max_w)
    dest = OUT / name
    out.save(dest, "WEBP", quality=90, method=6)
    print("saved", name, out.size, dest.stat().st_size // 1024, "KB", flush=True)
