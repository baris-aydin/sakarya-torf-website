"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";
import type { GalleryItem } from "@/lib/gallery";

type GalleryCardProps = {
  item: GalleryItem;
};

export default function GalleryCard({ item }: GalleryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const captionRef = useRef<HTMLParagraphElement | null>(null);

  // Only offer "Devamını Oku" when the caption is actually clipped. Sticky
  // once true, so expanding (which removes the clamp) can't hide the toggle.
  const measure = useCallback(() => {
    const node = captionRef.current;
    if (!node) return;
    setOverflows((previous) => previous || node.scrollHeight > node.clientHeight + 1);
  }, []);

  const attachCaption = useCallback(
    (node: HTMLParagraphElement | null) => {
      captionRef.current = node;
      if (node) measure();
    },
    [measure],
  );

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-cream shadow-[0_1px_3px_rgba(18,61,42,0.05)]">
      {/* Uniform frame keeps the grid even; object-contain means none of the
          varied Instagram aspect ratios get cropped. */}
      <div className="relative aspect-[4/5] border-b border-line bg-mist">
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt="Sakarya Torf galeri görseli"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
            className="object-contain object-center"
          />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-contain object-center"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          ref={attachCaption}
          className={cx(
            "text-[0.92rem] leading-relaxed whitespace-pre-line text-muted",
            expanded ? null : "line-clamp-4",
          )}
        >
          {item.caption}
        </p>

        {overflows ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="mt-3 self-start text-[0.88rem] font-medium text-moss underline underline-offset-2 transition-colors hover:text-moss-dark"
          >
            {expanded ? "Daha Az Göster" : "Devamını Oku"}
          </button>
        ) : null}

        <a
          href={item.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.85rem] text-muted transition-colors hover:text-moss"
        >
          Instagram&apos;da Görüntüle
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
