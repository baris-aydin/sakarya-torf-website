import Image from "next/image";
import Container from "@/components/Container";

export default function BrandStory() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/brand/countryside.jpg"
              alt="Sakarya kırsalında gün batımında filizlenen ekili tarlalar"
              fill
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="eyebrow text-moss">SAKARYA&apos;DAN EVİNİZE</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)] leading-tight font-bold text-ink">
              Doğadan Gelen Verim
            </h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-loose text-muted">
              Kaliteyi ve bitki sağlığını merkeze alıyor; doğal içerik,
              güvenilir üretim ve müşteri memnuniyetiyle iyi bir başlangıç
              sunuyoruz.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
