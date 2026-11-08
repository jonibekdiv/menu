# Osh Markazi menyusi

Kafe uchun onlayn menyu va admin panel. Server kerak emas: oddiy statik hostingda ishlaydi.

## Fayllar

| Fayl | Vazifasi |
|---|---|
| `index.html` | Mijozlar ko'radigan menyu |
| `admin.html` | Admin panel (saytda unga havola yo'q) |
| `menu.json` | Saytdagi menyu: taomlar, kategoriyalar, sozlamalar |
| `common.js`, `shared.css` | Ikkala sahifa uchun umumiy kod va dizayn |

## Kompyuterda ochish

Sahifalar `menu.json` ni yuklab oladi, shuning uchun faylni ikki marta bosib ochish yetmaydi:

```bash
python -m http.server 8000
```

Keyin `http://localhost:8000` (menyu) va `http://localhost:8000/admin.html` (admin).

## Menyuni yangilash

1. `admin.html` ga kiring. Standart PIN `1234`, birinchi kirishda uni almashtiring.
2. Taom, narx, rasm va kategoriyalarni o'zgartiring. Ular avval faqat shu brauzerda saqlanadi; "Ko'rish" tugmasi qoralamani ko'rsatadi.
3. "Nashr qilish" bo'limida `menu.json` ni yuklab oling.
4. Saytdagi `menu.json` ni shu fayl bilan almashtiring. Shundan keyin hamma yangi menyuni ko'radi.

## Cheklovlar

- PIN faqat admin brauzerida xeshlangan holda saqlanadi. Bu oddiy qulf, server himoyasi emas.
- Rasmlar `menu.json` ichida saqlanadi (har biri 720px gacha). Brauzer xotirasi taxminan 5 MB bilan cheklangan.
- Rasmsiz taomlarda Unsplash'dagi namuna surat ko'rinadi; o'z rasmlaringizni admin paneldan yuklang.
