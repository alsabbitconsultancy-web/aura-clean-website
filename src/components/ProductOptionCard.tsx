import { useState } from "react";
import {
  defaultFlavor,
  defaultSize,
  flavorOf,
  formatVariantLabel,
  type Product,
} from "../data/products";
import { AddToCartButton } from "./AddToCartButton";

type CardProps = {
  product: Product;
  mark?: string;
  layout?: "grid" | "range";
};

function flavorInk(flavorId?: string, tone?: string): string {
  if (
    flavorId === "lemon" ||
    tone === "#e6b422" ||
    tone === "#c5a000" ||
    tone === "#c4a000" ||
    tone === "#f0c400"
  ) {
    return "#1c1408";
  }
  return "#fff8ee";
}

export function ProductOptionCard({ product, mark, layout = "grid" }: CardProps) {
  const [flavorId, setFlavorId] = useState(defaultFlavor(product));
  const [size, setSize] = useState(defaultSize(product));
  const active = flavorOf(product, flavorId);
  const src = active?.src ?? product.src;
  const tone = active?.tone ?? product.tone;
  const ink = flavorInk(flavorId, tone);

  const isRange = layout === "range";

  return (
    <li
      id={product.id}
      data-sku={product.id}
      data-flavor={flavorId ?? ""}
      style={{ background: tone, color: ink }}
    >
      {mark ? <em className="product-mark">{mark}</em> : null}
      <div className={isRange ? "range-stage" : "product-visual"}>
        <img src={src} alt={formatVariantLabel(product, flavorId, size)} width={320} height={520} />
      </div>
      <div className={isRange ? undefined : "product-meta"}>
        <span className={isRange ? "range-vol" : "product-vol"}>{size}</span>
        <h3>{product.name}</h3>
        <p>{product.blurb}</p>
        {!isRange ? <strong className="product-spec">{product.spec}</strong> : null}

        {product.flavors && product.flavors.length > 1 ? (
          <div className="option-block">
            <p className="option-label">Flavour</p>
            <div className="option-row" role="group" aria-label={`${product.name} flavour`}>
              {product.flavors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`option-chip${flavorId === item.id ? " is-active" : ""}`}
                  aria-pressed={flavorId === item.id}
                  onClick={() => setFlavorId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {product.sizes && product.sizes.length > 1 ? (
          <div className="option-block">
            <p className="option-label">Size</p>
            <div className="option-row" role="group" aria-label={`${product.name} size`}>
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`option-chip${size === item ? " is-active" : ""}`}
                  aria-pressed={size === item}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : product.sizes?.length === 1 ? (
          <div className="option-block">
            <p className="option-label">Size</p>
            <div className="option-row" role="group" aria-label={`${product.name} size`}>
              <span className="option-chip is-active is-static">{product.sizes[0]}</span>
            </div>
          </div>
        ) : null}

        <AddToCartButton id={product.id} flavor={flavorId} size={size} />
      </div>
    </li>
  );
}
