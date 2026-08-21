export type ProductId =
  | "hand-wash"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish"
  | "combo"
  /** Legacy cart / deep-link ids */
  | "charcoal"
  | "lemon"
  | "rose"
  | "floor-lemon"
  | "floor-rose";

export type CategoryId =
  | "all"
  | "hand-wash"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish";

export type ProductFlavor = {
  id: string;
  label: string;
  src: string;
  tone?: string;
};

export type Product = {
  id: ProductId;
  name: string;
  category: Exclude<CategoryId, "all">;
  src: string;
  tone: string;
  blurb: string;
  spec: string;
  /** Default / summary volume shown before a size is picked. */
  volume: string;
  price?: string;
  flavors?: ProductFlavor[];
  sizes?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "hand-wash",
    name: "Hand Wash",
    category: "hand-wash",
    src: "/product-handwash-charcoal.webp?v=11",
    tone: "#222",
    blurb: "Deep cleanse and lasting protection — pick your favourite fragrance.",
    spec: "99.9% Cleaning Protection",
    volume: "250 ml – 5 Ltr",
    flavors: [
      {
        id: "charcoal",
        label: "Charcoal",
        src: "/product-handwash-charcoal.webp?v=11",
        tone: "#222",
      },
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-handwash-lemon.webp",
        tone: "#e6b422",
      },
      {
        id: "rose",
        label: "Rose",
        src: "/product-handwash-rose.webp",
        tone: "#e85a9b",
      },
    ],
    sizes: ["250 ml", "500 ml", "600 ml", "5 Ltr"],
  },
  {
    id: "toilet",
    name: "Powerful Toilet Cleaner",
    category: "toilet",
    src: "/product-toilet.webp?v=3",
    tone: "#1c4fa0",
    blurb: "10x Power. Removes tough stains. Fresh fragrance. Deep cleaning.",
    spec: "Kills 99.9% Germs",
    volume: "500 ml – 1 Ltr",
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "bathroom",
    name: "Disinfectant Bathroom Cleaner",
    category: "bathroom",
    src: "/product-bathroom.webp?v=3",
    tone: "#6e1010",
    blurb: "10X better cleaning for sinks, tiles and fittings.",
    spec: "Kills 99.9% Germs",
    volume: "500 ml – 1 Ltr",
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "laundry",
    name: "Laundry Detergent Liquid",
    category: "laundry",
    src: "/product-laundry.webp?v=7",
    tone: "#3d7ad6",
    blurb: "Deep clean. Fresh fragrance. Gentle on fabric.",
    spec: "1 Ltr · 5 Ltr",
    volume: "1 Ltr – 5 Ltr",
    sizes: ["1 Ltr", "5 Ltr"],
  },
  {
    id: "floor",
    name: "Premium Floor Cleaner",
    category: "floor",
    src: "/product-floor-lemon.webp?v=3",
    tone: "#7b4fd1",
    blurb: "Shining long-lasting fragrance with 10X germ protection — three fresh options.",
    spec: "10X Better Germ Protection",
    volume: "500 ml – 1 Ltr",
    flavors: [
      {
        id: "lavender",
        label: "Lavender",
        src: "/product-floor-lemon.webp?v=3",
        tone: "#7b4fd1",
      },
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-floor-lemon.webp?v=3",
        tone: "#8a6a20",
      },
      {
        id: "rose",
        label: "Rose",
        src: "/product-floor-lemon.webp?v=3",
        tone: "#9b4fc4",
      },
    ],
    sizes: ["500 ml", "1 Ltr"],
  },
  {
    id: "dish",
    name: "Dish Wash Liquid",
    category: "dish",
    src: "/product-dish.webp?v=3",
    tone: "#c5a000",
    blurb: "Tough on grease. Gentle on hands. Fresh lemon fragrance.",
    spec: "Powerful Grease Removal",
    volume: "1 Ltr",
    sizes: ["1 Ltr"],
  },
];

/** Promo pack - cart only, not listed as a regular catalog SKU. */
export const COMBO_PRODUCT: Product = {
  id: "combo",
  name: "6-in-1 Home Care Combo",
  category: "hand-wash",
  src: "/product-handwash-charcoal.webp?v=11",
  tone: "#1c1408",
  blurb: "6 Essentials. 1 Family. Total Home Hygiene.",
  spec: "Laundry · Floor · Dish · Bath · Toilet · Hand Wash",
  volume: "Combo pack",
  price: "₹349",
  sizes: ["Combo pack"],
};

export const COMBO_INCLUDES = [
  { id: "laundry" as const, label: "Laundry" },
  { id: "floor" as const, label: "Floor" },
  { id: "dish" as const, label: "Dish" },
  { id: "bathroom" as const, label: "Bath" },
  { id: "toilet" as const, label: "Toilet" },
  { id: "hand-wash" as const, label: "Hand Wash" },
] as const;

export function resolveProductId(id: ProductId): ProductId {
  if (id === "charcoal" || id === "lemon" || id === "rose") return "hand-wash";
  if (id === "floor-lemon" || id === "floor-rose") return "floor";
  return id;
}

export function findProduct(id: ProductId): Product | undefined {
  if (id === "combo") return COMBO_PRODUCT;
  const resolved = resolveProductId(id);
  return PRODUCTS.find((item) => item.id === resolved) ?? (resolved === "combo" ? COMBO_PRODUCT : undefined);
}

export function defaultFlavor(product: Product): string | undefined {
  return product.flavors?.[0]?.id;
}

export function defaultSize(product: Product): string {
  return product.sizes?.[0] ?? product.volume;
}

export function flavorOf(product: Product, flavorId?: string): ProductFlavor | undefined {
  if (!product.flavors?.length) return undefined;
  return product.flavors.find((item) => item.id === flavorId) ?? product.flavors[0];
}

export function formatVariantLabel(
  product: Product,
  flavorId?: string,
  size?: string,
): string {
  const flavor = flavorOf(product, flavorId)?.label;
  const parts = [product.name, flavor, size].filter(Boolean);
  return parts.join(" · ");
}

export function cartLineKey(id: ProductId, flavor: string | undefined, size: string): string {
  return `${resolveProductId(id)}__${flavor ?? "-"}__${size}`;
}

export const HAND_WASH = PRODUCTS.filter((item) => item.category === "hand-wash");
export const RANGE_PRODUCTS = PRODUCTS.filter((item) => item.category !== "hand-wash");

export const CATALOG_ORDER: ProductId[] = [
  "hand-wash",
  "toilet",
  "bathroom",
  "laundry",
  "floor",
  "dish",
];

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "hand-wash", label: "Hand Wash" },
  { id: "toilet", label: "Powerful Toilet Cleaner" },
  { id: "bathroom", label: "Disinfectant Bathroom Cleaner" },
  { id: "laundry", label: "Laundry Detergent Liquid" },
  { id: "floor", label: "Premium Floor Cleaner" },
  { id: "dish", label: "Dish Wash Liquid" },
];
