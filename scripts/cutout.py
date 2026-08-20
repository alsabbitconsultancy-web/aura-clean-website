from collections import deque
from pathlib import Path
from PIL import Image

src = Path(r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets")
pub = Path(r"C:\Users\balav\aura cleans moon\public")
pub.mkdir(parents=True, exist_ok=True)


def flood_corners(im: Image.Image, limit: int = 242) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    pix = im.load()
    seen: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()
    for start in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        q.append(start)

    def is_bg(x: int, y: int) -> bool:
        r, g, b, _a = pix[x, y]
        return r >= limit and g >= limit and b >= limit and max(r, g, b) - min(r, g, b) < 30

    while q:
        x, y = q.popleft()
        if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
            continue
        if not is_bg(x, y):
            continue
        seen.add((x, y))
        pix[x, y] = (255, 255, 255, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return im


def studio_cut(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    pix = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            low = min(r, g, b)
            spread = max(r, g, b) - low
            if low >= 236 and spread < 26:
                pix[x, y] = (r, g, b, 0)
            elif low >= 205 and spread < 20:
                alpha = int(a * max(0, (236 - low) / 31))
                pix[x, y] = (r, g, b, alpha)
    return im


logo = Image.open(pub / "logo.png")
flood_corners(logo, 248).save(pub / "logo.png", "PNG")
print("logo cut")

jobs = [
    ("lemon-float.png", "lemon-float.webp", 520),
    ("rose-float.png", "rose-float.webp", 520),
    ("water-splash.png", "water-splash.webp", 1600),
]
for name, out, max_w in jobs:
    im = Image.open(src / name)
    if im.width > max_w:
        nh = int(im.height * max_w / im.width)
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
    studio_cut(im).save(pub / out, "WEBP", quality=84, method=6)
    print(out, (pub / out).stat().st_size // 1024, "KB")
