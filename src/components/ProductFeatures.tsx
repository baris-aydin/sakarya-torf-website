import { cx } from "@/lib/cx";
import type { ProductFeature } from "@/lib/products";

type ProductFeaturesProps = {
  features: ProductFeature[];
  className?: string;
};

export default function ProductFeatures({
  features,
  className,
}: ProductFeaturesProps) {
  return (
    <ul className={cx("grid gap-x-8 gap-y-5 sm:grid-cols-2", className)}>
      {features.map(({ label, Icon }) => (
        <li key={label} className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-moss"
          >
            <Icon className="size-[1.1rem]" strokeWidth={1.6} />
          </span>
          <span className="text-[0.95rem] text-ink/85">{label}</span>
        </li>
      ))}
    </ul>
  );
}
