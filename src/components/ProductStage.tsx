import { IngredientScene } from "./IngredientScene";

type Props = { dense?: boolean };

export function ProductStage({ dense = false }: Props) {
  return (
    <div className={dense ? "product-stage is-dense" : "product-stage"}>
      <IngredientScene />
      <img
        className="product-photo"
        src="/hero-products.webp"
        alt="Aura Clean Hand Wash in Lemon and Charcoal."
        width={1536}
        height={1024}
      />
    </div>
  );
}
