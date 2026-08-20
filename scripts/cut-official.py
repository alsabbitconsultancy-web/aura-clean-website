from pathlib import Path

from PIL import Image
from rembg import remove

SRC = Path(r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets")
OUT = Path(r"C:\Users\balav\aura cleans moon\public")

INDIVIDUAL = [
    ("toilet-cleaner-2df1fd1d", "product-toilet.webp", 720),
    ("184016", "product-floor.webp", 720),
    ("184009", "product-bathroom.webp", 760),
    ("707e1437", "product-handwash-charcoal.webp", 560),
    ("76386f57", "product-handwash-rose.webp", 560),
]


def find(token: str) -> Path:
    matches = list(SRC.glob(f"*{token}*.png"))
    if not matches:
        raise FileNotFoundError(token)
    return matches[0]


def tight(im: Image.Image, pad: int = 10) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    w, h = im.size
    box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(w, bbox[2] + pad),
        min(h, bbox[3] + pad),
    )
    return im.crop(box)


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


def split_group(im: Image.Image, count: int = 5) -> list[Image.Image]:
    w, h = im.size
    px = im.load()
    cols = []
    for x in range(w):
        cols.append(sum(1 for y in range(0, h, 2) if px[x, y][3] > 40))

    threshold = max(cols) * 0.08
    regions: list[tuple[int, int]] = []
    start = None
    for x, n in enumerate(cols):
        if n > threshold:
            if start is None:
                start = x
        elif start is not None:
            if x - start > w * 0.06:
                regions.append((start, x))
            start = None
    if start is not None:
        regions.append((start, w - 1))

    regions.sort(key=lambda r: r[1] - r[0], reverse=True)
    regions = sorted(regions[:count], key=lambda r: r[0])
    print("group regions", regions, flush=True)

    bottles = []
    for x0, x1 in regions:
        pad = 18
        crop = tight(im.crop((max(0, x0 - pad), 0, min(w, x1 + pad), h)), pad=6)
        bottles.append(crop)
    return bottles


for token, name, max_w in INDIVIDUAL:
    im = fit(cut(find(token)), max_w)
    dest = OUT / name
    im.save(dest, "WEBP", quality=88, method=6)
    print("saved", dest.name, im.size, dest.stat().st_size // 1024, "KB", flush=True)

group = cut(find("302d215d"))
bottles = split_group(group, 5)
names = [
    "product-group-toilet.webp",
    "product-bathroom-group.webp",
    "product-laundry.webp",
    "product-floor-group.webp",
    "product-dish.webp",
]
for name, bottle in zip(names, bottles):
    bottle = fit(bottle, 640)
    dest = OUT / name
    bottle.save(dest, "WEBP", quality=88, method=6)
    print("saved", dest.name, bottle.size, dest.stat().st_size // 1024, "KB", flush=True)
