import Container from "@/components/Container";
import ProductFeatures from "@/components/ProductFeatures";
import ProductImage from "@/components/ProductImage";
import ProductPurchase from "@/components/ProductPurchase";
import { cx } from "@/lib/cx";
import type { Product } from "@/lib/products";

type ProductDetailSectionProps = {
  product: Product;
  /** Flips the columns on desktop so stacked products alternate. */
  reverse?: boolean;
  priority?: boolean;
  className?: string;
};

export default function ProductDetailSection({
  product,
  reverse = false,
  priority = false,
  className,
}: ProductDetailSectionProps) {
  return (
    <section
      id={product.id}
      aria-labelledby={`${product.id}-baslik`}
      className={cx("scroll-mt-24 bg-cream py-20 lg:py-28", className)}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image stays first in the DOM so it sits above the copy on phones. */}
          <ProductImage
            product={product}
            sizes="(min-width: 1024px) 40vw, 92vw"
            priority={priority}
            showBadge
            className={cx(
              "aspect-[5/6] rounded-xl ring-1 ring-line/70",
              reverse && "lg:order-2",
            )}
          />

          <div className={cx(reverse && "lg:order-1")}>
            <p className="eyebrow text-muted">{product.eyebrow}</p>

            <h2
              id={`${product.id}-baslik`}
              className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-ink"
            >
              {product.brand}{" "}
              <span className="text-moss">{product.model}</span>
            </h2>

            <p className="mt-3 text-[1.15rem] font-medium text-bark">
              {product.size}
            </p>

            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              {product.description}
            </p>

            <ProductFeatures features={product.features} className="mt-9" />

            <ProductPurchase
              productId={product.id}
              size={product.size}
              price={product.price}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
