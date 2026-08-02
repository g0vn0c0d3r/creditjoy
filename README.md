# creditjoy

Рабочий проект для анализа структуры финансовых маркетплейсов и подготовки SEO-архитектуры будущего сайта.

Первый рабочий продукт - займы. Структуру строим от конкурентов, улучшения делаем только по делу, семантику привязываем к выбранным слагам после структуры. Сразу закладываем масштабирование на другие продукты: кредиты, карты, валюты, компании, блог и сервисные страницы.

## План запуска

Полный план лежит в `ROADMAP.md`.

Сейчас фокус: выбрать MVP-слаги по займам из полного конкурентного списка.

## Структура проекта

```text
creditjoy/
  README.md
  ROADMAP.md

  planning/
    products/
      zaimy-structure.md
      zaimy-landings.md

    semantics/
      keyword-processing.md
      keyword-mapping.md

  data/
    raw/
      wordcraft/
        wordcraft-zaim.xlsx
        wordcraft-microzaim.xlsx
        wordcraft-microcredit.xlsx

    keywords.csv
    competitor-loan-urls.csv
    competitor-loan-slugs.csv

  scripts/
    build-keywords.mjs
```

## Главные файлы

- `ROADMAP.md` - план запуска, стратегия, общая модель страниц, конкуренты и текущий фокус.
- `planning/products/zaimy-structure.md` - схема продукта `займы`: URL, масштабирование, интенты, гео и ссылки на рыночный инвентарь.
- `planning/products/zaimy-landings.md` - типы лендингов по займам, которые нужно проектировать.
- `planning/semantics/keyword-processing.md` - как собирается единый файл запросов.
- `planning/semantics/keyword-mapping.md` - как привязываем запросы к выбранным слагам и отсекаем лишнее.
- `data/raw/wordcraft/` - исходные Excel-файлы Wordcraft.
- `data/keywords.csv` - главный рабочий файл со всеми словами.
- `data/competitor-loan-urls.csv` - сырая выгрузка найденных URL конкурентов по займам.
- `data/competitor-loan-slugs.csv` - простой список уникальных рыночных слагов по займам: направление, интент, слаг, конкуренты, примеры URL.
- `scripts/build-keywords.mjs` - скрипт, который пересобирает `data/keywords.csv` из исходных Excel-файлов.

## Семантика

`data/keywords.csv` - главный источник запросов. Он не задает структуру сайта сам по себе: сначала выбираем рабочие слаги на основе конкурентов, затем подбираем к ним ключи из файла.

Поля:

- `query` - запрос.
- `clicks` - клики из Wordcraft.
- `demand` - спрос из Wordcraft.
- `sources` - из каких исходных файлов пришел запрос.
- `decision` - пустое поле для нашего будущего решения.
- `notes` - пустое поле для заметок.

Текущий объем: 5 507 уникальных запросов.

## Текущий принцип

Главный принцип: структура от конкурентов, улучшения только по делу, семантика маппится на готовые слаги. Не возвращаем старые бакеты, Wordcraft `cluster` и преждевременные реестры страниц.
