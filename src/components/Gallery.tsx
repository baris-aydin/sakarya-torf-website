import Container from "@/components/Container";
import GalleryCard from "@/components/GalleryCard";
import { galleryItems } from "@/lib/gallery";

export default function Gallery() {
  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <section id="galeri" className="scroll-mt-24 bg-sage py-20 lg:py-28">
      <Container>
        <h2 className="text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-ink">
          Galeri
        </h2>
        <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
          Üretimden, uygulamalardan ve Sakarya Torf&apos;tan kareler.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
