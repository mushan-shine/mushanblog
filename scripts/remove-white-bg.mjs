import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

async function removeWhiteBg(inputPath, outputPath, threshold = 240) {
  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels + 0];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i * channels + 3] = 0; // transparent
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log(`Done: ${outputPath}`);
}

await removeWhiteBg("public/pencil.png", "public/pencil.png");
