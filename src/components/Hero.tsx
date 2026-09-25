import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero/sakarya-fields-hero.jpg"
        alt="Sakarya Akyazı'da gün doğumunda uzanan ekili tarlalar"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Forest-green wash anchored to the left so the warm landscape stays visible on the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/70 to-night/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night/45 via-transparent to-night/25"
      />

      <Container>
        <div className="flex min-h-[32rem] items-center py-20 sm:min-h-[38rem] lg:min-h-[46rem] lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[1.08] font-bold text-white">
              Doğanın Gücünü
              <br className="max-sm:hidden" />{" "}
              Bitkilerinizle
              <br className="max-sm:hidden" />{" "}
              Buluşturun
            </h1>

            <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-cream/85">
              TORFADA Super Mix ile bitkileriniz için doğal, dengeli ve güçlü
              bir yetişme ortamı.
            </p>

            <p className="mt-7 text-[0.95rem] font-semibold text-white">
              40 Litre • Genel Kullanım • %100 Organik Torf
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/satin-al"
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-cream px-8 py-3.5 text-base font-medium text-forest transition-colors hover:bg-white"
              >
                Satın Al
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#urunler"
                className="inline-flex items-center justify-center rounded-md border border-white/55 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                Ürünü İncele
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
