import { GifUtil, GifFrame, BitmapImage } from "gifwrap";

const THRESHOLD = 230;

const gif = await GifUtil.read("public/cat.gif");

for (const frame of gif.frames) {
  const bmp = frame.bitmap;
  const buf = bmp.data; // RGBA Buffer
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i + 1], b = buf[i + 2];
    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      buf[i + 3] = 0; // transparent
    }
  }
}

await GifUtil.write("public/cat-nobg.gif", gif.frames, gif);
console.log("Done: public/cat-nobg.gif");
