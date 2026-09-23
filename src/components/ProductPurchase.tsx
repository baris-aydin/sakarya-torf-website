"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QuantitySelector from "@/components/QuantitySelector";
import { product } from "@/lib/site";

export default function ProductPurchase() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-9 border-t border-line pt-8">
      <p className="eyebrow text-muted">BİRİM FİYAT</p>
      <p className="mt-2.5 text-[2.1rem] leading-none font-bold text-ink">
        {product.price}
      </p>

      {/* Side by side from 360px up; stacked below that, where the two
          controls stop fitting comfortably on one row. */}
      <div className="xs:flex-row xs:items-center mt-7 flex flex-col gap-3 sm:gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          className="xs:self-auto shrink-0 self-start"
        />
        <button
          type="button"
          onClick={() => router.push(`/satin-al?quantity=${quantity}`)}
          className="xs:w-auto xs:flex-1 flex min-h-14 w-full items-center justify-center rounded-[10px] bg-moss px-6 text-[1.125rem] font-semibold text-white transition-colors hover:bg-moss-dark sm:min-h-13 sm:rounded-md sm:px-8 sm:text-base sm:font-medium"
        >
          Satın Al
        </button>
      </div>

      <p className="mt-4 text-[0.85rem] text-bark sm:mt-3.5">
        1 Adet = {product.volume}
      </p>
    </div>
  );
}
