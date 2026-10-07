import type { LocalGalleryItem } from "@/lib/gallery-types";

/**
 * Our own photos and videos, served from public/images/gallery/. These were
 * never posted to Instagram, so they carry no caption and no Instagram link.
 *
 * Videos are played from the .mp4 next to each original .mov: the same
 * H.264/AAC streams remuxed without re-encoding, because browsers such as
 * Firefox refuse the video/quicktime type .mov files are served with. The
 * poster is a frame taken one second in.
 */
const PHOTOS = "/images/gallery/photos";
const VIDEOS = "/images/gallery/videos";

export const localGalleryItems: LocalGalleryItem[] = [
  { id: "photo-01", source: "local", type: "image", src: `${PHOTOS}/photo-01.jpg`, width: 1200, height: 1600 },
  { id: "photo-02", source: "local", type: "image", src: `${PHOTOS}/photo-02.jpeg`, width: 1200, height: 1600 },
  { id: "photo-03", source: "local", type: "image", src: `${PHOTOS}/photo-03.jpeg`, width: 1200, height: 1600 },
  { id: "photo-04", source: "local", type: "image", src: `${PHOTOS}/photo-04.jpeg`, width: 1200, height: 1600 },
  { id: "photo-05", source: "local", type: "image", src: `${PHOTOS}/photo-05.jpeg`, width: 1200, height: 1600 },
  { id: "photo-06", source: "local", type: "image", src: `${PHOTOS}/photo-06.jpeg`, width: 900, height: 1600 },
  { id: "video-01", source: "local", type: "video", src: `${VIDEOS}/video-01.mp4`, poster: `${VIDEOS}/video-01-poster.jpg`, width: 464, height: 832 },
  { id: "video-02", source: "local", type: "video", src: `${VIDEOS}/video-02.mp4`, poster: `${VIDEOS}/video-02-poster.jpg`, width: 464, height: 832 },
  { id: "video-03", source: "local", type: "video", src: `${VIDEOS}/video-03.mp4`, poster: `${VIDEOS}/video-03-poster.jpg`, width: 464, height: 832 },
  { id: "video-04", source: "local", type: "video", src: `${VIDEOS}/video-04.mp4`, poster: `${VIDEOS}/video-04-poster.jpg`, width: 464, height: 832 },
  { id: "video-05", source: "local", type: "video", src: `${VIDEOS}/video-05.mp4`, poster: `${VIDEOS}/video-05-poster.jpg`, width: 464, height: 832 },
];
