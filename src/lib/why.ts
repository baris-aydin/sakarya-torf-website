import { HeartHandshake, Leaf, Sprout } from "lucide-react";
import type { IconComponent } from "@/lib/products";

export type WhyCard = {
  title: string;
  body: string;
  Icon: IconComponent;
};

/**
 * Shared by the homepage teaser and the dedicated /neden-sakarya-torf page,
 * so the two never drift apart.
 */
export const whyCards: WhyCard[] = [
  {
    title: "Kaliteye Önem Veriyoruz",
    body: "Ürünlerimizi bitkilerinizin sağlıklı gelişimini destekleyecek şekilde özenle hazırlıyoruz.",
    Icon: Sprout,
  },
  {
    title: "Doğal İçerik",
    body: "Bitkileriniz için doğal ve güvenilir bir yetişme ortamı sunmayı hedefliyoruz.",
    Icon: Leaf,
  },
  {
    title: "Müşteri Memnuniyeti",
    body: "Her aşamada ulaşılabilir olmaya önem veriyoruz.",
    Icon: HeartHandshake,
  },
];
