import { Link, NavLink } from "react-router-dom";
import { CATALOG_ORDER, PRODUCTS } from "../data/products";
import { ADDRESS, EMAIL, ENQUIRY, PHONE, SOCIAL } from "../data/contact";
import { useCart } from "../context/CartContext";
import { ArrowIcon, FacebookIcon, InstagramIcon } from "./icons";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/about", label: "About Us" },
  { to: "/why", label: "Why Aura Clean" },
  { to: "/contact", label: "Contact Us" },
] as const;

const RANGE = CATALOG_ORDER.map((id) => PRODUCTS.find((item) => item.id === id)!);

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function Footer() {
  const { setOpen, count } = useCart();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="nav-logo">
            <img src="/aura-logo.png?v=2" alt="Aura Clean" width={180} height={72} />
          </Link>
          <p className="tagline">
            Because every touch <em>matters.</em>
          </p>
          <p className="footer-line">Care that protects. Purity that shows.</p>
          <Link className="cta cta-lime" to="/product">
            Shop the range
            <span className="cta-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
          <ul className="footer-social" aria-label="Social media">
            {SOCIAL.map((item) => {
              const Icon = SOCIAL_ICONS[item.id];
              return (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="lux-kicker">Explore</p>
          <ul className="footer-links">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="The range">
          <p className="lux-kicker">The range</p>
          <ul className="footer-links">
            {RANGE.map((item) => (
              <li key={item.id}>
                <Link to="/product">{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="lux-kicker">Contact</p>
          <ul className="footer-links">
            <li>
              <a href={ENQUIRY.href}>Enquiry · {ENQUIRY.display}</a>
            </li>
            <li>
              <a href={PHONE.href}>Phone · {PHONE.display}</a>
            </li>
            <li>
              <a href={EMAIL.href} className="footer-email">
                {EMAIL.display}
              </a>
            </li>
            <li>
              <a href={ADDRESS.maps} target="_blank" rel="noreferrer" className="footer-address">
                {ADDRESS.display}
              </a>
            </li>
            <li>
              <Link to="/contact">Enquire to order</Link>
            </li>
            <li>
              <button type="button" className="footer-cart" onClick={() => setOpen(true)}>
                Cart{count ? ` · ${count}` : ""}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bar">
        <p>© 2026 Aura Clean. Official bottles, named as on the pack.</p>
        <p>Manufactured by Laiba Lubricants Pvt. Ltd.</p>
        <p>Pure Hands, Pure Care.</p>
      </div>
    </footer>
  );
}
