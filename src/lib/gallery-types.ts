type GalleryMediaBase = {
  /** Stable key: the Instagram shortcode, or the local file's base name. */
  id: string;
  width: number;
  height: number;
};

type ImageMedia = GalleryMediaBase & {
  type: "image";
  src: string;
};

type VideoMedia = GalleryMediaBase & {
  type: "video";
  src: string;
  poster: string;
};

/** Imported from an Instagram post — carries the post's caption and link. */
type InstagramSource = {
  source: "instagram";
  /** Original caption, preserved verbatim. */
  caption: string;
  instagramUrl: string;
  /** ISO date (YYYY-MM-DD) of the original post. */
  date: string;
};

/** Our own media, never posted to Instagram — no caption, no outbound link. */
type LocalSource = {
  source: "local";
};

export type GalleryImage = ImageMedia & (InstagramSource | LocalSource);
export type GalleryVideo = VideoMedia & (InstagramSource | LocalSource);
export type GalleryItem = GalleryImage | GalleryVideo;

export type InstagramGalleryItem = Extract<GalleryItem, { source: "instagram" }>;
export type LocalGalleryItem = Extract<GalleryItem, { source: "local" }>;
