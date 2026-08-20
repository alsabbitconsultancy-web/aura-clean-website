import { useState } from "react";
import { whatsappHref } from "../data/contact";
import { COMBO_INCLUDES, COMBO_PRODUCT, PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { ArrowIcon } from "./icons";

export function ComboPromoCard() {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const bottles = COMBO_INCLUDES.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id)!;
    return { ...item, src: product.src };
  });

  return (
    <section className="combo-promo combo-promo-banner" aria-label="Exclusive combo deal">
      <div className="combo-soft-glow" aria-hidden="true" />
      <em className="combo-badge">Exclusive Deal</em>

      <div className="combo-promo-inner">
        <div className="combo-promo-copy">
          <p className="lux-kicker">Home care pack</p>
          <h2>The Ultimate 6-in-1 Home Care Combo</h2>
          <p className="combo-price">
            Just at <strong>{COMBO_PRODUCT.price}</strong>
          </p>
          <p className="combo-sub">{COMBO_PRODUCT.blurb}</p>
          <ul className="combo-includes" aria-label="Included products">
            {COMBO_INCLUDES.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
          <button
            type="button"
            className="combo-cta"
            onClick={() => {
              add("combo");
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1400);
              const message =
                `Hi Aura Clean,\nI want to order:\n• ${COMBO_PRODUCT.name} (${COMBO_PRODUCT.price})\n\nPlease share availability and delivery details.`;
              window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
            }}
          >
            {added ? "Opening WhatsApp…" : "Grab This Deal"}
            <span aria-hidden="true">
              <ArrowIcon />
            </span>
          </button>
        </div>

        <div className="combo-promo-stage" aria-hidden="true">
          <div className="combo-soft-podium" />
          {bottles.map((item) => (
            <img key={item.id} src={item.src} alt="" width={120} height={220} />
          ))}
        </div>
      </div>
    </section>
  );
}
