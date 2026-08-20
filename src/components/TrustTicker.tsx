import { FamilyIcon, LifeIcon, StarShieldIcon } from "./icons";

const ITEMS = [
  { icon: StarShieldIcon, label: "Trusted Protection" },
  { icon: FamilyIcon, label: "Everyday Care for Your Family" },
  { icon: LifeIcon, label: "Clean Hands, Healthy Life" },
] as const;

const LOOP = [...ITEMS, ITEMS[0]];

export function TrustTicker() {
  return (
    <div className="trust-ticker">
      <div className="ticker-mask">
        <ul className="ticker-up">
          {LOOP.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={`${item.label}-${index}`}>
                <Icon />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
