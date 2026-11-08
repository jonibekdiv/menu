/* Osh Markazi menyu: shared data, icons and UI helpers for index.html and admin.html */
'use strict';

const STORE_KEY = 'oshmarkazi.menyu.v1';   // admin qoralamasi (shu brauzerda)
const PIN_KEY   = 'oshmarkazi.menyu.pin';  // PIN xeshi (shu brauzerda)
const THEME_KEY = 'oshmarkazi.menyu.theme';
const PUBLISHED_URL = 'menu.json';         // saytdagi nashr qilingan menyu

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- icons ---------- */
const ICONS = {
  search:   '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  plus:     '<path d="M12 5v14M5 12h14"/>',
  edit:     '<path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/>',
  trash:    '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6.5 7l1 13h9l1-13"/><path d="M10 11v6M14 11v6"/>',
  x:        '<path d="M6 6l12 12M18 6L6 18"/>',
  sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:     '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  lock:     '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  phone:    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
  telegram: '<path d="M22 3L2 11l6 2 2 7 3-5 5 3 4-15z"/><path d="M8 13l12-9"/>',
  clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  location: '<path d="M12 21s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  image:    '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="M21 15l-5-5-9 9"/>',
  up:       '<path d="M12 19V5M5 12l7-7 7 7"/>',
  chevronLeft:  '<path d="M15 6l-6 6 6 6"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  down:     '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload:   '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
  eye:      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  logout:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  rotate:   '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v5h5"/>',
  star:     '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  flame:    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>',
  bowl:     '<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 8c0-1.5.5-2 .5-3.5M12 8c0-1.5.5-2 .5-3.5M16 8c0-1.5.5-2 .5-3.5"/>',
  skewer:   '<path d="M4 20L20 4"/><circle cx="10" cy="14" r="2" fill="currentColor"/><circle cx="14" cy="10" r="2" fill="currentColor"/>',
  dumpling: '<path d="M4 14h16"/><path d="M5 14c0 4 3 6 7 6s7-2 7-6"/><path d="M9 10c0-3 6-3 6 0"/>',
  noodles:  '<path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M6 6l12-2M6 8l12-2"/>',
  bread:    '<path d="M4 12c0-4 3-6 8-6s8 2 8 6c0 3-1 5-2 6H6c-1-1-2-3-2-6z"/><path d="M8 9l1 3M12 9l1 3M16 9l1 3"/>',
  cup:      '<path d="M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/><path d="M16 9h2a3 3 0 0 1 0 6h-2"/>',
  cake:     '<path d="M3 20h18M4 20v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6"/><path d="M8 11V8a2 2 0 0 1 4 0M16 11V8a2 2 0 0 0-4 0"/>',
  salad:    '<path d="M4 14h16a8 8 0 0 1-16 0z"/><path d="M8 10c1-3 3-4 4-2M12 8c0-3 3-4 4-2"/>',
  plate:    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>'
};
function svg(name, size = 20) {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.plate}</svg>`;
}
const ICON_CHOICES = [
  ['bowl', 'Osh'], ['skewer', 'Shashlik'], ['dumpling', 'Manti'], ['noodles', "Lag'mon"],
  ['bread', 'Non'], ['cup', 'Ichimlik'], ['cake', 'Shirinlik'], ['salad', 'Salat'], ['plate', 'Boshqa']
];
const TAGS = { Mashhur: 'star', Hit: 'flame', Yangi: 'sparkles' };
const MAX_IMGS = 6;

/* ---------- default menu ---------- */
const DEFAULT_CATS = [
  ['plov', 'Plov', 'bowl'], ['shashlik', 'Shashlik', 'skewer'], ['manti', 'Manti', 'dumpling'],
  ['lagmon', "Lag'mon", 'noodles'], ['non', 'Non va somsa', 'bread'], ['ichimlik', 'Ichimliklar', 'cup']
];
const DEFAULT_DISHES = [
  ['Toshkent oshi',   "An'anaviy to'y oshi: devzira guruch, qo'zichoq, sabzi", 45000, 'plov',     'Mashhur', "Guruch, qo'zichoq, sabzi, piyoz, zira"],
  ['Chayxona oshi',   "Choyxona uslubidagi to'yimli osh, no'xat bilan",        52000, 'plov',     'Hit',     "Guruch, qo'zichoq, no'xat, mayiz, sabzi"],
  ['Bayram oshi',     "Bedana tuxumi va za'faron bilan bayram dasturxoni",      65000, 'plov',     'Yangi',   "Guruch, qo'zichoq, bedana tuxumi, za'faron"],
  ['Qiyma shashlik',  "Yangi maydalangan go'shtdan, ko'mirda pishirilgan",      25000, 'shashlik', 'Mashhur', "Qiyma, piyoz, ziravorlar, non"],
  ["Qo'y shashlik",   "Yumshoq qo'zichoq bo'laklari, dudlangan ta'm bilan",     35000, 'shashlik', 'Hit',     "Qo'zichoq go'shti, tuz, zira, piyoz"],
  ['Tovuq shashlik',  "Marinadlangan tovuq filesi, yengil va sharbatli",        28000, 'shashlik', '',        "Tovuq filesi, sarimsoq, ziravorlar"],
  ['Jigar shashlik',  "Jigar shashlik, achchiq-qalampir ta'm bilan",            22000, 'shashlik', '',        "Jigar, piyoz, ziravorlar"],
  ["Bug'doy manti",   "Yupqa xamir, suvli qiyma, bug'da pishirilgan",           30000, 'manti',    'Mashhur', "Xamir, go'sht, piyoz, qovoq"],
  ['Tandir manti',    "Tandirda qizartirilgan, qarsildoq manti",                38000, 'manti',    'Yangi',   "Xamir, go'sht, piyoz, kunjut"],
  ['Xonim',           "Yupqa xamir o'ramidagi sabzavotli taom",                 32000, 'manti',    '',        "Xamir, kartoshka, qovoq, piyoz"],
  ["Qo'l lag'mon",    "Qo'lda cho'zilgan xamir, sabzavotli qovurma",            42000, 'lagmon',   'Hit',     "Xamir, go'sht, sabzavot, sarimsoq"],
  ["Qovurma lag'mon", "Qozonda qovurilgan, achchiqroq ta'm",                    38000, 'lagmon',   '',        "Xamir, go'sht, bulg'or qalampiri"],
  ["Sho'rva lag'mon", "Issiq sho'rva bilan, sovuq kunlar uchun",                40000, 'lagmon',   '',        "Xamir, go'sht, sabzavot, ko'kat"],
  ['Obi non',         "Tandirdan yangi chiqqan, qarsildoq non",                 5000,  'non',      'Mashhur', "Un, suv, xamirturush, tuz"],
  ['Patir',           "Qatlamli, sariyog'li tandir patiri",                     8000,  'non',      '',        "Un, sariyog', sut, kunjut"],
  ['Tandir somsa',    "Tandirda pishirilgan, go'shtli somsa",                   12000, 'non',      '',        "Xamir, go'sht, piyoz, zira"],
  ["Ko'k choy",       "Choynakda damlangan ko'k choy",                          5000,  'ichimlik', 'Mashhur', "Ko'k choy bargi, qaynoq suv"],
  ['Ayron',           "Uy ayroni, salqin va foydali",                           10000, 'ichimlik', '',        "Qatiq, tuz, suv, ko'kat"],
  ['Kompot',          "Mevali uy kompoti, tabiiy shirinlik",                    12000, 'ichimlik', '',        "Olma, o'rik, uzum, suv"]
];
const DEFAULT_SETTINGS = {
  name: 'Osh Markazi', phone: '+998 90 123 45 67', telegram: 'oshmarkazi',
  hours: 'Har kuni 09:00 dan 22:00 gacha', address: '', currency: "so'm"
};
function defaultMenu() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    settings: { ...DEFAULT_SETTINGS },
    cats: DEFAULT_CATS.map(([id, name, icon]) => ({ id, name, icon })),
    dishes: DEFAULT_DISHES.map((d, i) => ({
      id: `${d[3]}-${i + 1}`, name: d[0], desc: d[1], price: d[2], cat: d[3],
      tag: d[4], ing: d[5], imgs: [], available: true
    }))
  };
}

/* Keeps any loaded menu in a known shape, whatever file it came from. */
function normalizeMenu(m) {
  const base = defaultMenu();
  if (!m || typeof m !== 'object') return base;
  const cats = Array.isArray(m.cats) ? m.cats.filter(c => c && c.id).map(c => ({
    id: String(c.id), name: String(c.name || 'Kategoriya'), icon: ICONS[c.icon] ? c.icon : 'plate'
  })) : base.cats;
  const dishes = Array.isArray(m.dishes) ? m.dishes.filter(d => d && d.name).map(d => ({
    id: String(d.id || uid()), name: String(d.name), desc: String(d.desc || ''),
    price: Math.max(0, Math.round(Number(d.price) || 0)), cat: String(d.cat || (cats[0] && cats[0].id) || ''),
    tag: TAGS[d.tag] ? d.tag : '', ing: String(d.ing || ''),
    imgs: (Array.isArray(d.imgs) ? d.imgs : (d.img ? [d.img] : [])).filter(x => typeof x === 'string' && x).slice(0, MAX_IMGS),
    available: d.available !== false
  })) : base.dishes;
  const settings = { ...DEFAULT_SETTINGS, ...(m.settings || {}) };
  delete settings.pin; delete settings.pinHash;
  return { version: 1, updatedAt: m.updatedAt || base.updatedAt, settings, cats, dishes };
}

/* ---------- storage ---------- */
function loadDraft() {
  try { const raw = localStorage.getItem(STORE_KEY); return raw ? normalizeMenu(JSON.parse(raw)) : null; }
  catch (e) { return null; }
}
function saveDraft(menu) {
  menu.updatedAt = new Date().toISOString();
  try { localStorage.setItem(STORE_KEY, JSON.stringify(menu)); return true; }
  catch (e) { toast("Saqlab bo'lmadi: brauzer xotirasi to'lgan bo'lishi mumkin. Kattaroq rasmlarni olib tashlang."); return false; }
}
function clearDraft() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} }
async function loadPublished() {
  try {
    const res = await fetch(PUBLISHED_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    return normalizeMenu(await res.json());
  } catch (e) { return null; }
}

/* ---------- formatting ---------- */
const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const fmtPrice = (n, cur) => Number(n || 0).toLocaleString('ru-RU').replace(/ /g, ' ') + ' ' + cur;
const STAND_IN = {
  plov: 'photo-1512058564366-18510be2db19', shashlik: 'photo-1529042410759-befb1204b468',
  manti: 'photo-1563245372-f21724e3856d', lagmon: 'photo-1569718212165-3a8278d5f624',
  non: 'photo-1509440159596-0249088772ff', ichimlik: 'photo-1544787219-7f47ccb76574'
};
/* All pictures of a dish: the owner's uploads, or one stand-in photo for its category. */
function dishImages(d, w = 900) {
  if (d.imgs && d.imgs.length) return d.imgs;
  const id = STAND_IN[d.cat];
  return id ? [`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78`] : [];
}
const dishImage = (d, w = 600) => dishImages(d, w)[0] || '';
/* Search text without case or apostrophe differences: lag'mon, lag’mon, lagmon all match. */
const norm = v => String(v || '').toLowerCase().replace(/['`´‘’ʻʼ]/g, '').replace(/\s+/g, ' ').trim();
/* Ingredients as a list, split on commas. */
const ingList = s => String(s || '').split(/[,;\n]/).map(x => x.trim()).filter(Boolean);
function telHref(v) { const n = String(v || '').replace(/[^\d+]/g, ''); return n ? 'tel:' + n : ''; }
function telegramHref(v) {
  const s = String(v || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) {
    try { const u = new URL(s); return /(^|\.)t(elegram)?\.me$/i.test(u.hostname) ? u.href : ''; } catch (e) { return ''; }
  }
  const name = s.replace(/^@/, '');
  return /^[A-Za-z0-9_]{4,32}$/.test(name) ? 'https://t.me/' + name : '';
}

