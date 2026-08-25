# creditjoy

Рабочая база CreditJoy. Сейчас активен один продукт - `займы`.

## Структура проекта

```text
creditjoy/
  README.md

  products/
    zaimy/
      README.md
      roadmap.md
      structure.md

      admin/
        README.md
        assets/

      research/
        competitors/
          urls.csv
          slugs.csv
      landings/
        product/
          README.md
          design.md
          assets/
        intent/
          README.md
        geo/
          README.md
        intent-city/
          README.md
        company/
          README.md
      source-packs/
        README.md
        organizations/
```

## Главные файлы

- `products/zaimy/README.md` - вход в текущий продукт и навигация по его материалам.
- `products/zaimy/roadmap.md` - план работы по продукту и выводы из исследования рынка.
- `products/zaimy/structure.md` - схема продукта `займы`: URL, масштабирование, интенты, гео, ссылки на лендинги и рыночный инвентарь.
- `products/zaimy/landings/` - папки типов лендингов; `README.md` внутри каждой папки описывает структуру страницы.
- `products/zaimy/landings/product/README.md` - согласованная структура продуктовой страницы `/zaimy/`.
- `products/zaimy/landings/company/README.md` - каркас карточки МФО и данные, которые нужны для каждого блока.
- `products/zaimy/admin/README.md` - функциональные правки админки для займов.
- `products/zaimy/research/competitors/slugs.csv` - инвентарь слагов, собранный у конкурентов.
- `products/zaimy/research/competitors/urls.csv` - полный список найденных URL конкурентов.
- `products/zaimy/source-packs/README.md` - правила источников и формирования файлов для импорта в админку.

Материалы по ключам сейчас не ведём: для текущей работы достаточно структуры и исследования конкурентов.
