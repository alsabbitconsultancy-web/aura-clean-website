export type ProductId =
  | "hand-wash"
  | "toilet"
  | "bathroom"
  | "laundry"
  | "floor"
  | "dish"
  | "combo"
  | "combo-kitchen"
  | "combo-shine"
  | "combo-trio"
  /** Legacy cart / deep-link ids */
  | "charcoal"
  | "lemon"
  | "rose"
  | "floor-lemon"
  | "floor-rose";

export type OfferTheme = "featured" | "citrus" | "blush" | "ink";

export type OfferInclude = {
  id: "hand-wash" | "toilet" | "bathroom" | "laundry" | "floor" | "dish";
  label: string;
  flavor?: string;
};

export type OfferDeal = {
  id: Extract<ProductId, "combo" | "combo-kitchen" | "combo-shine" | "combo-trio">;
  badge: string;
  title: string;
  blurb: string;
  price: string;
  was?: string;
  saveLabel: string;
  theme: OfferTheme;
  includes: OfferInclude[];
};

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
        tone: "#f0c400",
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
    src: "/product-floor-lavender.webp?v=1",
    tone: "#7b4fd1",
    blurb: "Plant-extract powered shine — pick Lavender, Lemon Fresh, or Rose Fresh.",
    spec: "10X Litter & Bacteria Stronger Clean",
    volume: "500 ml – 1 Ltr",
    flavors: [
      {
        id: "lavender",
        label: "Lavender",
        src: "/product-floor-lavender.webp?v=1",
        tone: "#7b4fd1",
      },
      {
        id: "lemon",
        label: "Lemon",
        src: "/product-floor-lemon.webp?v=5",
        tone: "#f0c400",
      },
      {
        id: "rose",
        label: "Rose",
        src: "/product-floor-rose.webp?v=8",
        tone: "#e85a9b",
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

/** Combo / offer packs — cart only, not listed as regular catalog SKUs. */
export const OFFERS: OfferDeal[] = [
  {
    id: "combo",
    badge: "Best value",
    title: "6-in-1 Home Care Combo",
    blurb: "Six essentials in one pack — laundry, floor, dish, bath, toilet and hand wash for the whole home.",
    price: "₹349",
    was: "₹499",
    saveLabel: "Save ₹150",
    theme: "featured",
    includes: [
      { id: "laundry", label: "Laundry" },
      { id: "floor", label: "Floor", flavor: "lavender" },
      { id: "dish", label: "Dish" },
      { id: "bathroom", label: "Bath" },
      { id: "toilet", label: "Toilet" },
      { id: "hand-wash", label: "Hand Wash", flavor: "charcoal" },
    ],
  },
  {
    id: "combo-kitchen",
    badge: "Kitchen deal",
    title: "Kitchen Fresh Duo",
    blurb: "Grease-cutting dish wash paired with lemon hand wash for a brighter sink ritual.",
    price: "₹199",
    was: "₹259",
    saveLabel: "Save ₹60",
    theme: "citrus",
    includes: [
      { id: "dish", label: "Dish Wash" },
      { id: "hand-wash", label: "Hand Wash", flavor: "lemon" },
    ],
  },
  {
    id: "combo-shine",
    badge: "Shine pair",
    title: "Floor & Bath Shine",
    blurb: "Lavender floor cleaner plus disinfectant bathroom spray for rooms that actually look finished.",
    price: "₹249",
    was: "₹319",
    saveLabel: "Save ₹70",
    theme: "blush",
    includes: [
      { id: "floor", label: "Floor", flavor: "lavender" },
      { id: "bathroom", label: "Bathroom" },
    ],
  },
  {
    id: "combo-trio",
    badge: "Flavour pack",
    title: "Hand Wash Flavour Trio",
    blurb: "Charcoal, Lemon and Rose — three fragrances so every sink in the house can pick a favourite.",
    price: "₹299",
    was: "₹369",
    saveLabel: "Save ₹70",
    theme: "ink",
    includes: [
      { id: "hand-wash", label: "Charcoal", flavor: "charcoal" },
      { id: "hand-wash", label: "Lemon", flavor: "lemon" },
      { id: "hand-wash", label: "Rose", flavor: "rose" },
    ],
  },
];

function offerToProduct(offer: OfferDeal): Product {
  return {
    id: offer.id,
    name: offer.title,
    category: "hand-wash",
    src:
      PRODUCTS.find((p) => p.id === offer.includes[0]?.id)?.src ??
      "/product-handwash-charcoal.webp?v=11",
    tone: "#1c1408",
    blurb: offer.blurb,
    spec: offer.includes.map((item) => item.label).join(" · "),
    volume: "Combo pack",
    price: offer.price,
    sizes: ["Combo pack"],
  };
}

export const COMBO_PRODUCTS: Product[] = OFFERS.map(offerToProduct);

/** @deprecated Prefer OFFERS[0] — kept for older imports. */
export const COMBO_PRODUCT = COMBO_PRODUCTS[0]!;

/** @deprecated Prefer OFFERS[0].includes */
export const COMBO_INCLUDES = OFFERS[0]!.includes;

export function resolveProductId(id: ProductId): ProductId {
  if (id === "charcoal" || id === "lemon" || id === "rose") return "hand-wash";
  if (id === "floor-lemon" || id === "floor-rose") return "floor";
  return id;
}

export function findProduct(id: ProductId): Product | undefined {
  const resolved = resolveProductId(id);
  const combo = COMBO_PRODUCTS.find((item) => item.id === resolved);
  if (combo) return combo;
  return PRODUCTS.find((item) => item.id === resolved);
}

export function offerBottleSrc(include: OfferInclude): string {
  const product = PRODUCTS.find((item) => item.id === include.id);
  if (!product) return "/product-handwash-charcoal.webp?v=11";
  if (include.flavor) {
    return product.flavors?.find((f) => f.id === include.flavor)?.src ?? product.src;
  }
  return product.src;
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
