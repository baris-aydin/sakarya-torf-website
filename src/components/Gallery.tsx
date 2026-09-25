import Image from "next/image";
import { Film, Images } from "lucide-react";
import Container from "@/components/Container";
import { galleryItems } from "@/lib/gallery";

export default function Gallery() {
  return (
    <section id="galeri" className="scroll-mt-24 bg-sage py-20 lg:py-28">
      <Container>
        <h2 className="text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-ink">
          Galeri
        </h2>
        <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
          Ürün ve kullanım görselleri ile videolar burada yer alacak.
        </p>

        {galleryItems.length > 0 ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <li
                key={item.src}
                className="overflow-hidden rounded-lg border border-line bg-cream"
              >
                <div className="relative aspect-[4/3] bg-mist">
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.poster}
                      title={item.title}
                      controls
                      preload="metadata"
                      className="absolute inset-0 size-full object-cover object-center"
                    />
                  )}
                </div>

                {item.caption ? (
                  <p className="px-5 py-4 text-[0.9rem] leading-relaxed text-muted">
                    {item.caption}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          /* Placeholder frames until real photography and video are supplied. */
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {[
              { Icon: Images, label: "Ürün görselleri" },
              { Icon: Images, label: "Kullanım görselleri" },
              { Icon: Film, label: "Video" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-moss/25 bg-cream/60 p-6 text-center"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-sage text-moss"
                >
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <p className="text-[0.95rem] font-medium text-ink/70">
                  {label}
                </p>
                <p className="text-[0.82rem] text-muted">Yakında</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
