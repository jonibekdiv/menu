# Osh Markazi menyusi

Kafe uchun onlayn menyu va admin panel. Server kerak emas: oddiy statik hostingda ishlaydi.

## Fayllar

| Fayl | Vazifasi |
|---|---|
| `index.html` | Mijozlar ko'radigan menyu |
| `admin.html` | Admin panel (saytda unga havola yo'q) |
| `menu.json` | Saytdagi menyu: taomlar, kategoriyalar, sozlamalar |
| `common.js`, `shared.css` | Ikkala sahifa uchun umumiy kod, tarjimalar va dizayn |
| `logo.svg` | Test logotipi (admin paneldan o'zingiznikini yuklang) |

## Imkoniyatlar

- Bosh rasm, logotip, "Hozir ochiq / yopiq" belgisi (ish vaqtiga qarab o'zi o'zgaradi), qo'ng'iroq va xarita tugmalari.
- "Kun taomi" bloki: admin taomlar ro'yxatida yulduzcha bilan tanlaydi.
- Taom kartasi: rasm, nom, vazn, narx, achchiq yoki vegetarian belgisi. Ichida: rasmlar karuseli, porsiyalar, tarkibi.
- Uch til: o'zbekcha, ruscha, inglizcha. Taom va kategoriya tarjimalari admin panelda yoziladi.
- Admin panelda stol uchun QR kod: chop etish yoki PNG qilib yuklab olish.

## Kompyuterda ochish

Sahifalar `menu.json` ni yuklab oladi, shuning uchun faylni ikki marta bosib ochish yetmaydi:

```bash
python -m http.server 8000
```

Keyin `http://localhost:8000` (menyu) va `http://localhost:8000/admin.html` (admin).

## Menyuni yangilash

Menyu Supabase bazasida saqlanadi (loyiha: `osh-markazi-menyu`). `admin.html` ga email va parol bilan kiring: har bir o'zgarish darhol saytda ko'rinadi. Rasmlar Supabase Storage'dagi `menu-images` omboriga yuklanadi.

Yangi admin qo'shish: Supabase → Authentication → Users → **Add user** (email va parol, "Auto Confirm" yoqilgan), keyin SQL Editor'da:

```sql
insert into public.admins (user_id) select id from auth.users where email = 'admin@misol.uz';
```

`menu.json` faqat zaxira: baza javob bermasa sayt shu fayldan ko'rsatadi.

## Cheklovlar

- O'chirilgan rasmlar omborda qoladi; joy tugasa Supabase panelidan tozalang.
- Bepul Supabase loyihasi bir hafta umuman ishlatilmasa pauza qilinadi; panelda "Restore" bilan qayta yoqiladi. Shu vaqtda sayt `menu.json` zaxirasini ko'rsatadi.
