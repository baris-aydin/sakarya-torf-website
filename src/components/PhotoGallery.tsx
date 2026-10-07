import GallerySection from "@/components/GallerySection";
import type { GalleryImage } from "@/lib/gallery-types";

export default function PhotoGallery({ items }: { items: GalleryImage[] }) {
  return (
    <GallerySection
      id="fotograflar"
      title="Fotoğraflar"
      items={items}
      className="bg-cream"
    />
  );
}
