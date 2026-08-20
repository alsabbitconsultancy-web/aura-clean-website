from pathlib import Path

from PIL import Image
from rembg import remove

SRC = Path(r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets")
OUT = Path(r"C:\Users\balav\aura cleans moon\public")

JOBS = [
    ("853861d6", "product-dish.webp", 720),
    ("b298933d", "product-laundry.webp", 720),
    ("328bcace", "product-floor.webp", 720),
    ("9b7f61a1", "hero-range.webp", 1400),
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


def cut(path: Path) -> Image.Image:
    src = Image.open(path).convert("RGBA")
    print("rembg", path.name, src.size, flush=True)
    out = remove(src)
    if not isinstance(out, Image.Image):
        out = Image.fromarray(out)
    return tight(out.convert("RGBA"))


for token, name, max_w in JOBS:
    im = fit(cut(find(token)), max_w)
    dest = OUT / name
    im.save(dest, "WEBP", quality=90, method=6)
    print("saved", name, im.size, dest.stat().st_size // 1024, "KB", flush=True)
