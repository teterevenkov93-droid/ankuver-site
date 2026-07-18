// Перекраска категорийных фото под HACCP-зоны: сдвиг оттенка только для
// насыщенных синих пикселей, серый фон и тени не затрагиваются.
// Запуск: node tools/recolor.mjs  (оригиналы копируются в assets/orig-blue/)
import Jimp from 'jimp';
import path from 'node:path';
import { mkdir, copyFile } from 'node:fs/promises';

const ASSETS = path.resolve(import.meta.dirname, '..', 'assets');
const BACKUP = path.join(ASSETS, 'orig-blue');

// [файл, целевой оттенок H (0-360), множитель светлоты, множитель насыщенности]
const JOBS = [
  ['cat-brush.jpg',   358, 1.00, 1.05], // красная зона
  ['cat-spatula.jpg', 358, 1.00, 1.05], // красная зона (ручка)
  ['cat-bucket.jpg',   48, 1.18, 1.05], // жёлтая зона
  ['cat-rack.jpg',    130, 0.95, 0.90], // зелёная зона
];

// Синий диапазон исходников (плюс мягкие края для сглаживания границ)
const HUE_LO = 175, HUE_HI = 265, FEATHER = 12;
const SAT_MIN = 0.18;

function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return [h, s, l];
}

function hsl2rgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255].map(v => Math.round(Math.min(255, Math.max(0, v))));
}

// 0..1 — насколько пиксель «синий» (с мягкими краями по оттенку и насыщенности)
function blueness(h, s) {
  if (s < SAT_MIN) return 0;
  let w = 0;
  if (h >= HUE_LO && h <= HUE_HI) w = 1;
  else if (h >= HUE_LO - FEATHER && h < HUE_LO) w = (h - (HUE_LO - FEATHER)) / FEATHER;
  else if (h > HUE_HI && h <= HUE_HI + FEATHER) w = ((HUE_HI + FEATHER) - h) / FEATHER;
  const satW = Math.min(1, (s - SAT_MIN) / 0.12);
  return w * satW;
}

await mkdir(BACKUP, { recursive: true });

for (const [file, targetH, lMul, sMul] of JOBS) {
  const src = path.join(ASSETS, file);
  await copyFile(src, path.join(BACKUP, file));
  const img = await Jimp.read(src);
  const { data, width, height } = img.bitmap;
  for (let i = 0; i < width * height * 4; i += 4) {
    const [h, s, l] = rgb2hsl(data[i], data[i + 1], data[i + 2]);
    const w = blueness(h, s);
    if (w === 0) continue;
    const nh = (h + w * ((targetH - h + 540) % 360 - 180) + 360) % 360;
    const nl = Math.min(0.97, l * (1 + w * (lMul - 1)));
    const ns = Math.min(1, s * (1 + w * (sMul - 1)));
    const [r, g, b] = hsl2rgb(nh, ns, nl);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }
  await img.quality(90).writeAsync(src);
  console.log(`OK  ${file} -> hue ${targetH}`);
}