/* ---------- theme ---------- */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  const b = $('#themeBtn');
  if (b) {
    b.innerHTML = svg(t === 'dark' ? 'sun' : 'moon', 20);
    b.setAttribute('aria-label', t === 'dark' ? "Yorug' rejim" : "Qorong'i rejim");
  }
}
function initTheme() {
  let t = null;
  try { t = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(t === 'dark' ? 'dark' : 'light');
  const b = $('#themeBtn');
  if (b) b.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}

/* ---------- toast ---------- */
let toastTimer = 0;
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- sheet (dialog) with Escape, focus trap and focus return ---------- */
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
let sheetOpener = null;
function openSheet(html) {
  const sheet = $('#sheet'), bd = $('#backdrop');
  if (!sheet.classList.contains('open')) sheetOpener = document.activeElement;
  sheet.innerHTML = html;
  sheet.scrollTop = 0;
  const head = sheet.querySelector('h2');
  if (head) { head.id = head.id || 'sheetTitle'; sheet.setAttribute('aria-labelledby', head.id); }
  sheet.classList.add('open');
  bd.classList.add('show');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => sheet.focus({ preventScroll: true }));
  return sheet;
}
function closeSheet() {
  const sheet = $('#sheet'), bd = $('#backdrop');
  if (!sheet.classList.contains('open')) return;
  sheet.classList.remove('open');
  bd.classList.remove('show');
  document.body.style.overflow = '';
  const back = sheetOpener; sheetOpener = null;
  if (back && back.isConnected) back.focus({ preventScroll: true });
  setTimeout(() => { if (!sheet.classList.contains('open')) sheet.innerHTML = ''; }, 450);
}
function initSheet() {
  $('#backdrop').addEventListener('click', closeSheet);
  $('#sheet').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });
  document.addEventListener('keydown', e => {
    const sheet = $('#sheet');
    if (!sheet.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
    if (e.key !== 'Tab') return;
    const items = $$(FOCUSABLE, sheet).filter(el => el.offsetParent !== null);
    if (!items.length) { e.preventDefault(); return; }
    const first = items[0], last = items[items.length - 1], a = document.activeElement;
    if (e.shiftKey && (a === first || a === sheet || !sheet.contains(a))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (a === last || !sheet.contains(a))) { e.preventDefault(); first.focus(); }
  });
}
