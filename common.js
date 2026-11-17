/* Osh Markazi menyu: shared data, icons, translations and UI helpers for index.html and admin.html */
'use strict';

const STORE_KEY = 'oshmarkazi.menyu.v1';   // admin qoralamasi (shu brauzerda)
const PIN_KEY   = 'oshmarkazi.menyu.pin';  // PIN xeshi (shu brauzerda)
const THEME_KEY = 'oshmarkazi.menyu.theme';
const LANG_KEY  = 'oshmarkazi.menyu.lang';
const PUBLISHED_URL = 'menu.json';         // saytdagi nashr qilingan menyu
const DEFAULT_LOGO = 'logo.svg';           // test logotipi; admin o'zinikini yuklaydi

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- icons ---------- */
const ICONS = {
  search:   '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  plus:     '<path d="M12 5v14M5 12h14"/>',
  minus:    '<path d="M5 12h14"/>',
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
  map:      '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  image:    '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="M21 15l-5-5-9 9"/>',
  up:       '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down:     '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  chevronLeft:  '<path d="M15 6l-6 6 6 6"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload:   '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
  eye:      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  logout:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  rotate:   '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v5h5"/>',
  printer:  '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
  qr:       '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
  globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  star:     '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  flame:    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>',
  chili:    '<path d="M18 6c-1-2-3-3-4-2"/><path d="M17 7c2 3 1 9-5 12-3 1.5-7 1-8-1 3 0 6-1 8-4s3-6 5-7z"/>',
  leaf:     '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
  scale:    '<path d="M6 8h12l2 12H4L6 8z"/><circle cx="12" cy="5" r="2"/>',
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
const FLAGS = { spicy: 'chili', veg: 'leaf' };
const MAX_IMGS = 6;

/* ---------- languages ---------- */
const LANGS = ['uz', 'ru', 'en'];
const LANG_SHORT = { uz: 'UZ', ru: 'RU', en: 'EN' };
const LANG_NAMES = { uz: "O'zbekcha", ru: 'Русский', en: 'English' };
const T = {
  uz: {
    menuOf: n => `${n} menyusi`, search: 'Taom qidirish', searchPh: 'Taom yoki mahsulot: manti, sabzi',
    clear: 'Qidiruvni tozalash', cats: 'Kategoriyalar', dishes: n => `${n} ta taom`, found: n => `${n} ta taom topildi`,
    nothing: 'Hech narsa topilmadi', nothingSub: "Boshqa so'z bilan qidiring yoki qidiruvni tozalang.",
    price: 'Narxi', from: 'dan', ing: 'Tarkibi', weight: 'Vazni', portions: 'Porsiyalar', close: 'Yopish',
    photos: n => `${n} rasmlari`, prev: 'Oldingi rasm', next: 'Keyingi rasm', photoN: (i, n) => `${i}-rasm, jami ${n}`,
    open: 'Hozir ochiq', closed: 'Hozir yopiq', until: x => `${x} gacha`, opensAt: x => `${x} da ochiladi`, allDay: 'Kecha-kunduz',
    daily: 'Har kuni', seeMenu: "Menyuni ko'rish", call: "Qo'ng'iroq", onMap: 'Xaritada ochish',
    featured: 'Kun taomi', details: 'Batafsil', spicy: 'Achchiq', veg: 'Vegetarian',
    currencyNote: c => `Narxlar ${c}da.`, draft: "Bu admin qoralamasi, faqat shu brauzerda ko'rinadi.",
    lang: 'Til', light: "Yorug' rejim", dark: "Qorong'i rejim", toTop: 'Menyu boshiga', loading: 'Menyu yuklanmoqda'
  },
  ru: {
    menuOf: n => `Меню «${n}»`, search: 'Поиск блюд', searchPh: 'Блюдо или продукт: манты, морковь',
    clear: 'Очистить поиск', cats: 'Категории', dishes: n => `Блюд: ${n}`, found: n => `Найдено блюд: ${n}`,
    nothing: 'Ничего не найдено', nothingSub: 'Попробуйте другое слово или очистите поиск.',
    price: 'Цена', from: 'от', ing: 'Состав', weight: 'Вес', portions: 'Порции', close: 'Закрыть',
    photos: n => `Фото: ${n}`, prev: 'Предыдущее фото', next: 'Следующее фото', photoN: (i, n) => `Фото ${i} из ${n}`,
    open: 'Сейчас открыто', closed: 'Сейчас закрыто', until: x => `до ${x}`, opensAt: x => `откроется в ${x}`, allDay: 'Круглосуточно',
    daily: 'Ежедневно', seeMenu: 'Смотреть меню', call: 'Позвонить', onMap: 'Открыть на карте',
    featured: 'Блюдо дня', details: 'Подробнее', spicy: 'Острое', veg: 'Вегетарианское',
    currencyNote: c => `Цены в ${c}.`, draft: 'Это черновик администратора, виден только в этом браузере.',
    lang: 'Язык', light: 'Светлая тема', dark: 'Тёмная тема', toTop: 'К началу меню', loading: 'Меню загружается'
  },
  en: {
    menuOf: n => `${n} menu`, search: 'Search dishes', searchPh: 'Dish or ingredient: manti, carrot',
    clear: 'Clear search', cats: 'Categories', dishes: n => `${n} dishes`, found: n => `${n} dishes found`,
    nothing: 'Nothing found', nothingSub: 'Try another word or clear the search.',
    price: 'Price', from: 'from', ing: 'Ingredients', weight: 'Weight', portions: 'Portions', close: 'Close',
    photos: n => `${n} photos`, prev: 'Previous photo', next: 'Next photo', photoN: (i, n) => `Photo ${i} of ${n}`,
    open: 'Open now', closed: 'Closed now', until: x => `until ${x}`, opensAt: x => `opens at ${x}`, allDay: 'Open 24/7',
    daily: 'Every day', seeMenu: 'See the menu', call: 'Call us', onMap: 'Open in maps',
    featured: 'Dish of the day', details: 'Details', spicy: 'Spicy', veg: 'Vegetarian',
    currencyNote: c => `Prices in ${c}.`, draft: 'This is the admin draft, visible only in this browser.',
    lang: 'Language', light: 'Light theme', dark: 'Dark theme', toTop: 'Back to menu top', loading: 'Loading the menu'
  }
};
let LANG = 'uz';
function initLang() {
  let l = null;
  try { l = localStorage.getItem(LANG_KEY); } catch (e) {}
  if (!LANGS.includes(l)) l = 'uz';
  setLang(l, false);
}
function setLang(l, persist = true) {
  LANG = LANGS.includes(l) ? l : 'uz';
  document.documentElement.lang = LANG;
  if (persist) { try { localStorage.setItem(LANG_KEY, LANG); } catch (e) {} }
}
const t = (k, ...a) => { const v = (T[LANG] && T[LANG][k]) ?? T.uz[k]; return typeof v === 'function' ? v(...a) : v; };
/* Dish or category text in the current language, falling back to Uzbek. */
const tr = (obj, field) => (LANG !== 'uz' && obj.tr && obj.tr[LANG] && obj.tr[LANG][field]) || obj[field] || '';

/* ---------- default menu ---------- */
const DEFAULT_CATS = [
  ['plov', 'Plov', 'bowl', 'Плов', 'Plov'],
  ['shashlik', 'Shashlik', 'skewer', 'Шашлык', 'Kebabs'],
  ['manti', 'Manti', 'dumpling', 'Манты', 'Dumplings'],
  ['lagmon', "Lag'mon", 'noodles', 'Лагман', 'Lagman noodles'],
  ['non', 'Non va somsa', 'bread', 'Хлеб и самса', 'Bread and samsa'],
  ['ichimlik', 'Ichimliklar', 'cup', 'Напитки', 'Drinks']
];
/* name, desc, price, cat, tag, ing, weight, flags, ru [name, desc, ing], en [name, desc, ing] */
const DEFAULT_DISHES = [
  ['Toshkent oshi', "An'anaviy to'y oshi: devzira guruch, qo'zichoq, sabzi", 45000, 'plov', 'Mashhur', "Guruch, qo'zichoq, sabzi, piyoz, zira", '350 g', [],
    ['Ташкентский плов', 'Традиционный свадебный плов: рис девзира, баранина, морковь', 'Рис, баранина, морковь, лук, зира'],
    ['Tashkent plov', 'Traditional wedding plov: devzira rice, lamb, carrots', 'Rice, lamb, carrots, onion, cumin']],
  ['Chayxona oshi', "Choyxona uslubidagi to'yimli osh, no'xat bilan", 52000, 'plov', 'Hit', "Guruch, qo'zichoq, no'xat, mayiz, sabzi", '400 g', [],
    ['Чайханский плов', 'Сытный плов в стиле чайханы, с нутом', 'Рис, баранина, нут, изюм, морковь'],
    ['Teahouse plov', 'Hearty teahouse-style plov with chickpeas', 'Rice, lamb, chickpeas, raisins, carrots']],
  ['Bayram oshi', "Bedana tuxumi va za'faron bilan bayram dasturxoni", 65000, 'plov', 'Yangi', "Guruch, qo'zichoq, bedana tuxumi, za'faron", '400 g', [],
    ['Праздничный плов', 'Праздничный плов с перепелиными яйцами и шафраном', 'Рис, баранина, перепелиные яйца, шафран'],
    ['Festive plov', 'Festive plov with quail eggs and saffron', 'Rice, lamb, quail eggs, saffron']],
  ['Qiyma shashlik', "Yangi maydalangan go'shtdan, ko'mirda pishirilgan", 25000, 'shashlik', 'Mashhur', 'Qiyma, piyoz, ziravorlar, non', '1 six', [],
    ['Люля-кебаб', 'Из свежего фарша, на углях', 'Фарш, лук, специи, лепёшка'],
    ['Minced kebab', 'Freshly minced meat, grilled over charcoal', 'Minced meat, onion, spices, bread']],
  ["Qo'y shashlik", "Yumshoq qo'zichoq bo'laklari, dudlangan ta'm bilan", 35000, 'shashlik', 'Hit', "Qo'zichoq go'shti, tuz, zira, piyoz", '1 six', [],
    ['Шашлык из баранины', 'Нежные кусочки баранины с дымком', 'Баранина, соль, зира, лук'],
    ['Lamb kebab', 'Tender lamb pieces with a smoky taste', 'Lamb, salt, cumin, onion']],
  ['Tovuq shashlik', 'Marinadlangan tovuq filesi, yengil va sharbatli', 28000, 'shashlik', '', 'Tovuq filesi, sarimsoq, ziravorlar', '1 six', [],
    ['Куриный шашлык', 'Маринованное куриное филе, лёгкое и сочное', 'Куриное филе, чеснок, специи'],
    ['Chicken kebab', 'Marinated chicken fillet, light and juicy', 'Chicken fillet, garlic, spices']],
  ['Jigar shashlik', "Jigar shashlik, achchiq qalampir ta'mi bilan", 22000, 'shashlik', '', 'Jigar, piyoz, ziravorlar', '1 six', ['spicy'],
    ['Шашлык из печени', 'Шашлык из печени, с острым перцем', 'Печень, лук, специи'],
    ['Liver kebab', 'Liver kebab with hot pepper', 'Liver, onion, spices']],
  ["Bug'doy manti", "Yupqa xamir, suvli qiyma, bug'da pishirilgan", 30000, 'manti', 'Mashhur', "Xamir, go'sht, piyoz, qovoq", '5 dona', [],
    ['Манты', 'Тонкое тесто, сочный фарш, на пару', 'Тесто, мясо, лук, тыква'],
    ['Steamed manti', 'Thin dough, juicy filling, steamed', 'Dough, meat, onion, pumpkin']],
  ['Tandir manti', 'Tandirda qizartirilgan, qarsildoq manti', 38000, 'manti', 'Yangi', "Xamir, go'sht, piyoz, kunjut", '5 dona', [],
    ['Тандыр-манты', 'Хрустящие манты из тандыра', 'Тесто, мясо, лук, кунжут'],
    ['Tandoor manti', 'Crispy manti baked in a clay oven', 'Dough, meat, onion, sesame']],
  ['Xonim', "Yupqa xamir o'ramidagi sabzavotli taom", 32000, 'manti', '', 'Xamir, kartoshka, qovoq, piyoz', '300 g', ['veg'],
    ['Ханум', 'Овощной рулет в тонком тесте', 'Тесто, картофель, тыква, лук'],
    ['Khanum', 'Vegetable roll in thin dough', 'Dough, potato, pumpkin, onion']],
  ["Qo'l lag'mon", "Qo'lda cho'zilgan xamir, sabzavotli qovurma", 42000, 'lagmon', 'Hit', "Xamir, go'sht, sabzavot, sarimsoq", '450 g', [],
    ['Лагман ручной', 'Тянутая вручную лапша с овощной поджаркой', 'Тесто, мясо, овощи, чеснок'],
    ['Hand-pulled lagman', 'Hand-pulled noodles with stir-fried vegetables', 'Dough, meat, vegetables, garlic']],
  ["Qovurma lag'mon", "Qozonda qovurilgan, achchiqroq ta'm", 38000, 'lagmon', '', "Xamir, go'sht, bulg'or qalampiri", '400 g', ['spicy'],
    ['Жареный лагман', 'Обжаренный в казане, остренький', 'Тесто, мясо, болгарский перец'],
    ['Fried lagman', 'Wok-fried in a kazan, a bit spicy', 'Dough, meat, bell pepper']],
  ["Sho'rva lag'mon", "Issiq sho'rva bilan, sovuq kunlar uchun", 40000, 'lagmon', '', "Xamir, go'sht, sabzavot, ko'kat", '500 ml', [],
    ['Лагман с бульоном', 'С горячим бульоном, для холодных дней', 'Тесто, мясо, овощи, зелень'],
    ['Lagman soup', 'With hot broth, for cold days', 'Dough, meat, vegetables, herbs']],
  ['Obi non', 'Tandirdan yangi chiqqan, qarsildoq non', 5000, 'non', 'Mashhur', 'Un, suv, xamirturush, tuz', '1 dona', ['veg'],
    ['Оби нон', 'Свежая хрустящая лепёшка из тандыра', 'Мука, вода, дрожжи, соль'],
    ['Obi non bread', 'Fresh crispy flatbread from the clay oven', 'Flour, water, yeast, salt']],
  ['Patir', "Qatlamli, sariyog'li tandir patiri", 8000, 'non', '', "Un, sariyog', sut, kunjut", '1 dona', ['veg'],
    ['Патыр', 'Слоёная лепёшка на сливочном масле', 'Мука, сливочное масло, молоко, кунжут'],
    ['Patir', 'Layered butter flatbread', 'Flour, butter, milk, sesame']],
  ['Tandir somsa', "Tandirda pishirilgan, go'shtli somsa", 12000, 'non', '', "Xamir, go'sht, piyoz, zira", '1 dona', [],
    ['Самса из тандыра', 'Самса с мясом из тандыра', 'Тесто, мясо, лук, зира'],
    ['Tandoor samsa', 'Meat pastry baked in a clay oven', 'Dough, meat, onion, cumin']],
  ["Ko'k choy", "Choynakda damlangan ko'k choy", 5000, 'ichimlik', 'Mashhur', "Ko'k choy bargi, qaynoq suv", '1 choynak', ['veg'],
    ['Зелёный чай', 'Зелёный чай в чайнике', 'Листья зелёного чая, кипяток'],
    ['Green tea', 'Green tea brewed in a teapot', 'Green tea leaves, hot water']],
  ['Ayron', 'Uy ayroni, salqin va foydali', 10000, 'ichimlik', '', "Qatiq, tuz, suv, ko'kat", '0.5 l', ['veg'],
    ['Айран', 'Домашний айран, прохладный и полезный', 'Катык, соль, вода, зелень'],
    ['Ayran', 'Homemade cool yogurt drink', 'Yogurt, salt, water, herbs']],
  ['Kompot', 'Mevali uy kompoti, tabiiy shirinlik', 12000, 'ichimlik', '', "Olma, o'rik, uzum, suv", '1 l', ['veg'],
    ['Компот', 'Домашний фруктовый компот', 'Яблоки, абрикосы, виноград, вода'],
    ['Kompot', 'Homemade fruit drink, naturally sweet', 'Apples, apricots, grapes, water']]
];
const DEFAULT_SETTINGS = {
  name: 'Osh Markazi', phone: '+998 90 123 45 67', telegram: 'oshmarkazi',
  openTime: '09:00', closeTime: '22:00', address: 'Toshkent', mapUrl: '', currency: "so'm",
  logo: '', cover: '', featuredId: 'plov-1'
};
function defaultMenu() {
  return {
    version: 2,
    updatedAt: new Date().toISOString(),
    settings: { ...DEFAULT_SETTINGS },
    cats: DEFAULT_CATS.map(([id, name, icon, ru, en]) => ({ id, name, icon, tr: { ru: { name: ru }, en: { name: en } } })),
    dishes: DEFAULT_DISHES.map((d, i) => ({
      id: `${d[3]}-${i + 1}`, name: d[0], desc: d[1], price: d[2], cat: d[3], tag: d[4], ing: d[5],
      weight: d[6], flags: d[7], variants: [], imgs: [], available: true,
      tr: { ru: { name: d[8][0], desc: d[8][1], ing: d[8][2] }, en: { name: d[9][0], desc: d[9][1], ing: d[9][2] } }
    }))
  };
}

/* Keeps any loaded menu in a known shape, whatever file it came from. */
const str = v => String(v ?? '');
function normTr(src, fields) {
  const out = {};
  for (const l of ['ru', 'en']) {
    const o = src && src[l] ? src[l] : {};
    out[l] = {};
    for (const f of fields) if (o[f]) out[l][f] = str(o[f]);
  }
  return out;
}
function normalizeMenu(m) {
  const base = defaultMenu();
  if (!m || typeof m !== 'object') return base;
  const cats = Array.isArray(m.cats) ? m.cats.filter(c => c && c.id).map(c => ({
    id: str(c.id), name: str(c.name || 'Kategoriya'), icon: ICONS[c.icon] ? c.icon : 'plate', tr: normTr(c.tr, ['name'])
  })) : base.cats;
  const dishes = Array.isArray(m.dishes) ? m.dishes.filter(d => d && d.name).map(d => ({
    id: str(d.id || uid()), name: str(d.name), desc: str(d.desc),
    price: Math.max(0, Math.round(Number(d.price) || 0)), cat: str(d.cat || (cats[0] && cats[0].id)),
    tag: TAGS[d.tag] ? d.tag : '', ing: str(d.ing), weight: str(d.weight),
    flags: (Array.isArray(d.flags) ? d.flags : []).filter(f => FLAGS[f]),
    variants: (Array.isArray(d.variants) ? d.variants : [])
      .map(v => ({ name: str(v && v.name).trim(), price: Math.max(0, Math.round(Number(v && v.price) || 0)) }))
      .filter(v => v.name),
    imgs: (Array.isArray(d.imgs) ? d.imgs : (d.img ? [d.img] : [])).filter(x => typeof x === 'string' && x).slice(0, MAX_IMGS),
    available: d.available !== false,
    tr: normTr(d.tr, ['name', 'desc', 'ing'])
  })) : base.dishes;
  const src = m.settings || {};
  const s = { ...DEFAULT_SETTINGS, ...src };
  /* older files kept the hours as text: "Har kuni 09:00 dan 22:00 gacha" */
  if (!src.openTime && src.hours) {
    const times = String(src.hours).match(/\d{1,2}:\d{2}/g);
    if (times && times.length >= 2) { s.openTime = times[0].padStart(5, '0'); s.closeTime = times[1].padStart(5, '0'); }
  }
  if (!('featuredId' in src)) s.featuredId = '';
  delete s.hours; delete s.pin; delete s.pinHash;
  for (const k of Object.keys(DEFAULT_SETTINGS)) s[k] = str(s[k]);
  if (!/^\d{2}:\d{2}$/.test(s.openTime)) s.openTime = DEFAULT_SETTINGS.openTime;
  if (!/^\d{2}:\d{2}$/.test(s.closeTime)) s.closeTime = DEFAULT_SETTINGS.closeTime;
  if (s.featuredId && !dishes.some(d => d.id === s.featuredId)) s.featuredId = '';
  return { version: 2, updatedAt: m.updatedAt || base.updatedAt, settings: s, cats, dishes };
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
/* Lowest price of a dish: its own, or the cheapest portion when it has several. */
const basePrice = d => (d.variants && d.variants.length ? Math.min(...d.variants.map(v => v.price)) : d.price);
const STAND_IN = {
  plov: 'photo-1512058564366-18510be2db19', shashlik: 'photo-1529042410759-befb1204b468',
  manti: 'photo-1563245372-f21724e3856d', lagmon: 'photo-1569718212165-3a8278d5f624',
  non: 'photo-1509440159596-0249088772ff', ichimlik: 'photo-1544787219-7f47ccb76574'
};
const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78`;
/* All pictures of a dish: the owner's uploads, or one stand-in photo for its category. */
function dishImages(d, w = 900) {
  if (d.imgs && d.imgs.length) return d.imgs;
  const id = STAND_IN[d.cat];
  return id ? [unsplash(id, w)] : [];
}
const dishImage = (d, w = 600) => dishImages(d, w)[0] || '';
const coverImage = s => s.cover || unsplash(STAND_IN.plov, 1600);
const logoImage = s => s.logo || DEFAULT_LOGO;
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
/* A map link: the owner's own http(s) URL, otherwise a Google Maps search for the name and address. */
function mapHref(s) {
  const u = String(s.mapUrl || '').trim();
  if (/^https?:\/\//i.test(u)) { try { return new URL(u).href; } catch (e) { return ''; } }
  return s.address ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${s.name}, ${s.address}`) : '';
}

