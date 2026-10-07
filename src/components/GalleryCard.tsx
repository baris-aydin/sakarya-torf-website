"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { cx } from "@/lib/cx";
import type { GalleryItem } from "@/lib/gallery-types";

type GalleryCardProps = {
  item: GalleryItem;
  /** Opens the item in the lightbox — never navigates away. */
  onOpen: (item: GalleryItem) => void;
};

export default function GalleryCard({ item, onOpen }: GalleryCardProps) {
  const isVideo = item.type === "video";
  const isInstagram = item.source === "instagram";

  return (
    // Local media has no caption, so its card is just the thumbnail; self-start
    // stops it stretching into an empty white box beside a captioned card.
    <article
      className={cx(
        "flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_3px_rgba(18,61,42,0.05)]",
        isInstagram ? null : "self-start",
      )}
    >
      {/* Uniform 4:5 thumbnail with object-cover keeps the grid even. The
          lightbox shows the full, uncropped media. */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={isVideo ? "Videoyu oynat" : "Fotoğrafı büyüt"}
        className={cx(
          "group relative block aspect-[4/5] w-full overflow-hidden bg-mist",
          isInstagram ? "border-b border-line" : null,
          isVideo ? "cursor-pointer" : "cursor-zoom-in",
        )}
      >
        <Image
          src={isVideo ? item.poster : item.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
          className="object-cover object-center"
        />

        {isVideo ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-night/15 transition-colors group-hover:bg-night/30"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-cream/95 text-moss shadow-[0_2px_10px_rgba(12,46,27,0.25)] transition-transform group-hover:scale-105">
              <Play className="size-6 translate-x-0.5" fill="currentColor" strokeWidth={1.5} />
            </span>
          </span>
        ) : null}
      </button>

      {item.source === "instagram" ? (
        <InstagramDetails caption={item.caption} instagramUrl={item.instagramUrl} />
      ) : null}
    </article>
  );
}

function InstagramDetails({
  caption,
  instagramUrl,
}: {
  caption: string;
  instagramUrl: string;
}) {
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
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <p
        ref={attachCaption}
        className={cx(
          "text-[0.92rem] leading-relaxed whitespace-pre-line text-muted",
          expanded ? null : "line-clamp-4",
        )}
      >
        {caption}
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
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.85rem] text-muted transition-colors hover:text-moss"
      >
        Instagram&apos;da Görüntüle
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
