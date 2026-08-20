from PIL import Image
from pathlib import Path
from shutil import copy2

src = Path(r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets")
dst = Path(r"C:\Users\balav\aura cleans moon\public")
dst.mkdir(parents=True, exist_ok=True)


def save_webp(name: str, max_w: int, q: int = 82) -> None:
    im = Image.open(src / name).convert("RGB")
    if im.width > max_w:
        h = int(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.Resampling.LANCZOS)
    out = dst / (Path(name).stem + ".webp")
    im.save(out, "WEBP", quality=q, method=6)
    print(f"{out.name}: {out.stat().st_size // 1024}KB {im.size}")


save_webp("hero-products.png", 1920, 84)
save_webp("water-splash.png", 1400, 78)
save_webp("lemon-float.png", 520, 80)
save_webp("rose-float.png", 520, 80)
save_webp("variant-lemon.png", 256, 80)
save_webp("variant-rose.png", 256, 80)
save_webp("variant-charcoal.png", 256, 80)

logo = next(src.glob("*1e34693c*.png"))
copy2(logo, dst / "logo.png")
print("logo copied", (dst / "logo.png").stat().st_size)
