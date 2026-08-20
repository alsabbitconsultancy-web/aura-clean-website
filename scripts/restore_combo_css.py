from pathlib import Path

path = Path(r"C:\Users\balav\aura cleans moon\src\index.css")
text = path.read_text(encoding="utf-8")
start = text.find("/* ------------------------------------------------------------------ */\n/* Combo WOW banner")
end = text.find(".add-cart-solid {")
if start < 0 or end < 0:
    raise SystemExit(f"markers missing {start} {end}")

new = r'''/* ------------------------------------------------------------------ */
/* Combo promo banner - brand matched, no corner flowers               */
/* ------------------------------------------------------------------ */

.combo-promo.combo-promo-banner {
  position: relative;
  display: block;
  margin: 0 clamp(1.1rem, 4.5vw, 4.5rem) 1.35rem;
  padding: 0;
  overflow: hidden;
  border-radius: 32px;
  color: #1c1408;
  background:
    radial-gradient(ellipse 60% 70% at 8% 15%, rgba(245, 196, 0, 0.22), transparent 58%),
    radial-gradient(ellipse 50% 55% at 95% 20%, rgba(61, 68, 80, 0.08), transparent 55%),
    linear-gradient(145deg, #fffdf8 0%, #fff8ee 45%, #fff3d6 100%);
  border: 1px solid rgba(28, 20, 8, 0.08);
  box-shadow:
    0 22px 48px rgba(28, 20, 8, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.combo-promo.combo-promo-banner:hover {
  box-shadow:
    0 26px 54px rgba(28, 20, 8, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.combo-soft-glow {
  position: absolute;
  inset: auto -8% -35% 40%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 196, 0, 0.2), transparent 68%);
  filter: blur(10px);
  pointer-events: none;
}

.combo-badge {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  z-index: 4;
  margin: 0;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: var(--lime);
  color: #1c1408;
  font-family: Inter, system-ui, sans-serif;
  font-size: 0.68rem;
  font-weight: 800;
  font-style: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 10px 22px rgba(245, 196, 0, 0.28);
}

.combo-promo-inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.2rem;
  align-items: center;
  min-height: 100%;
  padding: 1.85rem 1.6rem 1.6rem;
}

.combo-promo-copy {
  position: relative;
  z-index: 1;
}

.combo-promo-copy .lux-kicker {
  color: rgba(28, 20, 8, 0.55);
  letter-spacing: 0.16em;
}

.combo-promo-copy h2,
.combo-promo-copy h3 {
  margin: 0.4rem 0 0;
  max-width: 16ch;
  color: #1c1408;
  font-family: "Archivo Black", Impact, sans-serif;
  font-size: clamp(1.55rem, 2.8vw, 2.2rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.combo-price {
  display: inline-flex;
  align-items: baseline;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  background: #1c1408;
  color: rgba(255, 248, 238, 0.78);
  font-size: 0.92rem;
  font-weight: 600;
  box-shadow: 0 12px 24px rgba(28, 20, 8, 0.16);
}

.combo-price strong {
  color: var(--lime);
  font-family: "Archivo Black", Impact, sans-serif;
  font-size: clamp(1.45rem, 2.5vw, 1.9rem);
  font-weight: 400;
  letter-spacing: -0.02em;
}

.combo-sub {
  margin: 0.85rem 0 0;
  max-width: 30ch;
  color: rgba(28, 20, 8, 0.68);
  font-size: 1rem;
  line-height: 1.55;
}

.combo-includes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1.15rem 0 0;
  padding: 0;
  list-style: none;
}

.combo-includes li {
  margin: 0;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 253, 246, 0.9);
  border: 1px solid rgba(28, 20, 8, 0.1);
  color: #3d4450;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: none;
  transform: none;
}

.combo-promo .combo-includes li:hover {
  transform: none;
  box-shadow: none;
}

.combo-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.3rem;
  min-height: 50px;
  padding: 0.4rem 1.35rem;
  border: 0;
  border-radius: 999px;
  background: var(--lime);
  color: #1c1408;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(245, 196, 0, 0.28);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.combo-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(245, 196, 0, 0.38);
}

.combo-cta span {
  display: grid;
  place-items: center;
}

.combo-cta svg {
  width: 1rem;
  height: 1rem;
}

.combo-promo-stage {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 240px;
  padding: 0.8rem 0.25rem 0.4rem;
}

.combo-soft-podium {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 6%;
  height: 42%;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9), rgba(245, 196, 0, 0.18) 48%, transparent 72%);
  filter: blur(2px);
  pointer-events: none;
}

.combo-promo-stage img {
  position: relative;
  z-index: 1;
  width: auto;
  height: clamp(130px, 20vw, 188px);
  margin: 0 -0.45rem;
  object-fit: contain;
  filter: drop-shadow(0 16px 18px rgba(28, 20, 8, 0.18));
  transition: transform 0.4s ease;
}

.combo-promo-stage img:nth-child(2) { transform: rotate(-5deg) translateY(8px); }
.combo-promo-stage img:nth-child(3) { transform: rotate(-2deg) translateY(2px); }
.combo-promo-stage img:nth-child(4) {
  transform: translateY(-4px);
  z-index: 2;
  height: clamp(148px, 22vw, 210px);
}
.combo-promo-stage img:nth-child(5) { transform: rotate(2deg) translateY(2px); }
.combo-promo-stage img:nth-child(6) { transform: rotate(5deg) translateY(8px); }
.combo-promo-stage img:nth-child(7) { transform: rotate(7deg) translateY(12px); }

.combo-promo:hover .combo-promo-stage img:nth-child(2) {
  transform: rotate(-6deg) translateY(0);
}
.combo-promo:hover .combo-promo-stage img:nth-child(3) {
  transform: rotate(-3deg) translateY(-6px);
}
.combo-promo:hover .combo-promo-stage img:nth-child(4) {
  transform: translateY(-14px);
}
.combo-promo:hover .combo-promo-stage img:nth-child(5) {
  transform: rotate(3deg) translateY(-6px);
}
.combo-promo:hover .combo-promo-stage img:nth-child(6),
.combo-promo:hover .combo-promo-stage img:nth-child(7) {
  transform: rotate(6deg) translateY(2px);
}

@media (max-width: 1023px) {
  .combo-promo.combo-promo-banner {
    margin-top: 0.2rem;
  }

  .combo-promo-inner {
    grid-template-columns: 1fr;
    padding: 1.5rem 1.15rem 1.3rem;
  }

  .combo-badge {
    top: 0.9rem;
    right: 0.9rem;
  }

  .combo-promo-copy h2,
  .combo-promo-copy h3 {
    max-width: none;
  }

  .combo-promo-stage {
    min-height: 180px;
    order: -1;
  }

  .combo-promo-stage img {
    height: 118px;
    margin: 0 -0.35rem;
  }

  .combo-promo-stage img:nth-child(4) {
    height: 136px;
  }
}

'''

path.write_text(text[:start] + new + text[end:], encoding="utf-8")
print("ok", end - start)
