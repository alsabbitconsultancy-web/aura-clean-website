const DROPS = [
  { l: "18%", t: "10%", s: 8, d: "0.08s" },
  { l: "36%", t: "6%", s: 5, d: "0.22s" },
  { l: "58%", t: "12%", s: 7, d: "0.14s" },
  { l: "74%", t: "8%", s: 6, d: "0.3s" },
  { l: "86%", t: "28%", s: 9, d: "0.18s" },
  { l: "64%", t: "62%", s: 6, d: "0.36s" },
  { l: "48%", t: "18%", s: 4, d: "0.42s" },
  { l: "92%", t: "48%", s: 7, d: "0.26s" },
];

export function IngredientScene() {
  return (
    <div className="ing-scene" aria-hidden="true">
      <div className="ing-enter lemon-enter">
        <div className="ing-float lemon-float">
          <img src="/lemon-float.webp" alt="" width={520} height={520} />
        </div>
      </div>

      <div className="ing-enter coal-enter">
        <div className="ing-float coal-float">
          <img src="/charcoal-float.webp" alt="" width={320} height={294} />
        </div>
      </div>

      {DROPS.map((drop) => (
        <span
          key={`${drop.l}-${drop.t}`}
          className="ing-enter drop-enter"
          style={{ left: drop.l, top: drop.t, animationDelay: drop.d }}
        >
          <span
            className="scene-drop"
            style={{ width: drop.s, height: drop.s * 1.28, animationDelay: drop.d }}
          />
        </span>
      ))}
    </div>
  );
}
