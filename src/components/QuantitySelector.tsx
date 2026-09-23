"use client";

import { Minus, Plus } from "lucide-react";
import { cx } from "@/lib/cx";
import { MAX_QUANTITY } from "@/lib/site";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  size?: "md" | "sm";
  className?: string;
};

export default function QuantitySelector({
  value,
  onChange,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const dense = size === "sm";

  return (
    <div
      className={cx(
        "inline-flex items-center rounded-md border border-line bg-white",
        dense ? "h-11" : "h-13",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Adedi azalt"
        className={cx(
          "flex h-full items-center justify-center rounded-l-md text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent",
          dense ? "w-10" : "w-12",
        )}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>

      <output
        aria-live="polite"
        className={cx(
          "text-center font-medium tabular-nums",
          dense ? "w-9 text-[0.95rem]" : "w-12 text-base",
        )}
      >
        {value}
      </output>

      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_QUANTITY, value + 1))}
        disabled={value >= MAX_QUANTITY}
        aria-label="Adedi artır"
        className={cx(
          "flex h-full items-center justify-center rounded-r-md text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent",
          dense ? "w-10" : "w-12",
        )}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
