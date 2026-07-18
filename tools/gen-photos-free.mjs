// Бесплатная генерация фото категорий через Pollinations.ai (Flux) -> assets/cat-*.jpg
// Запуск: node tools/gen-photos-free.mjs [имя-категории ...]  (без аргументов — все)
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "assets");

const STYLE =
  "Professional B2B catalog product photography, photorealistic. " +
  "Clean light warm-grey seamless studio background, soft diffused lighting, gentle soft shadow under objects. " +
  "Food-industry HACCP color-coded hygienic cleaning equipment, brand new condition. " +
  "No text, no logos, no labels, no people, no watermark.";

const CATS = {
  brush:
    "A set of RED hygienic food-industry cleaning brushes: a hand brush, a narrow detail brush and a floor broom head, bright red plastic bodies and red bristles, arranged in a neat row.",
  squeegee:
    "A BLUE professional floor squeegee with rubber blade and a smaller blue table squeegee, bright blue plastic bodies, lying diagonally.",
  mop:
    "A GREEN professional flat mop: aluminum handle, bright green plastic mop frame and green microfiber pad, with one spare folded microfiber pad beside it.",
  spatula:
    "Set of three bright RED plastic spatulas with long handles and flat wide blades, lying parallel side by side on the surface, flat-lay from above, different sizes.",
  bucket:
    "A YELLOW graduated professional bucket with printed measuring scale and a yellow food-grade container with lid, bright yellow plastic, on a light warm-grey studio background, grey backdrop.",
  trolley:
    "A WHITE professional cleaning trolley on wheels with a mop wringer and two buckets, one red and one blue, compact single frame.",
  dispenser:
    "A wall-mounted chemical dosing dispenser unit in white and blue with clear tubing, next to a blue bottle of professional cleaning solution.",
  rack:
    "A single GREEN wall-mounted tool holder rail with rubber grip clips, mounted on a clean white wall, holding two tools hanging vertically: a green floor squeegee and a green hand brush. Simple, minimal, front view.",
};

async function gen(name, subject, attempt = 1) {
  const prompt = encodeURIComponent(`${STYLE} ${subject}`);
  const seed = Math.floor(Math.random() * 1e6);
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=768&nologo=true&model=flux&seed=${seed}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(180000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10000) throw new Error(`подозрительно маленький файл (${buf.length} байт)`);
    await writeFile(path.join(OUT, `cat-${name}.jpg`), buf);
    console.log(`OK  cat-${name}.jpg (${Math.round(buf.length / 1024)} KB)`);
  } catch (e) {
    if (attempt < 3) {
      console.log(`retry ${name}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 5000));
      return gen(name, subject, attempt + 1);
    }
    console.error(`FAIL ${name}: ${e.message}`);
  }
}

await mkdir(OUT, { recursive: true });
const wanted = process.argv.slice(2);
for (const [name, subject] of Object.entries(CATS)) {
  if (wanted.length && !wanted.includes(name)) continue;
  await gen(name, subject);
}
