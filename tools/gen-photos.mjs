// Генерация фото категорий через Gemini (Nano Banana) -> assets/cat-*.png
// Запуск: node tools/gen-photos.mjs
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('GEMINI_API_KEY не задан'); process.exit(1); }

const MODEL = 'gemini-2.5-flash-image';
const OUT = path.resolve(import.meta.dirname, '..', 'assets');

const STYLE = `Professional B2B catalog product photography, photorealistic.
Clean light warm-grey seamless studio background, soft diffused lighting, gentle soft shadow under objects.
Food-industry HACCP color-coded hygienic cleaning equipment, brand new condition.
Slightly angled three-quarter view, objects fill most of the frame.
No text, no logos, no labels, no people, no watermark.`;

const CATS = [
  ['brush',     'A set of RED hygienic food-industry cleaning brushes: a hand brush, a narrow detail brush and a floor broom head, all with bright red plastic bodies and red bristles, arranged in a neat overlapping row.'],
  ['squeegee',  'A BLUE professional floor squeegee with rubber blade and a smaller blue table squeegee, bright blue plastic bodies, lying diagonally.'],
  ['mop',       'A GREEN professional flat mop: aluminum handle, bright green plastic mop frame and green microfiber pad, with one spare folded microfiber pad beside it.'],
  ['spatula',   'Three RED food-grade hand scrapers (spatulas) of different sizes for cleaning bowls and production equipment, bright red plastic, fanned out.'],
  ['bucket',    'A YELLOW graduated professional bucket with printed measuring scale and a yellow food-grade container with lid, bright yellow plastic.'],
  ['trolley',   'A WHITE professional cleaning trolley on wheels with a mop wringer and two buckets, one red and one blue, compact single frame.'],
  ['dispenser', 'A wall-mounted chemical dosing dispenser unit in white and blue with clear tubing, next to a blue bottle of professional cleaning solution.'],
  ['rack',      'A GREEN wall-mounted shadow-board tool holder rail with clips, holding a green squeegee and a green brush vertically.'],
];

async function gen(name, prompt, attempt = 1) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${STYLE}\n\nSubject: ${prompt}` }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '4:3' },
        },
      }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    if (attempt < 3 && (res.status === 429 || res.status >= 500)) {
      await new Promise(r => setTimeout(r, 5000 * attempt));
      return gen(name, prompt, attempt + 1);
    }
    throw new Error(`${name}: HTTP ${res.status} ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!part) throw new Error(`${name}: нет изображения в ответе`);
  const file = path.join(OUT, `cat-${name}.png`);
  await writeFile(file, Buffer.from(part.inlineData.data, 'base64'));
  console.log(`OK  cat-${name}.png`);
}

await mkdir(OUT, { recursive: true });
for (const [name, prompt] of CATS) {
  try { await gen(name, prompt); }
  catch (e) { console.error('FAIL', e.message); }
}
