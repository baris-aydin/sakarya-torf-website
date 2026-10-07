import type { Metadata } from "next";
import Container from "@/components/Container";
import PhotoGallery from "@/components/PhotoGallery";
import VideoGallery from "@/components/VideoGallery";
import {
  galleryItems,
  type GalleryImage,
  type GalleryVideo,
} from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Sakarya Torf ürünlerini, kullanım alanlarını, uygulama örneklerini, fotoğrafları ve videoları keşfedin.",
};

// Split once on the server; the curated order within each type is preserved.
const photos = galleryItems.filter(
  (item): item is GalleryImage => item.type === "image",
);
const videos = galleryItems.filter(
  (item): item is GalleryVideo => item.type === "video",
);

export default function Page() {
  return (
    <>
      <section className="border-b border-line bg-cream py-16 lg:py-20">
        <Container>
          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] font-bold text-ink">
            Galeri
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            Sakarya Torf&rsquo;u uygulamada görün. Ürünlerimiz, kullanım
            alanları ve sahadan görüntüler.
          </p>
        </Container>
      </section>

      <PhotoGallery items={photos} />
      <VideoGallery items={videos} />
    </>
  );
}
