import Image from "next/image";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";

type BrandMarkProps = {
  /** `dark` renders on cream backgrounds, `light` on forest green ones. */
  tone?: "dark" | "light";
  className?: string;
};

export default function BrandMark({
  tone = "dark",
  className,
}: BrandMarkProps) {
  return (
    <span className={cx("flex items-center gap-3", className)}>
      {/* Circular emblem rather than the full logo: the wordmark and tagline
          in the complete artwork are unreadable at header size. */}
      <Image
        src="/images/brand/sakarya-torf-emblem.png"
        alt=""
        width={44}
        height={44}
        priority
        className="size-11 shrink-0"
      />
      <span
        className={cx(
          "font-serif text-[1.15rem] leading-none font-bold tracking-[0.02em]",
          tone === "light" ? "text-cream" : "text-ink",
        )}
      >
        {site.displayName}
      </span>
    </span>
  );
}
