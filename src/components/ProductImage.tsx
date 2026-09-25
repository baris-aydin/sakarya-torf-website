import Image from "next/image";
import { Camera } from "lucide-react";
import { cx } from "@/lib/cx";
import type { Product } from "@/lib/products";

type ProductImageProps = {
  product: Pick<Product, "image" | "imageAlt" | "badge" | "size">;
  sizes: string;
  priority?: boolean;
  /** Aspect ratio, radius and border utilities for the frame. */
  className?: string;
  showBadge?: boolean;
};

/**
 * Product image slot. Renders a neutral placeholder when artwork has not been
 * supplied yet, so the layout is final before the photo arrives.
 */
export default function ProductImage({
  product,
  sizes,
  priority,
  className,
  showBadge = false,
}: ProductImageProps) {
  return (
    <div
      /* White, not a green tint: the packaging is white, so separation from
         the cream page comes from the caller's border/ring instead. */
      className={cx(
        "relative w-full overflow-hidden bg-white",
        className,
      )}
    >
      {product.image ? (
        /* `object-contain` keeps the whole bag visible — these are packaging
           shots, so nothing may be cropped. Padding shrinks the content box,
           which `contain` fits into, leaving an even margin around the bag. */
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain object-center p-6 sm:p-8"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full bg-sage text-moss"
          >
            <Camera className="size-5" strokeWidth={1.6} />
          </span>
          <p className="text-[0.95rem] font-medium text-ink/70">
            {product.size} görseli yakında
          </p>
          <p className="max-w-56 text-[0.82rem] leading-relaxed text-muted">
            Ürün fotoğrafı eklendiğinde burada görünecek.
          </p>
        </div>
      )}

      {showBadge && product.image && product.badge ? (
        <span className="absolute top-4 left-4 rounded-md bg-moss px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.1em] text-white">
          {product.badge}
        </span>
      ) : null}
    </div>
  );
}
