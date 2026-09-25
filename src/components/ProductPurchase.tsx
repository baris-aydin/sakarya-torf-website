"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuantitySelector from "@/components/QuantitySelector";
import { formatPrice } from "@/lib/site";

type ProductPurchaseProps = {
  productId: string;
  size: string;
  /** null while the price is still unknown — controls switch off, layout stays. */
  price: number | null;
};

export default function ProductPurchase({
  productId,
  size,
  price,
}: ProductPurchaseProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const purchasable = price !== null;

  return (
    <div className="mt-9 border-t border-line pt-8">
      <p className="eyebrow text-muted">BİRİM FİYAT</p>

      {purchasable ? (
        <p className="mt-2.5 text-[2.1rem] leading-none font-bold text-ink">
          {formatPrice(price)}
        </p>
      ) : (
        <p className="mt-2.5 text-[1.4rem] leading-none font-semibold text-muted">
          Fiyat yakında
        </p>
      )}

      {/* Side by side from 360px up; stacked below that, where the two
          controls stop fitting comfortably on one row. */}
      <div className="xs:flex-row xs:items-center mt-7 flex flex-col gap-3 sm:gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          disabled={!purchasable}
          className="xs:self-auto shrink-0 self-start"
        />
        <button
          type="button"
          disabled={!purchasable}
          onClick={() =>
            router.push(`/satin-al?product=${productId}&quantity=${quantity}`)
          }
          className="xs:w-auto xs:flex-1 flex min-h-14 w-full items-center justify-center rounded-[10px] bg-moss px-6 text-[1.125rem] font-semibold text-white transition-colors hover:bg-moss-dark disabled:cursor-not-allowed disabled:bg-moss/35 disabled:hover:bg-moss/35 sm:min-h-13 sm:rounded-md sm:px-8 sm:text-base sm:font-medium"
        >
          Satın Al
        </button>
      </div>

      <p className="mt-4 text-[0.85rem] text-bark sm:mt-3.5">
        1 Adet = {size}
      </p>

      {purchasable ? null : (
        <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
          Fiyat bilgisi eklendiğinde sipariş verebilirsiniz.{" "}
          <Link
            href="/iletisim"
            className="font-medium text-moss underline underline-offset-2"
          >
            Bilgi alın
          </Link>
        </p>
      )}
    </div>
  );
}
