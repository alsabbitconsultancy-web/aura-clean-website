import { Link } from "react-router-dom";
import { ArrowIcon } from "../components/icons";

const STORIES = [
  {
    src: "/why-family.webp",
    alt: "A family washing hands together with Aura Clean Hand Wash.",
    kicker: "Hand wash",
    punch: "Clean hands. A healthier home.",
    line: "99.9% germ protection, gentle enough for every age at the sink - the first promise of a better day.",
  },
  {
    src: "/why-laundry.webp",
    alt: "Fresh laundry with Aura Clean Laundry Detergent Liquid.",
    kicker: "Laundry",
    punch: "Every load, genuinely fresh.",
    line: "Deep clean, soft fabric, and a fragrance that lasts past the fold - clothes that feel as clean as they look.",
  },
  {
    src: "/why-bathroom.webp",
    alt: "A bright bathroom cleaned with Aura Clean Disinfectant Bathroom Cleaner.",
    kicker: "Bathroom",
    punch: "Shine that actually lasts.",
    line: "10X cleaner. 99.9% germs gone. A bathroom that looks finished - not just wiped.",
  },
  {
    src: "/why-choose-aura.png",
    alt: "Aura Clean Premium Floor Cleaner used while mopping a bright living room.",
    kicker: "Floor",
    punch: "Floors that stay shining.",
    line: "10X better germ protection for everyday mopping - a clean that looks finished, and feels safe underfoot.",
  },
  {
    src: "/why-choose-dish.png",
    alt: "Aura Clean Dish Wash Liquid on a kitchen counter while washing dishes.",
    kicker: "Dish wash",
    punch: "Tough on grease. Easy on hands.",
    line: "Lemon-fresh dish wash that cuts through kitchen grease while staying gentle enough for daily dishwashing.",
  },
] as const;

const REASONS = [
  {
    n: "01",
    title: "99.9% germ protection",
    body: "A thorough cleanse formulated to protect, without stripping the skin’s comfort.",
  },
  {
    n: "02",
    title: "Natural actives",
    body: "Botanical notes - lemon, rose and charcoal - chosen for clarity, not noise.",
  },
  {
    n: "03",
    title: "Gentle, every day",
    body: "pH balanced, paraben free and dermatologically tested for family use.",
  },
  {
    n: "04",
    title: "A finish you feel",
    body: "Soft hands, a fresh close, and a ritual that stays quiet on the counter.",
  },
] as const;

export function WhyPage() {
  return (
    <main id="main" className="lux-page why-page">
      <header className="lux-hero">
        <p className="lux-kicker">Why Aura Clean</p>
        <h1>Because every home deserves a cleaner kind of care.</h1>
        <p>
          Real rooms. Official bottles. Protection that feels gentle - and looks this considered
          in daily life.
        </p>
      </header>

      <div className="why-stories">
        {STORIES.map((item, index) => (
          <article
            key={item.punch}
            className={`why-story${index % 2 ? " is-flip" : ""}`}
            data-shot={item.kicker.toLowerCase().replace(/\s+/g, "-")}
          >
            <img src={item.src} alt={item.alt} width={1024} height={700} />
            <div>
              <p className="lux-kicker">{item.kicker}</p>
              <h2>{item.punch}</h2>
              <p>{item.line}</p>
            </div>
          </article>
        ))}
      </div>

      <ol className="lux-why why-grid-lux">
        {REASONS.map((item) => (
          <li key={item.title}>
            <span>{item.n}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>

      <div className="lux-close">
        <h2>Bring Aura Clean home.</h2>
        <p>Nine official products. One complete clean - from hands to floors.</p>
        <Link className="cta cta-lime" to="/product">
          Explore the collection
          <span className="cta-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </main>
  );
}
