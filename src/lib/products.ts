import type { ComponentType } from "react";
import {
  Droplet,
  Droplets,
  Flower2,
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
  Wind,
} from "lucide-react";

/** Shape shared by lucide icons and our own SVG components. */
export type IconComponent = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

export type ProductFeature = {
  label: string;
  Icon: IconComponent;
};

export type Product = {
  /** Stable SKU key. Doubles as the anchor on /urunler and the checkout param. */
  id: string;
  eyebrow: string;
  brand: string;
  model: string;
  /** Brand + model, e.g. "TORFADA Super Mix". */
  name: string;
  /** Pack size as shown to customers, e.g. "40 Litre". */
  size: string;
  liters: number;
  /** Unit price in TRY, or null until a real price is supplied. Never invent one. */
  price: number | null;
  /** Packaging shot, or null until real artwork is supplied. Never fabricate one. */
  image: string | null;
  imageAlt: string;
  badge: string | null;
  description: string;
  features: ProductFeature[];
};

/**
 * The 20 L pack is the same soil in a smaller bag, so both sizes share the
 * description and feature list until size-specific copy is supplied.
 */
const sharedDescription =
  "Ev, balkon, bahçe ve saksı bitkilerinde genel kullanım için geliştirilmiş doğal bitki toprağı.";

const sharedFeatures: ProductFeature[] = [
  { label: "%100 Organik Torf", Icon: Leaf },
  { label: "İyi Drenaj", Icon: Droplets },
  { label: "Daha Az Sulama", Icon: Droplet },
  { label: "Nefes Alan Toprak", Icon: Wind },
  { label: "Kimyasal İçermez", Icon: ShieldCheck },
  { label: "Saksı Bitkileri İçin Uygun", Icon: Flower2 },
  { label: "Doğaya Dost", Icon: Recycle },
  { label: "Sağlıklı ve Güçlü Bitki Gelişimi", Icon: Sprout },
];

export const products: Product[] = [
  {
    id: "40-litre",
    eyebrow: "GENEL KULLANIM BİTKİ TOPRAĞI",
    brand: "TORFADA",
    model: "Super Mix",
    name: "TORFADA Super Mix",
    size: "40 Litre",
    liters: 40,
    price: 250,
    image: "/images/products/torfada-super-mix/torfada-super-mix-40l.jpg",
    imageAlt: "TORFADA Super Mix 40 Litre Genel Kullanım Bitki Toprağı",
    badge: "%100 ORGANİK",
    description: sharedDescription,
    features: sharedFeatures,
  },
  {
    id: "20-litre",
    eyebrow: "GENEL KULLANIM BİTKİ TOPRAĞI",
    brand: "TORFADA",
    model: "Super Mix",
    name: "TORFADA Super Mix",
    size: "20 Litre",
    liters: 20,
    // Price not supplied yet — set this number and the purchase controls
    // switch on everywhere, with no layout changes needed.
    price: null,
    image: "/images/products/torfada-super-mix/torfada-super-mix-20l.png",
    imageAlt: "TORFADA Super Mix 20 Litre Genel Kullanım Bitki Toprağı",
    badge: "%100 ORGANİK",
    description: sharedDescription,
    features: sharedFeatures,
  },
];

export type PurchasableProduct = Product & { price: number };

export function isPurchasable(product: Product): product is PurchasableProduct {
  return product.price !== null;
}

export function getProduct(id: string | undefined) {
  return products.find((product) => product.id === id);
}

/**
 * The serializable slice of a product that client components need. Keeps the
 * `features` icons — which are functions — out of the server/client boundary.
 */
export type OrderItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string | null;
  imageAlt: string;
};

export function toOrderItem(product: PurchasableProduct): OrderItem {
  return {
    id: product.id,
    name: product.name,
    size: product.size,
    price: product.price,
    image: product.image,
    imageAlt: product.imageAlt,
  };
}
