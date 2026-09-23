import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Container from "@/components/Container";
import { Facebook, Instagram } from "@/components/SocialIcons";
import { footerPageLinks, legalLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-night text-sage/75">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3 lg:py-[4.5rem]">
          <div>
            <BrandMark tone="light" />
            <ul className="mt-7 space-y-3.5 text-[0.95rem]">
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                <span>{site.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-cream"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[1.05rem] font-semibold text-cream">
              Sayfalar
            </h2>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              {footerPageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-4">
              <a
                href={site.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: ${site.instagram.label}`}
                className="transition-colors hover:text-cream"
              >
                <Instagram className="size-5" strokeWidth={1.6} />
              </a>
              <a
                href={site.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook: ${site.facebook.label}`}
                className="transition-colors hover:text-cream"
              >
                <Facebook className="size-5" strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-sans text-[1.05rem] font-semibold text-cream">
              Yasal Bilgilendirme
            </h2>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-sage/15 py-7 text-[0.85rem] text-sage/55">
          © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
        </div>
      </Container>
    </footer>
  );
}
