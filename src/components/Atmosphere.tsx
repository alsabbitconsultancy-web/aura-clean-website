const DROPS = [
  { l: "10%", t: "16%", s: 8, d: "0s" },
  { l: "22%", t: "48%", s: 5, d: "0.18s" },
  { l: "36%", t: "10%", s: 6, d: "0.08s" },
  { l: "58%", t: "14%", s: 4, d: "0.24s" },
  { l: "76%", t: "28%", s: 7, d: "0.12s" },
  { l: "88%", t: "52%", s: 6, d: "0.3s" },
  { l: "70%", t: "68%", s: 5, d: "0.2s" },
  { l: "16%", t: "72%", s: 9, d: "0.05s" },
];

const BUBBLES = [
  { l: "18%", t: "32%", s: 16, d: "0.1s" },
  { l: "64%", t: "12%", s: 12, d: "0.28s" },
  { l: "84%", t: "36%", s: 20, d: "0.16s" },
  { l: "8%", t: "60%", s: 11, d: "0.34s" },
];

export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="mist mist-a" />
      <div className="mist mist-b" />
      <div className="ripple" />

      {BUBBLES.map((item) => (
        <span
          key={`b-${item.l}`}
          className="drop-enter"
          style={{ left: item.l, top: item.t, animationDelay: item.d }}
        >
          <span
            className="bubble"
            style={{ width: item.s, height: item.s, animationDelay: item.d }}
          />
        </span>
      ))}

      {DROPS.map((item) => (
        <span
          key={`d-${item.l}`}
          className="drop-enter"
          style={{ left: item.l, top: item.t, animationDelay: item.d }}
        >
          <span
            className="droplet"
            style={{
              width: item.s,
              height: item.s * 1.25,
              animationDelay: item.d,
            }}
          />
        </span>
      ))}

      <span className="spark spark-a" />
      <span className="spark spark-b" />
      <span className="spark spark-c" />
    </div>
  );
}
