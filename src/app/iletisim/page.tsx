import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { Facebook, Instagram } from "@/components/SocialIcons";
import { site } from "@/lib/site";

type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Sakarya Torf ile iletişime geçin. Ürünlerimiz veya siparişiniz hakkında sorularınız için bize ulaşabilirsiniz.",
};

const details: Array<{
  Icon: IconComponent;
  label: string;
  href?: string;
}> = [
  { Icon: MapPin, label: site.location },
  { Icon: Phone, label: site.phone, href: site.phoneHref },
  { Icon: Instagram, label: site.instagram.label, href: site.instagram.href },
  { Icon: Facebook, label: site.facebook.label, href: site.facebook.href },
];

export default function Page() {
  return (
    <>
      <section className="bg-moss py-16 lg:py-20">
        <Container>
          <p className="eyebrow text-sage/80">SİZE YARDIMCI OLALIM</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-cream">
            Bizimle İletişime Geçin
          </h1>
          <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-cream/80">
            Ürünlerimiz veya siparişiniz hakkında sorularınız için bize
            ulaşabilirsiniz.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.6rem,2.6vw,2rem)] font-bold text-ink">
                {site.name}
              </h2>

              <ul className="mt-8 space-y-6">
                {details.map(({ Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md text-moss">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-[1rem] text-ink/85 transition-colors hover:text-moss"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-[1rem] text-ink/85">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
