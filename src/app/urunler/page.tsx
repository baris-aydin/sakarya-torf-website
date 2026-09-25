import type { Metadata } from "next";
import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import ProductDetailSection from "@/components/ProductDetailSection";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "TORFADA Super Mix genel kullanım bitki toprağı 40 litre ve 20 litre ambalaj seçenekleri, ürün özellikleri ve sipariş.",
};

export default function Page() {
  return (
    <>
      <section className="bg-cream pt-16 lg:pt-20">
        <Container>
          <p className="eyebrow text-moss">TORFADA SUPER MIX</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-ink">
            Ürünlerimiz
          </h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            Ev, balkon, bahçe ve saksı bitkileri için geliştirilmiş genel
            kullanım bitki toprağımız iki farklı ambalaj boyutunda sunuluyor.
          </p>
        </Container>
      </section>

      {products.map((product, index) => (
        <ProductDetailSection
          key={product.id}
          product={product}
          reverse={index % 2 === 1}
          priority={index === 0}
          className={index > 0 ? "border-t border-line" : undefined}
        />
      ))}

      <Gallery />
    </>
  );
}
