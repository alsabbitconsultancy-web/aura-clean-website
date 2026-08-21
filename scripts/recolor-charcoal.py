"""Recolor blue hand-wash liquid to opaque matte charcoal black; keep label exact."""

from __future__ import annotations

import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "product-handwash-charcoal.webp"
GIT_PATH = "public/product-handwash-charcoal.webp"


def soft_mask(mask: np.ndarray, passes: int = 2) -> np.ndarray:
    m = mask.astype(np.float32)
    for _ in range(passes):
        pad = np.pad(m, 1, mode="edge")
        m = (
            pad[0:-2, 0:-2]
            + pad[0:-2, 1:-1]
            + pad[0:-2, 2:]
            + pad[1:-1, 0:-2]
            + pad[1:-1, 1:-1]
            + pad[1:-1, 2:]
            + pad[2:, 0:-2]
            + pad[2:, 1:-1]
            + pad[2:, 2:]
        ) / 9.0
    return np.clip(m, 0.0, 1.0)


def load_original() -> Image.Image:
    """Prefer committed original so re-runs stay deterministic."""
    try:
        data = subprocess.check_output(["git", "show", f"HEAD:{GIT_PATH}"], cwd=ROOT)
        tmp = ROOT / "public" / "_orig_charcoal.webp"
        tmp.write_bytes(data)
        im = Image.open(tmp).convert("RGBA")
        tmp.unlink(missing_ok=True)
        return im
    except Exception:
        return Image.open(OUT).convert("RGBA")


def main() -> None:
    arr = np.array(load_original()).astype(np.float32)
    h, w = arr.shape[:2]
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    is_bg = (luma < 14) & (a > 200)
    is_hi = luma > 235

    yy, xx = np.mgrid[0:h, 0:w]
    in_label = (
        (xx >= int(w * 0.24))
        & (xx <= int(w * 0.76))
        & (yy >= int(h * 0.33))
        & (yy <= int(h * 0.74))
    )

    blue_dom = (b > r + 12) & (b > g + 5) & (b > 28)
    cyanish = (b > 40) & (g + 8 > r) & (b > r + 8)
    liquidish = (blue_dom | cyanish) & (luma < 210) & (~is_bg) & (~is_hi) & (a > 160)
    deep_gel = liquidish & (luma < 165) & (b > r + 30)
    liquid = (liquidish & (~in_label)) | (deep_gel & in_label)

    t = np.clip(soft_mask(liquid, passes=2) * 1.35, 0.0, 1.0)
    base = np.clip(luma / 255.0, 0.0, 1.0)
    charcoal = 2.0 + (base**1.55) * 28.0

    out = arr.copy()
    for i, mul in enumerate((1.0, 0.995, 1.005)):
        nc = charcoal * mul
        out[:, :, i] = out[:, :, i] * (1.0 - t) + nc * t

    rr, gg, bb = out[:, :, 0], out[:, :, 1], out[:, :, 2]
    still = (bb > rr + 22) & (bb > gg + 12) & (bb > 55) & (a > 200) & (~in_label)
    t2 = np.clip(soft_mask(still, passes=1) * 1.5, 0.0, 1.0)
    luma2 = 0.2126 * out[:, :, 0] + 0.7152 * out[:, :, 1] + 0.0722 * out[:, :, 2]
    charcoal2 = 2.0 + (np.clip(luma2 / 255.0, 0.0, 1.0) ** 1.55) * 28.0
    for i, mul in enumerate((1.0, 0.995, 1.005)):
        nc = charcoal2 * mul
        out[:, :, i] = out[:, :, i] * (1.0 - t2) + nc * t2

    result = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGBA")
    result.save(OUT, "WEBP", quality=90, method=6)
    print(f"wrote {OUT} liquid_px={int(liquid.sum())}")


if __name__ == "__main__":
    main()
