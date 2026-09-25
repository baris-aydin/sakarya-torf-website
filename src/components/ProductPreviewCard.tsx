import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/site";

type ProductPreviewCardProps = {
  product: Product;
  priority?: boolean;
};

export default function ProductPreviewCard({
  product,
  priority = false,
}: ProductPreviewCardProps) {
  return (
    <Link
      href={`/urunler#${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-cream shadow-[0_1px_3px_rgba(18,61,42,0.05)] transition-colors hover:border-moss/35"
    >
      <ProductImage
        product={product}
        sizes="(min-width: 1024px) 45vw, 92vw"
        priority={priority}
        className="aspect-[4/3] border-b border-line"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-serif text-[1.45rem] leading-tight font-bold text-ink">
          {product.brand} <span className="text-moss">{product.model}</span>
        </h3>

        <p className="mt-2 text-[1.02rem] font-medium text-bark">
          {product.size}
        </p>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          {product.price === null ? (
            <span className="text-[0.95rem] font-medium text-muted">
              Fiyat yakında
            </span>
          ) : (
            <span className="text-[1.35rem] leading-none font-bold text-ink">
              {formatPrice(product.price)}
            </span>
          )}

          <span className="inline-flex min-h-11 items-center gap-2 rounded-md bg-moss px-5 text-[0.95rem] font-medium text-white transition-colors group-hover:bg-moss-dark">
            Ürünü İncele
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
