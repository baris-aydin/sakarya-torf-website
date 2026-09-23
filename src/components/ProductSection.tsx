import Image from "next/image";
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
import Container from "@/components/Container";
import ProductPurchase from "@/components/ProductPurchase";
import { product } from "@/lib/site";

const features = [
  { label: "%100 Organik Torf", Icon: Leaf },
  { label: "İyi Drenaj", Icon: Droplets },
  { label: "Daha Az Sulama", Icon: Droplet },
  { label: "Nefes Alan Toprak", Icon: Wind },
  { label: "Kimyasal İçermez", Icon: ShieldCheck },
  { label: "Saksı Bitkileri İçin Uygun", Icon: Flower2 },
  { label: "Doğaya Dost", Icon: Recycle },
  { label: "Sağlıklı ve Güçlü Bitki Gelişimi", Icon: Sprout },
];

export default function ProductSection() {
  return (
    <section id="urun" className="scroll-mt-24 bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[5/6] w-full overflow-hidden rounded-xl bg-mist ring-1 ring-line/70">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover object-center"
                priority
              />
            </div>
            <span className="absolute top-4 left-4 rounded-md bg-moss px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.1em] text-white">
              %100 ORGANİK
            </span>
          </div>

          <div>
            <p className="eyebrow text-muted">{product.eyebrow}</p>

            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-ink">
              {product.brand} <span className="text-moss">{product.model}</span>
            </h2>

            <p className="mt-3 text-[1.15rem] font-medium text-bark">
              {product.volume}
            </p>

            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              {product.description}
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {features.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-moss">
                    <Icon className="size-[1.1rem]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-[0.95rem] text-ink/85">{label}</span>
                </li>
              ))}
            </ul>

            <ProductPurchase />
          </div>
        </div>
      </Container>
    </section>
  );
}
