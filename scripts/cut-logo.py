from pathlib import Path
from PIL import Image

src = Path(
    r"C:\Users\balav\.cursor\projects\c-Users-balav-aura-cleans-moon\assets\c__Users_balav_AppData_Roaming_Cursor_User_workspaceStorage_a4dc18da58154ed45cadb08f74c946c3_images_image-fca25406-5ee6-410c-a687-3db4dbbf9aff.png"
)
pub = Path(r"C:\Users\balav\aura cleans moon\public")

im = Image.open(src).convert("RGBA")
pix = im.load()
w, h = im.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        chroma = max(r, g, b) - min(r, g, b)
        luma = (r + g + b) / 3
        # Keep brand colour: navy type, cyan crescent, green leaf/CLEAN.
        is_navy = b >= 48 and b >= r + 18 and b >= g
        is_green = g >= 40 and g >= r + 8
        is_cyan = b >= 40 and g >= 28 and chroma >= 18
        if is_navy or is_green or is_cyan:
            continue
        # Knock out black / near-black studio
        if luma <= 28 and chroma <= 16:
            pix[x, y] = (0, 0, 0, 0)
        elif luma <= 42 and chroma <= 10:
            pix[x, y] = (r, g, b, 0)

bbox = im.getbbox()
assert bbox
pad = 12
l, t, r, btm = bbox
im = im.crop(
    (max(0, l - pad), max(0, t - pad), min(w, r + pad), min(h, btm + pad))
)
im.save(pub / "aura-logo.png", "PNG", optimize=True)
im.save(pub / "logo.png", "PNG", optimize=True)
print("saved", im.size, (pub / "aura-logo.png").stat().st_size)
