#!/usr/bin/env node
/**
 * One-time importer for the curated Instagram gallery.
 *
 *   node scripts/import-instagram-gallery.mjs [--force]
 *
 * Reads the Apify export in the project root, downloads every asset into
 * public/media/gallery/, and regenerates src/lib/gallery.ts.
 *
 * Instagram CDN URLs are signed and expire, so the site must never link to
 * them at runtime — this script is what makes the media local. It is safe to
 * rerun: files that already exist and still validate are left alone unless
 * --force is passed.
 */
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "sakarya-torf-instagram-gallery.json");
const MEDIA_DIR = path.join(ROOT, "public", "media", "gallery");
const PUBLIC_PREFIX = "/media/gallery";
const OUT_FILE = path.join(ROOT, "src", "lib", "gallery.ts");

const FORCE = process.argv.includes("--force");

// Instagram serves 403 to unrecognised clients.
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/apng,image/*,video/*,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
};

/** Identify real file types so an HTML error page never lands on disk as .jpg. */
function sniff(buffer) {
  if (buffer.length < 16) return "too-small";
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpeg";
  if (buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") return "png";
  if (
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  if (buffer.subarray(4, 8).toString("ascii") === "ftyp") return "mp4";

  const head = buffer.subarray(0, 512).toString("utf8").toLowerCase();
  if (head.includes("<html") || head.includes("<!doctype html")) return "html";
  if (head.trimStart().startsWith("{")) return "json";
  return "unknown";
}

const IMAGE_KINDS = new Set(["jpeg", "png", "webp"]);

async function fileIsValid(filePath, expectImage) {
  try {
    const info = await stat(filePath);
    if (info.size === 0) return false;
    const buffer = await readFile(filePath);
    const kind = sniff(buffer);
    return expectImage ? IMAGE_KINDS.has(kind) : kind === "mp4";
  } catch {
    return false;
  }
}

async function download(url, destination, { expectImage, label }) {
  const relative = path.relative(ROOT, destination).replace(/\\/g, "/");

  if (!FORCE && (await fileIsValid(destination, expectImage))) {
    const { size } = await stat(destination);
    console.log(`  skip  ${label.padEnd(26)} ${relative} (${(size / 1024).toFixed(0)} KB, already valid)`);
    return { ok: true, skipped: true };
  }

  let lastError = "";
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: HEADERS, redirect: "follow" });
      if (!response.ok) {
        lastError = `HTTP ${response.status} ${response.statusText}`;
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const kind = sniff(buffer);
      const wanted = expectImage ? IMAGE_KINDS.has(kind) : kind === "mp4";

      if (!wanted) {
        lastError = `unexpected content (detected: ${kind}, ${buffer.length} bytes)`;
        continue;
      }

      await writeFile(destination, buffer);
      console.log(
        `  saved ${label.padEnd(26)} ${relative} (${(buffer.length / 1024).toFixed(0)} KB, ${kind})`,
      );
      return { ok: true, skipped: false };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  console.error(`  FAIL  ${label.padEnd(26)} ${relative} — ${lastError}`);
  return { ok: false, error: lastError };
}

function tsString(value) {
  // JSON.stringify escapes quotes/newlines and leaves emoji + Turkish letters
  // as literal UTF-8, so captions stay byte-accurate and readable in the file.
  return JSON.stringify(value);
}

function renderGalleryModule(items) {
  const entries = items
    .map((item) => {
      const lines = [
        `    id: ${tsString(item.id)},`,
        `    type: ${tsString(item.type)},`,
        `    src: ${tsString(item.src)},`,
      ];
      if (item.type === "video") lines.push(`    poster: ${tsString(item.poster)},`);
      lines.push(
        `    width: ${item.width},`,
        `    height: ${item.height},`,
        `    caption: ${tsString(item.caption)},`,
        `    instagramUrl: ${tsString(item.instagramUrl)},`,
        `    date: ${tsString(item.date)},`,
      );
      return `  {\n${lines.join("\n")}\n  },`;
    })
    .join("\n");

  return `// GENERATED FILE — do not edit by hand.
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
${entries}
];
`;
}

async function main() {
  const raw = await readFile(SOURCE, "utf8");
  const records = JSON.parse(raw);

  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("Source JSON is not a non-empty array.");
  }

  console.log(`Source: ${path.basename(SOURCE)} (${records.length} records)`);
  await mkdir(MEDIA_DIR, { recursive: true });
  console.log(`Media:  ${path.relative(ROOT, MEDIA_DIR).replace(/\\/g, "/")}\n`);

  const items = [];
  const failures = [];

  for (const record of records) {
    const { shortCode, type, displayUrl, videoUrl, caption, url, timestamp } = record;

    if (!shortCode) {
      failures.push({ shortCode: "(missing)", reason: "record has no shortCode" });
      continue;
    }

    const isVideo = String(type).toLowerCase() === "video";
    const common = {
      id: shortCode,
      caption: caption ?? "",
      instagramUrl: url ?? `https://www.instagram.com/p/${shortCode}/`,
      date: timestamp ? String(timestamp).slice(0, 10) : "",
      width: record.dimensionsWidth ?? 0,
      height: record.dimensionsHeight ?? 0,
    };

    if (isVideo) {
      if (!videoUrl) {
        failures.push({ shortCode, reason: "video record has no videoUrl" });
        continue;
      }

      const mp4 = path.join(MEDIA_DIR, `${shortCode}.mp4`);
      const cover = path.join(MEDIA_DIR, `${shortCode}-cover.jpg`);

      const videoResult = await download(videoUrl, mp4, {
        expectImage: false,
        label: `${shortCode} (video)`,
      });
      const coverResult = await download(displayUrl, cover, {
        expectImage: true,
        label: `${shortCode} (cover)`,
      });

      if (!videoResult.ok || !coverResult.ok) {
        failures.push({
          shortCode,
          reason: [
            videoResult.ok ? null : `mp4: ${videoResult.error}`,
            coverResult.ok ? null : `cover: ${coverResult.error}`,
          ]
            .filter(Boolean)
            .join("; "),
        });
        continue;
      }

      items.push({
        ...common,
        type: "video",
        src: `${PUBLIC_PREFIX}/${shortCode}.mp4`,
        poster: `${PUBLIC_PREFIX}/${shortCode}-cover.jpg`,
      });
    } else {
      if (!displayUrl) {
        failures.push({ shortCode, reason: "image record has no displayUrl" });
        continue;
      }

      const image = path.join(MEDIA_DIR, `${shortCode}.jpg`);
      const result = await download(displayUrl, image, {
        expectImage: true,
        label: `${shortCode} (image)`,
      });

      if (!result.ok) {
        failures.push({ shortCode, reason: `image: ${result.error}` });
        continue;
      }

      items.push({
        ...common,
        type: "image",
        src: `${PUBLIC_PREFIX}/${shortCode}.jpg`,
      });
    }
  }

  console.log();

  if (failures.length > 0) {
    console.error("DOWNLOAD FAILURES — gallery data was NOT regenerated:");
    for (const failure of failures) {
      console.error(`  ${failure.shortCode}: ${failure.reason}`);
    }
    console.error(
      "\nInstagram CDN URLs are signed and expire. Re-export the JSON from Apify and rerun.",
    );
    process.exitCode = 1;
    return;
  }

  await writeFile(OUT_FILE, renderGalleryModule(items), "utf8");

  const files = await readdir(MEDIA_DIR);
  let bytes = 0;
  for (const file of files) {
    bytes += (await stat(path.join(MEDIA_DIR, file))).size;
  }

  const images = items.filter((item) => item.type === "image").length;
  const videos = items.filter((item) => item.type === "video").length;

  console.log(`Wrote ${path.relative(ROOT, OUT_FILE).replace(/\\/g, "/")}`);
  console.log(
    `Done: ${items.length} items (${images} image, ${videos} video), ` +
      `${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB total.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