/* ---------- opening hours ---------- */
const toMin = hhmm => { const [h, m] = String(hhmm).split(':').map(Number); return h * 60 + m; };
/* Open or closed right now, with the next change. Handles hours past midnight (18:00 to 02:00). */
function openState(s, now = new Date()) {
  const o = toMin(s.openTime), c = toMin(s.closeTime), n = now.getHours() * 60 + now.getMinutes();
  if (o === c) return { open: true, allDay: true };
  const open = o < c ? (n >= o && n < c) : (n >= o || n < c);
  return { open, at: open ? s.closeTime : s.openTime };
}
const hoursText = s => (s.openTime === s.closeTime ? t('allDay') : `${t('daily')} ${s.openTime} – ${s.closeTime}`);

/* ---------- theme ---------- */
function applyTheme(th) {
  document.documentElement.setAttribute('data-theme', th);
  try { localStorage.setItem(THEME_KEY, th); } catch (e) {}
  const b = $('#themeBtn');
  if (b) {
    b.innerHTML = svg(th === 'dark' ? 'sun' : 'moon', 20);
    b.setAttribute('aria-label', th === 'dark' ? t('light') : t('dark'));
  }
}
function initTheme() {
  let th = null;
  try { th = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(th === 'dark' ? 'dark' : 'light');
  const b = $('#themeBtn');
  if (b) b.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}

/* ---------- toast ---------- */
let toastTimer = 0;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- images ---------- */
function resizeImage(file, max, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = reject;
    r.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width || max, img.height || max));
        const c = document.createElement('canvas');
        c.width = Math.round((img.width || max) * k); c.height = Math.round((img.height || max) * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const keepAlpha = file.type === 'image/png' || file.type === 'image/svg+xml' || file.type === 'image/webp';
        resolve(keepAlpha ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', quality));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
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
