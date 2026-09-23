import { HeartHandshake, Leaf, Sprout } from "lucide-react";
import Container from "@/components/Container";
import { cx } from "@/lib/cx";

const cards = [
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

export default function WhySakaryaTorf() {
  return (
    <section
      id="neden-sakarya-torf"
      className="scroll-mt-24 bg-sage py-20 lg:py-28"
    >
      <Container>
        <h2 className="text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-ink">
          Neden Sakarya Torf?
        </h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {cards.map(({ title, body, Icon }, index) => (
            <li
              key={title}
              className={cx(
                "rounded-lg border border-line bg-cream p-7 shadow-[0_1px_3px_rgba(18,61,42,0.05)]",
                // The odd card out fills the tablet row instead of leaving a gap.
                index === 2 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-md bg-forest text-cream">
                <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-sans text-[1.05rem] font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-3.5 text-[0.92rem] leading-relaxed text-muted">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
