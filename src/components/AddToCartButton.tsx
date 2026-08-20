import { useState } from "react";
import { whatsappHref } from "../data/contact";
import { findProduct, type ProductId } from "../data/products";
import { useCart } from "../context/CartContext";

type Props = {
  id: ProductId;
  className?: string;
};

export function AddToCartButton({ id, className }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className ?? "add-cart"}
      onClick={() => {
        add(id);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
        const product = findProduct(id);
        const name = product?.name ?? "Aura Clean product";
        const price = product?.price ? ` (${product.price})` : "";
        const message =
          `Hi Aura Clean,\nI want to order:\n• ${name}${price}\n\nPlease share availability and delivery details.`;
        window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
      }}
    >
      {added ? "Opening WhatsApp…" : "Add to cart"}
    </button>
  );
}
