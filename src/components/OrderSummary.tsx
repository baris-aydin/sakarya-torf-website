"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import QuantitySelector from "@/components/QuantitySelector";
import type { OrderItem } from "@/lib/products";
import { SHIPPING_COST, SHIPPING_LABEL, formatPrice } from "@/lib/site";

type OrderSummaryProps = {
  item: OrderItem;
  quantity: number;
  onQuantityChange: (value: number) => void;
};

export default function OrderSummary({
  item,
  quantity,
  onQuantityChange,
}: OrderSummaryProps) {
  const subtotal = item.price * quantity;
  const total = subtotal + SHIPPING_COST;

  return (
    <aside className="rounded-lg border border-line bg-white p-6 shadow-[0_1px_3px_rgba(18,61,42,0.05)]">
      <h2 className="text-[1.25rem] font-bold text-ink">Sipariş Özeti</h2>

      <div className="mt-6 flex gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-mist">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="80px"
              className="object-contain object-center p-1.5"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-full items-center justify-center text-moss"
            >
              <Camera className="size-5" strokeWidth={1.6} />
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[0.95rem] font-medium text-ink">{item.name}</p>
          <p className="mt-0.5 text-[0.85rem] text-muted">{item.size}</p>
          <p className="mt-2 text-[0.95rem] font-semibold text-ink">
            {formatPrice(item.price)}
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
          <dd className="font-medium text-moss">{SHIPPING_LABEL}</dd>
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
