import GallerySection from "@/components/GallerySection";
import type { GalleryVideo } from "@/lib/gallery-types";

/** Renders nothing when there are no videos, so the page stays clean. */
export default function VideoGallery({ items }: { items: GalleryVideo[] }) {
  return (
    <GallerySection
      id="videolar"
      title="Videolar"
      items={items}
      className="bg-sage"
    />
  );
}
