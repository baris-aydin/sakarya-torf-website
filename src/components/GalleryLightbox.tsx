"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery";

type GalleryLightboxProps = {
  /** The item to show, or null when closed. */
  item: GalleryItem | null;
  onClose: () => void;
};

/**
 * Lightweight viewer built on the native <dialog>: the browser supplies the
 * focus trap, Esc-to-close, the backdrop and focus return on close.
 */
export default function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  // Stop the page behind from scrolling while the viewer is open.
  useEffect(() => {
    if (!item) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [item]);

  // A video only opens because someone pressed its play button, so start it.
  // If the browser refuses (some mobile browsers), the native controls remain.
  useEffect(() => {
    if (item?.type === "video") {
      videoRef.current?.play().catch(() => {});
    }
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={item?.type === "video" ? "Video oynatıcı" : "Fotoğraf görüntüleyici"}
      onClose={onClose}
      // Clicks on the dialog element itself (not its content) are backdrop clicks.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(68rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white p-0 text-ink shadow-[0_12px_40px_rgba(12,46,27,0.35)] backdrop:bg-night/80"
    >
      {item ? (
        <div className="relative flex max-h-[calc(100dvh-2rem)] flex-col md:flex-row">
          <div className="flex shrink-0 items-center justify-center bg-night md:min-w-0 md:flex-1">
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt="Sakarya Torf galeri görseli"
                width={item.width}
                height={item.height}
                sizes="(min-width: 768px) 48rem, 100vw"
                className="h-auto max-h-[60dvh] w-auto max-w-full object-contain md:max-h-[calc(100dvh-2rem)]"
              />
            ) : (
              // Portrait reels: size by height and let the known aspect ratio set
              // the width, so the player doesn't jump when metadata loads.
              <video
                ref={videoRef}
                key={item.id}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                preload="metadata"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
                className="h-[60dvh] w-auto max-w-full object-contain md:h-[calc(100dvh-2rem)]"
              />
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-7 md:w-80 md:flex-none">
            <p className="text-[0.95rem] leading-relaxed whitespace-pre-line text-muted">
              {item.caption}
            </p>
            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-moss transition-colors hover:text-moss-dark"
            >
              Instagram&apos;da Görüntüle
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Kapat"
            className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-cream/95 text-ink shadow-[0_2px_8px_rgba(12,46,27,0.25)] transition-colors hover:bg-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
