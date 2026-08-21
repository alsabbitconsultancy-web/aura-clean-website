export type ProductId =
  | "lemon"
  | "charcoal"
  | "rose"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish"
  | "combo";

export type CategoryId =
  | "all"
  | "hand-wash"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish";

export type Product = {
  id: ProductId;
  name: string;
  category: Exclude<CategoryId, "all">;
  src: string;
  tone: string;
  blurb: string;
  spec: string;
  volume: string;
  price?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "lemon",
    name: "Hand Wash - Lemon",
    category: "hand-wash",
    src: "/product-handwash-lemon.webp",
    tone: "#e6b422",
    blurb: "Freshness of lemon with a deep, lasting clean.",
    spec: "3X Faster Germs Kill",
    volume: "Pump bottle",
  },
  {
    id: "charcoal",
    name: "Hand Wash - Charcoal",
    category: "hand-wash",
    src: "/product-handwash-charcoal.webp?v=11",
    tone: "#222",
    blurb: "Activated charcoal for a purifying everyday cleanse.",
    spec: "99.9% Cleaning Protection",
    volume: "Pump bottle",
  },
  {
    id: "rose",
    name: "Hand Wash - Rose",
    category: "hand-wash",
    src: "/product-handwash-rose.webp",
    tone: "#e85a9b",
    blurb: "Soft rose fragrance with the same deep, lasting clean.",
    spec: "3X Faster Germs Kill",
    volume: "Pump bottle",
  },
  {
    id: "toilet",
    name: "Powerful Toilet Cleaner",
    category: "toilet",
    src: "/product-toilet.webp?v=3",
    tone: "#1c4fa0",
    blurb: "10x Power. Removes tough stains. Fresh fragrance. Deep cleaning.",
    spec: "Kills 99.9% Germs",
    volume: "1L",
  },
  {
    id: "bathroom",
    name: "Disinfectant Bathroom Cleaner",
    category: "bathroom",
    src: "/product-bathroom.webp?v=3",
    tone: "#6e1010",
    blurb: "10X better cleaning for sinks, tiles and fittings.",
    spec: "Kills 99.9% Germs",
    volume: "1L",
  },
  {
    id: "laundry",
    name: "Laundry Detergent Liquid",
    category: "laundry",
    src: "/product-laundry.webp?v=3",
    tone: "#3d7ad6",
    blurb: "Deep clean. Fresh fragrance. Gentle on fabric.",
    spec: "1 Ltr. Net Content",
    volume: "1 Ltr",
  },
  {
    id: "floor",
    name: "Premium Floor Cleaner",
    category: "floor",
    src: "/product-floor.webp?v=4",
    tone: "#7b4fd1",
    blurb: "Disinfectant surface cleaner. Clean, shine, protect.",
    spec: "10X Better Cleaning Than Phenyl · Lavender",
    volume: "1 Ltr",
  },
  {
    id: "dish",
    name: "Dish Wash Liquid",
    category: "dish",
    src: "/product-dish.webp?v=3",
    tone: "#c5a000",
    blurb: "Tough on grease. Gentle on hands. Fresh lemon fragrance.",
    spec: "Powerful Grease Removal",
    volume: "Family pack",
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
};

export const COMBO_INCLUDES = [
  { id: "laundry" as const, label: "Laundry" },
  { id: "floor" as const, label: "Floor" },
  { id: "dish" as const, label: "Dish" },
  { id: "bathroom" as const, label: "Bath" },
  { id: "toilet" as const, label: "Toilet" },
  { id: "charcoal" as const, label: "Hand Wash" },
] as const;

export function findProduct(id: ProductId): Product | undefined {
  if (id === "combo") return COMBO_PRODUCT;
  return PRODUCTS.find((item) => item.id === id);
}

export const HAND_WASH = PRODUCTS.filter((item) => item.category === "hand-wash");
export const RANGE_PRODUCTS = PRODUCTS.filter((item) => item.category !== "hand-wash");

/** Catalog grid: home care leads; hand washes follow so the open isn't only pumps. */
export const CATALOG_ORDER: ProductId[] = [
  "toilet",
  "bathroom",
  "laundry",
  "floor",
  "dish",
  "charcoal",
  "lemon",
  "rose",
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
