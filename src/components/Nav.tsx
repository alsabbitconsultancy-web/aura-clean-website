import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  CartIcon,
  HomeIcon,
  LeafIcon,
  LifeIcon,
  PinIcon,
  StarShieldIcon,
} from "./icons";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/about", label: "About Us" },
  { to: "/why", label: "Why Aura Clean" },
  { to: "/contact", label: "Contact Us" },
] as const;

const DOCK = [
  { to: "/product", label: "Shop", Icon: LeafIcon },
  { to: "/about", label: "About", Icon: LifeIcon },
  { to: "/", label: "Home", Icon: HomeIcon, home: true },
  { to: "/why", label: "Why", Icon: StarShieldIcon },
  { to: "/contact", label: "Contact", Icon: PinIcon },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const { count, setOpen: setCartOpen } = useCart();

  return (
    <>
      <header className={`site-nav${home ? " is-home" : ""}`}>
        <div className="nav-end">
          <nav className="nav-desktop" aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="nav-cart"
            aria-label={count ? `Open cart, ${count} items` : "Open cart"}
            onClick={() => setCartOpen(true)}
          >
            <CartIcon />
            {count > 0 ? <span className="nav-cart-count">{count}</span> : null}
          </button>
        </div>
      </header>

      <nav className="mobile-dock" aria-label="Mobile primary">
        {DOCK.map((item) => {
          const Icon = item.Icon;
          const isHome = "home" in item && item.home;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `mobile-dock-link${isHome ? " is-home-btn" : ""}${isActive ? " is-active" : ""}`
              }
            >
              <span className="mobile-dock-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="mobile-dock-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
