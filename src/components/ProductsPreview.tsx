import Container from "@/components/Container";
import ProductPreviewCard from "@/components/ProductPreviewCard";
import { products } from "@/lib/products";

export default function ProductsPreview() {
  return (
    <section id="urunler" className="scroll-mt-24 bg-cream py-20 lg:py-28">
      <Container>
        <p className="eyebrow text-moss">TORFADA SUPER MIX</p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-ink">
          Ürünlerimiz
        </h2>
        <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
          Genel kullanım bitki toprağımız iki farklı ambalaj boyutunda
          sunuluyor. Ayrıntılar ve sipariş için ürünü inceleyin.
        </p>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:mt-14 lg:grid-cols-2">
          {products.map((product, index) => (
            <ProductPreviewCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
