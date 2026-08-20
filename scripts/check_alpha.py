from PIL import Image
from pathlib import Path

public = Path(r"C:\Users\balav\aura cleans moon\public")
for name in [
    "product-toilet.webp",
    "product-bathroom.webp",
    "product-laundry.webp",
    "product-floor.webp",
    "product-dish.webp",
]:
    im = Image.open(public / name).convert("RGBA")
    alphas = list(im.getchannel("A").getdata())
    solid = sum(1 for a in alphas if a > 200)
    mid = sum(1 for a in alphas if 20 < a <= 200)
    print(name, im.size, f"solid>{200}={solid}", f"soft={mid}")
