"use client";

import { Minus, Plus } from "lucide-react";
import { cx } from "@/lib/cx";
import { MAX_QUANTITY } from "@/lib/site";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  size?: "md" | "sm";
  /** Used for products that cannot be ordered yet. */
  disabled?: boolean;
  className?: string;
};

export default function QuantitySelector({
  value,
  onChange,
  size = "md",
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const dense = size === "sm";

  // The `md` selector grows to 56px with a softer radius on phones so it sits
  // level with the Satın Al button; from `sm` up it keeps its desktop sizing.
  const shell = dense ? "h-11 rounded-md" : "h-14 rounded-[10px] sm:h-13 sm:rounded-md";
  const step = dense ? "w-10" : "w-12";
  const stepLeft = dense ? "rounded-l-md" : "rounded-l-[10px] sm:rounded-l-md";
  const stepRight = dense ? "rounded-r-md" : "rounded-r-[10px] sm:rounded-r-md";

  return (
    <div
      className={cx(
        "inline-flex items-center border border-line bg-white",
        shell,
        disabled && "opacity-55",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={disabled || value <= 1}
        aria-label="Adedi azalt"
        className={cx(
          "flex h-full items-center justify-center text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent",
          step,
          stepLeft,
        )}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>

      <output
        aria-live="polite"
        className={cx(
          "flex h-full items-center justify-center font-medium tabular-nums",
          dense ? "w-9 text-[0.95rem]" : "w-12 text-base",
        )}
      >
        {value}
      </output>

      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_QUANTITY, value + 1))}
        disabled={disabled || value >= MAX_QUANTITY}
        aria-label="Adedi artır"
        className={cx(
          "flex h-full items-center justify-center text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:bg-transparent",
          step,
          stepRight,
        )}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
