export type GalleryImage = {
  type: "image";
  /** Path under /public, e.g. "/images/gallery/uygulama-01.jpg". */
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryVideo = {
  type: "video";
  /** Path under /public, e.g. "/videos/gallery/uretim.mp4". */
  src: string;
  /** Still frame shown before playback starts. */
  poster?: string;
  /** Used as the accessible name for the player. */
  title: string;
  caption?: string;
};

export type GalleryItem = GalleryImage | GalleryVideo;

/**
 * Gallery content lives here, not in JSX — add entries and the grid picks them
 * up. Intentionally empty: no placeholder photography is invented.
 *
 * Example:
 *   { type: "image", src: "/images/gallery/saksi.jpg", alt: "Saksı dolumu" },
 *   { type: "video", src: "/videos/gallery/uretim.mp4", title: "Üretim" },
 */
export const galleryItems: GalleryItem[] = [];
