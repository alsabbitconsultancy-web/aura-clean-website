import { Link } from "react-router-dom";
import { CATALOG_ORDER, PRODUCTS } from "../data/products";
import { ArrowIcon } from "../components/icons";

const SIGNATURES = [
  {
    id: "charcoal",
    src: "/product-handwash-charcoal.webp?v=11",
    word: "Detox",
    name: "Hand Wash - Charcoal",
    line: "Activated charcoal for a deep, unapologetic cleanse. 99.9% protection.",
  },
  {
    id: "lemon",
    src: "/product-handwash-lemon.webp",
    word: "Citrus",
    name: "Hand Wash - Lemon",
    line: "A burst of liquid sunshine. 3X faster germs kill, as on the pack.",
  },
  {
    id: "rose",
    src: "/product-handwash-rose.webp",
    word: "Bloom",
    name: "Hand Wash - Rose",
    line: "Soft rose fragrance. Same pack care - 3X faster germs kill.",
  },
] as const;

const PILLARS = [
  { n: "01", title: "Honest actives", body: "Lemon, rose and charcoal - chosen for clarity, not noise." },
  { n: "02", title: "Whole-home care", body: "Hands, laundry, floors, dishes and bath - one complete clean." },
  { n: "03", title: "Quiet design", body: "Packaging that belongs beside a basin, not a laboratory." },
] as const;

const ordered = CATALOG_ORDER.map((id) => PRODUCTS.find((item) => item.id === id)!);

export function AboutPage() {
  return (
    <main id="main" className="lux-page">
      <header className="lux-hero">
        <p className="lux-kicker">The house</p>
        <h1>Care that belongs in the home.</h1>
        <p>
          Aura Clean is a complete hygiene house - six product lines with flavours and sizes, one standard of
          purity. From the first lather at the basin to the last wipe on the floor.
        </p>
      </header>

      <ul className="lux-stats">
        <li>
          <strong>99.9%</strong>
          <span>Germ protection</span>
        </li>
        <li>
          <strong>7</strong>
          <span>Official products</span>
        </li>
        <li>
          <strong>2</strong>
          <span>Hand wash signatures</span>
        </li>
        <li>
          <strong>pH</strong>
          <span>Balanced, every day</span>
        </li>
      </ul>

      <section className="lux-essay">
        <p className="lux-kicker">Our brief</p>
        <h2>Protection that does not feel harsh.</h2>
        <div className="lux-essay-copy">
          <p>
            We started with a simple brief: a clean you can trust, and packaging that looks at
            home beside a basin. Each formula is built around honest actives, a considered pH,
            and a finish that lasts through the day.
          </p>
          <p>
            Hand wash is the signature. The range carries the same promise through laundry,
            bathroom, floors, dishes and toilet care - no clutter, no theatre, just work done
            with restraint.
          </p>
        </div>
      </section>

      <section className="about-bands">
        {SIGNATURES.map((item) => (
          <article key={item.id} className="about-band" data-tone={item.id}>
            <span className="about-band-word" aria-hidden="true">
              {item.word}
            </span>
            <img src={item.src} alt={item.name} width={280} height={560} />
            <div>
              <p className="lux-kicker">{item.word}</p>
              <h2>{item.name}</h2>
              <p>{item.line}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-range">
        <header className="lux-head">
          <p className="lux-kicker">The collection</p>
          <h2>Every product, equally ours.</h2>
        </header>
        <ul className="about-range-grid">
          {ordered.map((item) => (
            <li key={item.id} data-sku={item.id}>
              <img src={item.src} alt={item.name} width={240} height={480} />
              <h3>{item.name}</h3>
              <span>{item.spec}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="lux-split">
        <img
          src="/family-hands.webp"
          alt="Hands held together - the Aura Clean ritual at home."
          width={1200}
          height={800}
        />
        <div>
          <p className="lux-kicker">The ritual</p>
          <h2>Because every touch matters.</h2>
          <p>
            From the first lather to the last rinse, Aura Clean is designed for the rhythm of
            family life - thorough enough to protect, gentle enough to repeat.
          </p>
          <ol className="lux-pillars">
            {PILLARS.map((item) => (
              <li key={item.n}>
                <span>{item.n}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lux-close">
        <h2>Bring the collection home.</h2>
        <p>Seven official products. One complete clean.</p>
        <Link className="cta cta-lime" to="/product">
          Explore the collection
          <span className="cta-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </section>
    </main>
  );
}
