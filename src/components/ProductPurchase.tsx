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

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          className="self-start sm:self-auto"
        />
        <button
          type="button"
          onClick={() => router.push(`/satin-al?quantity=${quantity}`)}
          className="h-13 flex-1 rounded-md bg-moss px-8 text-base font-medium text-white transition-colors hover:bg-moss-dark"
        >
          Satın Al
        </button>
      </div>

      <p className="mt-3.5 text-[0.85rem] text-bark">
        1 Adet = {product.volume}
      </p>
    </div>
  );
}
