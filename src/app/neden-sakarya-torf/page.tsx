import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import { productMixture, products } from "@/lib/products";
import { whyCards } from "@/lib/why";

export const metadata: Metadata = {
  title: "Neden Sakarya Torf?",
  description:
    "TORFADA Super Mix; ev, balkon, bahçe ve saksı bitkilerinde genel kullanım için geliştirilmiş doğal bitki toprağı. Ürün özellikleri ve özel karışım bilgisi.",
};

// Every size carries the same attribute list, so the first product's is used.
const attributes = products[0].features;

export default function Page() {
  return (
    <>
      <section className="border-b border-line bg-cream py-16 lg:py-24">
        <Container>
          <p className="eyebrow text-moss">SAKARYA TORF</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] font-bold text-ink">
            Neden Sakarya Torf?
          </h1>
          <p className="mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
            TORFADA Super Mix; ev, balkon, bahçe ve saksı bitkilerinde genel
            kullanım için geliştirilmiş doğal bitki toprağıdır. Bitkileriniz
            için doğal, dengeli ve güçlü bir yetişme ortamı sunar.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <Container>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight font-bold text-ink">
            Yaklaşımımız
          </h2>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map(({ title, body, Icon }) => (
              <li
                key={title}
                className="rounded-lg border border-line bg-white p-7 shadow-[0_1px_3px_rgba(18,61,42,0.05)]"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-md bg-forest text-cream"
                >
                  <Icon className="size-5" strokeWidth={1.7} />
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

      <section className="border-t border-line bg-cream py-20 lg:py-28">
        <Container>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight font-bold text-ink">
            Ürün Özellikleri
          </h2>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            TORFADA Super Mix ambalajında yer alan ürün özellikleri.
          </p>

          <ul className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {attributes.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage text-moss"
                >
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="text-[0.98rem] leading-snug text-ink/85">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sage py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight font-bold text-ink">
              Özel Karışım
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
              TORFADA Super Mix, ithal torf, cocopeat ve woodfiber
              bileşenlerinden oluşan özel bir karışımdır. Ambalajda belirtilen
              oranlar şöyledir:
            </p>
          </div>

          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {productMixture.map(({ share, label }) => (
              <div
                key={label}
                className="rounded-lg border border-line bg-white p-7 shadow-[0_1px_3px_rgba(18,61,42,0.05)]"
              >
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-serif text-[2.4rem] leading-none font-bold text-moss">
                    {share}
                  </span>
                  <span className="mt-3 block text-[1.02rem] font-medium text-ink">
                    {label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <Container>
          <div className="rounded-xl border border-line bg-white px-7 py-12 text-center shadow-[0_1px_3px_rgba(18,61,42,0.05)] sm:px-12">
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] leading-tight font-bold text-ink">
              Ürünlerimizi İnceleyin
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[1.02rem] leading-relaxed text-muted">
              20 Litre ve 40 Litre TORFADA Super Mix seçeneklerini keşfedin.
            </p>
            <Link
              href="/urunler"
              className="mt-8 inline-flex min-h-13 items-center justify-center gap-2.5 rounded-md bg-moss px-8 text-base font-medium text-white transition-colors hover:bg-moss-dark"
            >
              Ürünleri Gör
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
