// Генерирует catalog.html из assets/catalog/catalog-data.json.
// Стиль — по DESIGN.md (Карта зон): токены и шапка согласованы с index.html.
// Запуск: cd tools && node build-catalog-page.mjs
import fs from 'node:fs';

const ROOT = 'C:/Users/CLOUD MAX/Desktop/ankuver-site';
const data = JSON.parse(fs.readFileSync(ROOT + '/assets/catalog/catalog-data.json', 'utf8'));
const total = data.reduce((s, c) => s + c.items.length, 0);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Доступные расцветки по категориям: статичная полоска кружков под товаром
// (только индикация, без интерактива). Ключ — слаг категории.
const CATEGORY_COLORS = {
  'buckets': ['blue', 'red', 'yellow', 'green', 'white', 'purple', 'orange'],
};
const COLOR_RU = { blue: 'Синий', red: 'Красный', yellow: 'Жёлтый', green: 'Зелёный', white: 'Белый', purple: 'Фиолетовый', orange: 'Оранжевый' };
const colorStrip = slug => {
  const colors = CATEGORY_COLORS[slug];
  if (!colors) return '';
  return '<span class="color-strip" role="img" aria-label="Доступные цвета: ' +
    colors.map(c => COLOR_RU[c]).join(', ').toLowerCase() + '">' +
    colors.map(c => '<i class="cs-dot cs-' + c + '" title="' + COLOR_RU[c] + '"></i>').join('') +
    '</span>';
};

const tiles = data.map(c => `      <a class="cat-tile" href="#${c.slug}" data-slug="${c.slug}">
        <span class="ct-img"><img src="${c.items[0].img}" alt="" loading="lazy" width="600" height="600"></span>
        <span class="ct-name">${esc(c.title)}</span>
        <span class="ct-count">${c.items.length} поз.</span>
      </a>`).join('\n');

