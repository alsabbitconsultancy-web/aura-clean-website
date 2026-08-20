import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartIcon, CloseIcon, MenuIcon } from "./icons";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/about", label: "About Us" },
  { to: "/why", label: "Why Aura Clean" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const home = pathname === "/";
  const { count, setOpen: setCartOpen } = useCart();

  return (
    <header className={`site-nav${home ? " is-home" : ""}`}>
      <span className="nav-logo-spacer" aria-hidden="true" />
      <div className="nav-end">
        <nav id="site-menu" className={open ? "is-open" : undefined}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
            >
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
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
    </header>
  );
}
