# URL-структура займов у конкурентов

Статус: рабочий срез по URL-логике. Используем как основу для структуры CreditJoy.

Дата среза: 2026-07-31.

## Главный вывод

- У сильных конкурентов первым почти всегда идет продукт: `zaimy`, `zaymy`, `zajmy`, `microloans`, `mikrozajmy`.
- Город обычно идет после продукта или после интента: `/product/city/` или `/product/intent/city/`.
- Кириллические URL не используют.
- Чаще всего это не чистый английский, а русская семантика в латинице: `na-kartu`, `bez-otkaza`, `pod-zalog-pts`.
- Для CreditJoy лучше брать продукт первым и русские интенты в латинице.

## Сравнение

| Сайт | Хаб займов | Интент | Гео | Интент + гео | Тип слага | Порядок |
| --- | --- | --- | --- | --- | --- | --- |
| `Sravni.ru` | `/zaimy/` | `/zaimy/pod-pts/`, `/zaimy/onlain/` | `/zaimy/moskva/` | `/zaimy/bez-otkaza/moskva/` | латиница, транслит, hyphen | продукт -> интент -> город |
| `Bankiros.ru` | `/zaymy` | `/zaymy/na-kartu`, `/zaymy/pod-zalog-pts` | `/zaymy/moskva` | `/zaymy/na-kartu/moskva` | латиница, транслит, hyphen | продукт -> интент -> город |
| `Banki.ru` | `/microloans/` | `/microloans/catalogue/zaym_na_kartu/` | нет простого хаба как у остальных | `/microloans/catalogue/zaym_na_kartu/rostov-na-donu/` | английский хаб + транслит с `_` | продукт -> каталог -> интент -> город |
| `Finuslugi.ru` | `/mikrozajmy` | `/mikrozajmy/teg_bez_procentov` | `/mikrozajmy/reg_moskva` | `/mikrozajmy/teg_bez_procentov/reg_moskva` | транслит + системные префиксы `teg_`, `reg_` | продукт -> интент -> город |
| `Brobank.ru` | `/zajmy/online/` как основной вход | `/zajmy/na-kartu/`, `/zajmy/pod-zalog-pts/` | `/zajmy/moskva/` | `/zajmy/pod-zalog-pts/moskva/` | латиница, транслит, hyphen | продукт -> интент -> город |
| `Ru.Myfin.by` | `/zaymy/` | `/zaymy/na-kartu`, `/zaymy/pod-zalog-pts` | `/zaymy/moskva` | `/zaymy/na-kartu/moskva` | латиница, транслит, hyphen | продукт -> интент -> город |

## Что брать для CreditJoy

### Порядок URL

Берем продукт первым:

- `/zaimy/`
- `/zaimy/na-kartu/`
- `/zaimy/pod-zalog-pts/`
- `/zaimy/moskva/`
- `/zaimy/na-kartu/moskva/`
- `/zaimy/pod-zalog-pts/moskva/`

Почему:

- так делают основные SEO-конкуренты;
- легче масштабировать на другие продукты: `/kredity/`, `/kreditnye-karty/`, `/currency/`;
- проще строить хабы, хлебные крошки, canonical и перелинковку;
- город становится уточнением продукта, а не верхним уровнем сайта.

### Язык слагов

Берем русскую семантику в латинице:

- `zaimy`, а не `loans`;
- `na-kartu`, а не `on-card`;
- `bez-procentov`, а не `without-interest`;
- `pod-zalog-pts`, а не `secured-by-vehicle-title`.

Почему:

- запросы русские;
- конкуренты почти везде транслитерируют русские интенты;
- URL остается читаемым для пользователя и SEO-команды;
- не нужно смешивать русскую выдачу с английскими сущностями.

### Формат

- Только латиница, цифры и дефис.
- Без кириллицы в URL.
- Без `_`, если нет технической причины.
- Без системных префиксов вроде `teg_`, `reg_`, `catalogue`.
- Канонические коммерческие страницы заканчиваем `/`.
- Алиасы не плодим как отдельные страницы без доказанного интента.

## Пример применения правила

Это не список всех страниц и не финальный MVP. Это только пример того, как выбранная URL-логика применяется к разным типам интентов.

- `/zaimy/`
- `/zaimy/bez-zaloga/`
- `/zaimy/pod-zalog/`
- `/zaimy/na-kartu/`
- `/zaimy/bez-procentov/`
- `/zaimy/s-plohoy-kreditnoy-istoriey/`
- `/zaimy/pod-zalog-pts/`
- `/zaimy/pod-zalog-nedvizhimosti/`

Гео:

- `/zaimy/moskva/`
- `/zaimy/na-kartu/moskva/`
- `/zaimy/pod-zalog-pts/moskva/`

Полный инвентарь интентов и рекомендации по MVP лежат в `planning/products/zaimy-intents.md`.

## Источники

- https://www.sravni.ru/zaimy/
- https://www.sravni.ru/zaimy/moskva/
- https://www.sravni.ru/zaimy/bez-otkaza/moskva/
- https://bankiros.ru/zaymy
- https://bankiros.ru/zaymy/moskva
- https://bankiros.ru/zaymy/na-kartu/moskva
- https://www.banki.ru/microloans/
- https://www.banki.ru/microloans/catalogue/zaym_na_kartu/rostov-na-donu/
- https://finuslugi.ru/mikrozajmy
- https://finuslugi.ru/mikrozajmy/reg_moskva
- https://finuslugi.ru/mikrozajmy/teg_bez_procentov/reg_moskva
- https://brobank.ru/zajmy/online/
- https://brobank.ru/zajmy/moskva/
- https://brobank.ru/zajmy/pod-zalog-pts/moskva/
- https://ru.myfin.by/zaymy/moskva
- https://ru.myfin.by/zaymy/na-kartu/moskva