const blocks = data.map(c => `    <section class="cat-block" id="${c.slug}">
      <div class="wrap">
        <div class="cb-head">
          <a class="cb-back" href="#catalog-top" data-back>← Все категории</a>
          <h2>${esc(c.title)}</h2>
          <span class="cb-count">${c.items.length} позиций</span>
        </div>
        <div class="prod-grid">
${c.items.map(p => `          <div class="prod-card">
            <div class="pc-img"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy" width="600" height="600"></div>
            <div class="pc-info"><span class="pc-art">Арт. ${esc(p.art)}</span><b>${esc(p.name)}</b>${colorStrip(c.slug)}</div>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Каталог инвентаря — АНКУВЕР | HACCP (ХАССП) инвентарь Schavon</title>
<meta name="description" content="Каталог HACCP (ХАССП) инвентаря АНКУВЕР: ${data.length} категорий, ${total} позиций — сгоны, щётки, вёдра, скребки, рукоятки, держатели. Цены и наличие — по запросу.">
<meta name="theme-color" content="#14406e">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2314406e'/%3E%3Ccircle cx='14' cy='8.5' r='3.6' fill='none' stroke='%23fff' stroke-width='2'/%3E%3Crect x='13' y='12' width='2.2' height='14' rx='1' fill='%23fff'/%3E%3Crect x='15.4' y='13' width='4' height='1.8' rx='.5' fill='%23c0392b'/%3E%3Crect x='15.4' y='16' width='6' height='1.8' rx='.5' fill='%232b6cb0'/%3E%3Crect x='15.4' y='19' width='3' height='1.8' rx='.5' fill='%232f9e5c'/%3E%3Crect x='15.4' y='22' width='5' height='1.8' rx='.5' fill='%23d6a324'/%3E%3Crect x='15.4' y='25' width='2.6' height='1.8' rx='.5' fill='%23e9e7dd'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  :root{
    --blue:#14406e; --blue-2:#1b5391; --blue-soft:#eaf1f8;
    --paper:#ffffff; --line:#d7e0ea; --text:#16293c; --text-soft:#55687c;
    --green:#2f9e5c; --green-dark:#23824a;
    --radius:3px;
    --font-head:"Oswald",sans-serif; --font-body:"IBM Plex Sans",sans-serif; --font-mono:"IBM Plex Mono",monospace;
    --ease-out-quart:cubic-bezier(0.25,1,0.5,1);
  }
  *{ box-sizing:border-box; margin:0; padding:0; }
  html{ scroll-behavior:smooth; scroll-padding-top:92px; }
  body{ font-family:var(--font-body); color:var(--text); background:var(--paper); line-height:1.55; -webkit-font-smoothing:antialiased; }
  img{ max-width:100%; display:block; }
  a{ color:inherit; text-decoration:none; }
  a:focus-visible, button:focus-visible{ outline:2px solid var(--green); outline-offset:3px; border-radius:var(--radius); }
  .wrap{ max-width:1180px; margin:0 auto; padding:0 24px; }
  h1,h2,h3{ font-family:var(--font-head); text-transform:uppercase; letter-spacing:0.02em; font-weight:600; color:var(--blue); text-wrap:balance; }

  header{ position:sticky; top:0; z-index:100; background:rgba(255,255,255,0.94); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); }
  .nav{ display:flex; align-items:center; justify-content:space-between; height:76px; gap:16px; }
  .logo{ display:flex; align-items:center; gap:12px; font-family:var(--font-head); font-size:21px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; color:var(--blue); }
  .logomark{ flex:none; width:34px; height:40px; display:flex; align-items:center; justify-content:center; background:var(--blue); border-radius:4px; }
  .logomark svg{ width:19px; height:29px; }
  .nav-links{ display:flex; gap:30px; font-size:14px; font-weight:500; }
  .nav-links a{ color:var(--text-soft); transition:color .15s ease; }
  .nav-links a:hover, .nav-links a[aria-current]{ color:var(--blue); }
  .nav-cta{ display:flex; align-items:center; gap:16px; }
  .nav-phone{ font-family:var(--font-mono); font-size:14px; color:var(--blue); display:none; }
  @media(min-width:1020px){ .nav-phone{ display:block; } }
  .btn{ display:inline-flex; align-items:center; gap:10px; font-family:var(--font-mono); font-size:13px; letter-spacing:0.06em; text-transform:uppercase; padding:15px 28px; border-radius:var(--radius); border:1px solid transparent; cursor:pointer; transition:transform .15s ease, background .2s ease; }
  .btn:active{ transform:translateY(1px); }
  .btn-green{ background:var(--green); color:#fff; }
  .btn-green:hover{ background:var(--green-dark); }
  .btn-blue{ background:var(--blue); color:#fff; }
  .btn-blue:hover{ background:var(--blue-2); }
  @media(max-width:900px){ .nav-links{ display:none; } .nav-cta .btn{ padding:13px 16px; font-size:11.5px; } }

  .cat-hero{ background:var(--blue-soft); padding:52px 0 44px; }
  .eyebrow{ font-family:var(--font-mono); font-size:12.5px; letter-spacing:0.14em; text-transform:uppercase; color:var(--green-dark); display:flex; align-items:center; gap:10px; margin-bottom:14px; }
  .eyebrow::before{ content:""; width:22px; height:2px; background:var(--green); }
  .cat-hero h1{ font-size:clamp(26px,3.4vw,38px); line-height:1.12; }
  .cat-hero p{ color:var(--text-soft); font-size:16px; margin-top:12px; max-width:660px; }

  .tiles-zone{ padding:44px 0 64px; }
  .cat-tiles{ display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:16px; }
  .cat-tile{ border:1px solid var(--line); border-radius:var(--radius); background:#fff; padding:14px; display:flex; flex-direction:column; gap:4px; transition:transform .2s ease, box-shadow .2s ease; }
  .cat-tile:hover{ transform:translateY(-4px); box-shadow:0 12px 28px rgba(20,64,110,0.12); }
  .ct-img{ aspect-ratio:1; display:block; margin-bottom:8px; }
  .ct-img img{ width:100%; height:100%; object-fit:contain; }
  .ct-name{ font-family:var(--font-head); text-transform:uppercase; letter-spacing:.03em; font-weight:600; font-size:14.5px; color:var(--blue); }
  .ct-count{ font-family:var(--font-mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--text-soft); }

  .cat-block{ padding:44px 0 20px; }
  .cat-block:last-of-type{ padding-bottom:72px; }
  .cb-head{ display:flex; align-items:baseline; gap:18px; flex-wrap:wrap; border-bottom:1px solid var(--line); padding-bottom:14px; margin-bottom:22px; }
  .cb-head h2{ font-size:clamp(20px,2.4vw,26px); }
  .cb-back{ font-family:var(--font-mono); font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--green-dark); }
  .cb-back:hover{ color:var(--green); }
  .cb-count{ font-family:var(--font-mono); font-size:11.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--text-soft); margin-left:auto; }
  .prod-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(190px, 1fr)); gap:14px; }
  .prod-card{ border:1px solid var(--line); border-radius:var(--radius); background:#fff; overflow:hidden; }
  .pc-img{ aspect-ratio:1; border-bottom:1px solid var(--line); }
  .pc-img img{ width:100%; height:100%; object-fit:contain; }
  .pc-info{ padding:10px 12px 12px; }
  .pc-art{ display:block; font-family:var(--font-mono); font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--text-soft); margin-bottom:3px; }
  .pc-info b{ font-size:13px; font-weight:600; line-height:1.35; color:var(--text); }

  /* Доступные расцветки: статичная индикация, без интерактива */
  .color-strip{ display:flex; gap:6px; margin-top:9px; }
  .cs-dot{ width:13px; height:13px; border-radius:50%; border:1px solid rgba(22,41,60,0.18); }
  .cs-blue{ background:#2b6cb0; } .cs-red{ background:#c0392b; } .cs-yellow{ background:#d6a324; }
  .cs-green{ background:#2f9e5c; } .cs-white{ background:#e9e7dd; border-color:#c9c6b8; }
  .cs-purple{ background:#8e44ad; } .cs-orange{ background:#d35400; }

  /* Режим «одна категория»: JS вешает mode-single + active */
  body.mode-single .tiles-zone, body.mode-single .cat-block{ display:none; }
  body.mode-single .cat-block.active{ display:block; padding-top:36px; }
  body:not(.mode-single) .cb-back{ display:none; }

  .cat-cta{ background:var(--blue); color:#fff; padding:52px 0; }
  .cat-cta .inner{ display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
  .cat-cta h2{ color:#fff; font-size:clamp(20px,2.6vw,28px); }
  .cat-cta p{ color:rgba(255,255,255,0.7); font-size:14.5px; margin-top:6px; }
  footer{ background:var(--blue); border-top:1px solid rgba(255,255,255,0.12); padding:28px 0; }
  .footer-inner{ display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
  footer p{ font-size:12.5px; color:rgba(255,255,255,0.62); }
  footer .flink{ font-size:13px; color:rgba(255,255,255,0.6); }
  footer .flink:hover{ color:#fff; }
  @media (prefers-reduced-motion: reduce){
    html{ scroll-behavior:auto; }
    .cat-tile{ transition:none; } .cat-tile:hover{ transform:none; }
  }
</style>
</head>
<body id="catalog-top">

<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="ankuver-key" viewBox="0 0 18 28">
    <circle cx="8.4" cy="6.4" r="4.6" fill="none" stroke="#fff" stroke-width="2.4"/>
    <rect x="7.2" y="10.4" width="2.4" height="16" rx="1" fill="#fff"/>
    <rect x="9.6" y="11.2" width="4.4" height="2" rx="0.5" fill="#c0392b"/>
    <rect x="9.6" y="14.4" width="6.8" height="2" rx="0.5" fill="#2b6cb0"/>
    <rect x="9.6" y="17.6" width="3.2" height="2" rx="0.5" fill="#2f9e5c"/>
    <rect x="9.6" y="20.8" width="5.6" height="2" rx="0.5" fill="#d6a324"/>
    <rect x="9.6" y="24.0" width="2.6" height="2" rx="0.5" fill="#e9e7dd"/>
  </symbol>
</svg>

<header>
  <div class="wrap nav">
    <a href="index.html" class="logo">
      <span class="logomark" aria-hidden="true"><svg><use href="#ankuver-key"></use></svg></span>
      Анкувер
    </a>
    <nav class="nav-links">
      <a href="index.html">Главная</a>
      <a href="catalog.html" aria-current="page">Каталог</a>
      <a href="index.html#contacts">Контакты</a>
    </nav>
    <div class="nav-cta">
      <a class="nav-phone" href="tel:+70000000000">+7 (000) 000-00-00</a>
      <a href="index.html#catalog" class="btn btn-blue">Получить PDF-каталог</a>
    </div>
  </div>
</header>

<main>
  <section class="cat-hero">
    <div class="wrap">
      <div class="eyebrow">Каталог</div>
      <h1>Каталог инвентаря</h1>
      <p>${data.length} категорий, ${total} позиций профессионального HACCP (ХАССП) инвентаря Schavon. Выберите категорию — внутри артикулы и фото. Цены и наличие — по запросу.</p>
    </div>
  </section>

  <div class="tiles-zone">
    <div class="wrap cat-tiles">
${tiles}
    </div>
  </div>

${blocks}

  <section class="cat-cta">
    <div class="wrap inner">
      <div>
        <h2>Нужны цены и наличие?</h2>
        <p>Пришлём PDF-каталог с ценами и соберём комплект под ваши зоны.</p>
      </div>
      <a href="index.html#catalog" class="btn btn-green">Получить каталог с ценами</a>
    </div>
  </section>
</main>

<footer>
  <div class="wrap footer-inner">
    <a href="index.html" class="logo" style="color:#fff; font-size:16px;">
      <span class="logomark" aria-hidden="true" style="background:rgba(255,255,255,0.1);"><svg><use href="#ankuver-key"></use></svg></span>
      Анкувер
    </a>
    <a class="flink" href="index.html">← Вернуться на главную</a>
    <p>© 2026 АНКУВЕР. HACCP (ХАССП) инвентарь для пищевой промышленности.</p>
  </div>
</footer>

<script>
(function(){
  // «Проваливание» в категорию: плитка скрывает всё, кроме своей секции.
  // Без JS страница остаётся полной: плитки работают как якоря.
  var blocks = document.querySelectorAll('.cat-block');
  function show(slug, push){
    var target = slug && document.getElementById(slug);
    blocks.forEach(function(b){ b.classList.toggle('active', b === target); });
    document.body.classList.toggle('mode-single', !!target);
    if (push){
      if (target) history.pushState(null, '', '#' + slug);
      else history.pushState(null, '', location.pathname);
    }
    window.scrollTo(0, 0);
  }
  document.querySelectorAll('.cat-tile').forEach(function(tile){
    tile.addEventListener('click', function(e){
      e.preventDefault();
      show(tile.dataset.slug, true);
    });
  });
  document.querySelectorAll('[data-back]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      show(null, true);
    });
  });
  function fromHash(){
    var slug = location.hash.replace('#', '');
    show(document.getElementById(slug) && slug !== 'catalog-top' ? slug : null, false);
  }
  addEventListener('popstate', fromHash);
  if (location.hash) fromHash();
})();
</script>

</body>
</html>
`;
fs.writeFileSync(ROOT + '/catalog.html', html);
console.log('catalog.html:', data.length, 'categories,', total, 'items,', (html.length / 1024).toFixed(0), 'KB');
