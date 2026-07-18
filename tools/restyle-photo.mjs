// Перестилизация фото продукта: вырезаем объект (нейросеть, локально)
// и сажаем на единый серый студийный фон с мягкой тенью.
// Запуск: node tools/restyle-photo.mjs <вход.jpg> <выход.jpg>
import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";
import path from "node:path";
import { readFile } from "node:fs/promises";

const [, , inFile, outFile] = process.argv;
if (!inFile || !outFile) {
  console.error("usage: node restyle-photo.mjs <in.jpg> <out.jpg>");
  process.exit(1);
}

const W = 1024, H = 768;

// 1. Удаляем фон (модель скачивается при первом запуске и кэшируется)
const assetPath = path.join(import.meta.dirname, "node_modules", "@imgly", "background-removal-node", "dist");
const inputBlob = new Blob([await readFile(path.resolve(inFile))], { type: "image/jpeg" });
const blob = await removeBackground(inputBlob, {
  model: "medium",
  publicPath: "file://" + assetPath.replaceAll("\\", "/") + "/",
});
const cutout = Buffer.from(await blob.arrayBuffer());

// 2. Обрезаем прозрачные поля и вписываем в кадр (объект ~62% высоты кадра)
const trimmed = await sharp(cutout).trim().toBuffer({ resolveWithObject: true });
const maxW = Math.round(W * 0.66), maxH = Math.round(H * 0.62);
const scale = Math.min(maxW / trimmed.info.width, maxH / trimmed.info.height, 1);
const pw = Math.round(trimmed.info.width * scale);
const ph = Math.round(trimmed.info.height * scale);
const product = await sharp(trimmed.data).resize(pw, ph).png().toBuffer();

const px = Math.round((W - pw) / 2);
const py = Math.round(H * 0.78 - ph); // объект «стоит» на условном полу

// 3. Фон: вертикальный серый градиент, как в остальной серии
const bg = Buffer.from(`<svg width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e7e6e2"/>
    <stop offset="0.7" stop-color="#dddcd7"/>
    <stop offset="1" stop-color="#d3d2cc"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
</svg>`);

// 4. Тень: размытый эллипс под объектом
const shW = Math.round(pw * 0.85);
const shadow = Buffer.from(`<svg width="${W}" height="${H}">
  <defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="14"/>
  </filter></defs>
  <ellipse cx="${W / 2}" cy="${Math.round(H * 0.79)}" rx="${Math.round(shW / 2)}" ry="16"
    fill="rgba(30,35,40,0.28)" filter="url(#b)"/>
</svg>`);

await sharp(bg)
  .composite([
    { input: shadow, top: 0, left: 0 },
    { input: product, top: py, left: px },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.resolve(outFile));

console.log(`OK ${outFile} (${pw}x${ph} product on ${W}x${H})`);
