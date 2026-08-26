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

      changes/
        README.md
        admin/
          tasks.md
          assets/
        design/
          product/
            tasks.md
            assets/

      research/
        competitors/
          urls.csv
          slugs.csv
      landings/
        README.md
        product/
          final.md
        intent/
          planned.md
        geo/
          planned.md
        intent-city/
          planned.md
        company/
          final.md
          source-packs/
            README.md
            template.md
            examples/
              lime-zaim.md
            organizations/
              <organization-slug>.md
```

## Главные файлы

- `products/zaimy/README.md` - вход в текущий продукт и навигация по его материалам.
- `products/zaimy/roadmap.md` - план работы по продукту и выводы из исследования рынка.
- `products/zaimy/structure.md` - схема продукта `займы`: URL, масштабирование, интенты, гео, ссылки на лендинги и рыночный инвентарь.
- `products/zaimy/landings/README.md` - правила статусов и хранения материалов лендингов.
- `products/zaimy/landings/product/final.md` - согласованная структура продуктовой страницы `/zaimy/`.
- `products/zaimy/landings/company/final.md` - утверждённая спецификация карточки МФО, контракт данных и промпты подготовки source pack.
- `products/zaimy/changes/README.md` - правила классификации правок админки и дизайна.
- `products/zaimy/research/competitors/slugs.csv` - инвентарь слагов, собранный у конкурентов.
- `products/zaimy/research/competitors/urls.csv` - полный список найденных URL конкурентов.
- `products/zaimy/landings/company/source-packs/README.md` - навигация по шаблону, эталонному примеру и файлам организаций.

Материалы по ключам сейчас не ведём: для текущей работы достаточно структуры и исследования конкурентов.
