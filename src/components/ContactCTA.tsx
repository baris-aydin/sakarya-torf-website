import Link from "next/link";
import Container from "@/components/Container";

export default function ContactCTA() {
  return (
    <section className="bg-moss py-16 lg:py-[4.5rem]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.4rem)] leading-tight font-bold text-cream">
              Bizimle İletişime Geçin
            </h2>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-cream/80">
              Ürünlerimiz veya siparişiniz hakkında sorularınız için bize
              ulaşabilirsiniz.
            </p>
          </div>

          <Link
            href="/iletisim"
            className="inline-flex shrink-0 items-center justify-center self-start rounded-md bg-cream px-8 py-3.5 text-base font-medium text-forest transition-colors hover:bg-white lg:self-auto"
          >
            İletişime Geç
          </Link>
        </div>
      </Container>
    </section>
  );
}
