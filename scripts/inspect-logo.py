from pathlib import Path
from PIL import Image
from collections import Counter

path = Path(r"C:\Users\balav\aura cleans moon\public\logo.png")
im = Image.open(path)
print("mode", im.mode, "size", im.size)
im = im.convert("RGBA")
pix = list(im.getdata())
print("pixels", len(pix))
print("sample corners", pix[0], pix[im.width - 1], pix[-1])
alphas = Counter(p[3] for p in pix)
print("alpha counts", alphas.most_common(8))
rgbs = Counter((p[0], p[1], p[2]) for p in pix if p[3] > 10)
print("top colors", rgbs.most_common(8))
