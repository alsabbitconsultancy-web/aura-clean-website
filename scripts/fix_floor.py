from rembg import remove
from PIL import Image
from pathlib import Path

src = Path(r"C:\Users\balav\aura cleans moon\public\product-floor.png")
out = Path(r"C:\Users\balav\aura cleans moon\public\product-floor.webp")
img = Image.open(src).convert("RGBA")
cut = remove(img)
# Keep original canvas size so the bottle scales sharply on site
canvas = Image.new("RGBA", img.size, (0, 0, 0, 0))
canvas.paste(cut, (0, 0), cut)
# Tight trim with generous top margin for the cap
bbox = canvas.getbbox()
if bbox:
    l, t, r, b = bbox
    pad_x, pad_top, pad_b = 20, 28, 16
    canvas = canvas.crop(
        (
            max(0, l - pad_x),
            max(0, t - pad_top),
            min(canvas.width, r + pad_x),
            min(canvas.height, b + pad_b),
        )
    )
canvas.save(out, "WEBP", quality=96, method=6)
print("saved", canvas.size, out.stat().st_size)
