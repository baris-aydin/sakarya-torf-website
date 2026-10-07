"use client";

import { useState } from "react";
import Container from "@/components/Container";
import GalleryCard from "@/components/GalleryCard";
import GalleryLightbox from "@/components/GalleryLightbox";
import { cx } from "@/lib/cx";
import type { GalleryItem } from "@/lib/gallery-types";

type GallerySectionProps = {
  id: string;
  title: string;
  items: GalleryItem[];
  className?: string;
};

/** Shared by Fotoğraflar and Videolar: heading, card grid and one viewer. */
export default function GallerySection({
  id,
  title,
  items,
  className,
}: GallerySectionProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  // An empty category is hidden entirely rather than shown as an empty box.
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-baslik`}
      className={cx("scroll-mt-24 py-16 lg:py-24", className)}
    >
      <Container>
        <h2
          id={`${id}-baslik`}
          className="text-[clamp(1.7rem,3.2vw,2.3rem)] leading-tight font-bold text-ink"
        >
          {title}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </div>
      </Container>

      <GalleryLightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
