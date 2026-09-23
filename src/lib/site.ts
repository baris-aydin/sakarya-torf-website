export const site = {
  name: "Sakarya Torf",
  /** Wordmark as it appears next to the brand icon. */
  displayName: "SAKARYA TORF",
  location: "Akyazı / Sakarya",
  phone: "0533 938 54 22",
  phoneHref: "tel:+905339385422",
  instagram: {
    label: "@sakaryatorf",
    href: "https://www.instagram.com/sakaryatorf",
  },
  facebook: {
    label: "/sakaryatorf",
    href: "https://www.facebook.com/sakaryatorf",
  },
} as const;

export const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürün", href: "/#urun" },
  { label: "Neden Sakarya Torf?", href: "/#neden-sakarya-torf" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const footerPageLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürün", href: "/#urun" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const legalLinks = [
  { label: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis-sozlesmesi" },
  { label: "Ön Bilgilendirme Formu", href: "/on-bilgilendirme-formu" },
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Teslimat ve İade Koşulları", href: "/teslimat-ve-iade-kosullari" },
] as const;

/** Unit price of one TORFADA Super Mix 40 L bag, in TRY. */
export const PRICE_PER_UNIT = 250;

/** Shipping is free — this stays 0 in every calculation. */
export const SHIPPING_COST = 0;

/**
 * Turkish currency formatting with `.` thousands separators, done by hand so
 * server and client always produce the same string.
 */
export function formatPrice(value: number) {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `₺${grouped}`;
}

export const product = {
  eyebrow: "GENEL KULLANIM BİTKİ TOPRAĞI",
  brand: "TORFADA",
  model: "Super Mix",
  name: "TORFADA Super Mix",
  volume: "40 Litre",
  description:
    "Ev, balkon, bahçe ve saksı bitkilerinde genel kullanım için geliştirilmiş doğal bitki toprağı.",
  image: "/images/product/torfada-super-mix.png",
  imageAlt: "TORFADA Super Mix 40 litre genel kullanım bitki toprağı ambalajı",
  price: formatPrice(PRICE_PER_UNIT),
  shippingLabel: "Ücretsiz",
} as const;

export const MAX_QUANTITY = 99;
