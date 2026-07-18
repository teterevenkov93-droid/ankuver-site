# Промпты для фото категорий (Nano Banana / Gemini)

Генерировать в https://aistudio.google.com (модель Nano Banana / Gemini Flash Image), формат 4:3.
Скачанные файлы класть в `assets/` со следующими именами.

## Общий стиль (добавлять к каждому промпту)

> Professional B2B catalog product photography, photorealistic. Clean light warm-grey seamless studio background, soft diffused lighting, gentle soft shadow under objects. Food-industry HACCP color-coded hygienic cleaning equipment, brand new condition. Slightly angled three-quarter view, objects fill most of the frame. No text, no logos, no labels, no people, no watermark.

## Категории

| Файл | Промпт (предмет) |
|---|---|
| `cat-brush.png` | A set of RED hygienic food-industry cleaning brushes: a hand brush, a narrow detail brush and a floor broom head, all with bright red plastic bodies and red bristles, arranged in a neat overlapping row. |
| `cat-squeegee.png` | A BLUE professional floor squeegee with rubber blade and a smaller blue table squeegee, bright blue plastic bodies, lying diagonally. |
| `cat-mop.png` | A GREEN professional flat mop: aluminum handle, bright green plastic mop frame and green microfiber pad, with one spare folded microfiber pad beside it. |
| `cat-spatula.png` | Three RED food-grade hand scrapers (spatulas) of different sizes for cleaning bowls and production equipment, bright red plastic, fanned out. |
| `cat-bucket.png` | A YELLOW graduated professional bucket with printed measuring scale and a yellow food-grade container with lid, bright yellow plastic. |
| `cat-trolley.png` | A WHITE professional cleaning trolley on wheels with a mop wringer and two buckets, one red and one blue, compact single frame. |
| `cat-dispenser.png` | A wall-mounted chemical dosing dispenser unit in white and blue with clear tubing, next to a blue bottle of professional cleaning solution. |
| `cat-rack.png` | A GREEN wall-mounted shadow-board tool holder rail with clips, holding a green squeegee and a green brush vertically. |

## Автоматический вариант

Если включён биллинг Google AI: `node tools/gen-photos.mjs` (нужна переменная `GEMINI_API_KEY`) — сгенерирует все 8 файлов в `assets/` сам.
