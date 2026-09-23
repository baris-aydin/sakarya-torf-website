"use client";

import Image from "next/image";
import QuantitySelector from "@/components/QuantitySelector";
import {
  PRICE_PER_UNIT,
  SHIPPING_COST,
  formatPrice,
  product,
} from "@/lib/site";

type OrderSummaryProps = {
  quantity: number;
  onQuantityChange: (value: number) => void;
};

export default function OrderSummary({
  quantity,
  onQuantityChange,
}: OrderSummaryProps) {
  const subtotal = PRICE_PER_UNIT * quantity;
  const total = subtotal + SHIPPING_COST;

  return (
    <aside className="rounded-lg border border-line bg-white p-6 shadow-[0_1px_3px_rgba(18,61,42,0.05)]">
      <h2 className="text-[1.25rem] font-bold text-ink">Sipariş Özeti</h2>

      <div className="mt-6 flex gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-mist">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.95rem] font-medium text-ink">{product.name}</p>
          <p className="mt-0.5 text-[0.85rem] text-muted">{product.volume}</p>
          <p className="mt-2 text-[0.95rem] font-semibold text-ink">
            {product.price}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <QuantitySelector
          value={quantity}
          onChange={onQuantityChange}
          size="sm"
        />
      </div>

      <dl className="mt-6 space-y-3 border-t border-line pt-6 text-[0.95rem]">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Ara toplam</dt>
          <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">Kargo</dt>
          <dd className="font-medium text-moss">{product.shippingLabel}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
        <span className="text-[1.05rem] font-semibold text-ink">Toplam</span>
        <span className="text-[1.05rem] font-bold text-ink">
          {formatPrice(total)}
        </span>
      </div>
    </aside>
  );
}
