// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/import-instagram-gallery.mjs
// Source: sakarya-torf-instagram-gallery.json (import-time only, never fetched
// by the browser). All media is served from our own /public.

type GalleryItemBase = {
  /** Instagram shortcode, used as the stable key and the local filename. */
  id: string;
  /** Original caption, preserved verbatim. */
  caption: string;
  instagramUrl: string;
  /** ISO date (YYYY-MM-DD) of the original post. */
  date: string;
  width: number;
  height: number;
};

export type GalleryImage = GalleryItemBase & {
  type: "image";
  src: string;
};

export type GalleryVideo = GalleryItemBase & {
  type: "video";
  src: string;
  poster: string;
};

export type GalleryItem = GalleryImage | GalleryVideo;

/** Curated order, matching the source export. Never sorted at render time. */
export const galleryItems: GalleryItem[] = [
  {
    id: "C6MZDYtNUSA",
    type: "image",
    src: "/media/gallery/C6MZDYtNUSA.jpg",
    width: 1289,
    height: 1420,
    caption: "☎️05339385422\n#organik #kompost #torf #peysaj #fidancılık #gübre #leylandi #smaragd #çiçek",
    instagramUrl: "https://www.instagram.com/p/C6MZDYtNUSA/",
    date: "2024-04-25",
  },
  {
    id: "Co0AjOHtySR",
    type: "image",
    src: "/media/gallery/Co0AjOHtySR.jpg",
    width: 1440,
    height: 1800,
    caption: "Organik madde oranının yüksek olması, kompost iç sıcaklığının dengede tutulmasına bağlıdır. Bunun için düzenli olarak kompost iç ısısını takip ediyoruz..\n#organik #kompost #torf #peysaj #fidan #bitkibakımı #bitki #sera #çiçek",
    instagramUrl: "https://www.instagram.com/p/Co0AjOHtySR/",
    date: "2023-02-18",
  },
  {
    id: "DbnwxhENr_d",
    type: "video",
    src: "/media/gallery/DbnwxhENr_d.mp4",
    poster: "/media/gallery/DbnwxhENr_d-cover.jpg",
    width: 640,
    height: 1136,
    caption: "#torf #fidan #organik #peysaj #çiçek",
    instagramUrl: "https://www.instagram.com/p/DbnwxhENr_d/",
    date: "2026-08-04",
  },
  {
    id: "Cwmfoz0NSEE",
    type: "video",
    src: "/media/gallery/Cwmfoz0NSEE.mp4",
    poster: "/media/gallery/Cwmfoz0NSEE-cover.jpg",
    width: 1080,
    height: 1920,
    caption: "Sakarya Torf Tasarımı Trommel Screen-Elek 👍🏻\n\n#trommelscreen #trommelelek #elek #screen #organik #compost #kompost #torf #gübre #peysaj #fidan #cim #çiçek #sakarya #sapanca #arifiye #yalova",
    instagramUrl: "https://www.instagram.com/p/Cwmfoz0NSEE/",
    date: "2023-08-31",
  },
  {
    id: "DObaJF8AqZP",
    type: "video",
    src: "/media/gallery/DObaJF8AqZP.mp4",
    poster: "/media/gallery/DObaJF8AqZP-cover.jpg",
    width: 1080,
    height: 1920,
    caption: "#organik #organiktarım #kompost #torf #gübre #peysaj #çiftçi #çiçek #fidancılık #sera #",
    instagramUrl: "https://www.instagram.com/p/DObaJF8AqZP/",
    date: "2025-09-10",
  },
  {
    id: "CpqPZUit9ji",
    type: "image",
    src: "/media/gallery/CpqPZUit9ji.jpg",
    width: 884,
    height: 1106,
    caption: "Sevgili @tarikegilmez_  in saksı harcında kullandığı harçda biz de varız.. organik kompost torfu saksı harcına eklediğinizde, alınabilir azot,fosfor,potasyumdan bitkileriniz maksimum yararlanabilecek. Vegetasyon süresi boyunca verimli sonuçlar alabileceksiniz..\n☎️05339385422\n#organik #kompost #torf #peysaj #fidan",
    instagramUrl: "https://www.instagram.com/p/CpqPZUit9ji/",
    date: "2023-03-11",
  },
  {
    id: "Cnr0q5et458",
    type: "image",
    src: "/media/gallery/Cnr0q5et458.jpg",
    width: 828,
    height: 440,
    caption: "Sizden gelenler..\n\n☎️05339385422\n#organik #kompost #torf #fidan #peysaj #cicek #dogal",
    instagramUrl: "https://www.instagram.com/p/Cnr0q5et458/",
    date: "2023-01-21",
  },
  {
    id: "CiqA1NJNqdV",
    type: "image",
    src: "/media/gallery/CiqA1NJNqdV.jpg",
    width: 899,
    height: 1124,
    caption: "Formlu ve kaliteli ürünler yetiştiren @tarikegilmez_ ‘e 0-20 mm elenmiş, organik kompost hayırlı olsun.. ☎️05339385422\n#kompost #compost #torf #fidan #peysaj #şimşir #çiçek",
    instagramUrl: "https://www.instagram.com/p/CiqA1NJNqdV/",
    date: "2022-09-18",
  },
];
