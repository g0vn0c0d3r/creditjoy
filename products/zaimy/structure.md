# Схема продукта: займы

Статус: рабочая схема продукта, URL-структуры и масштабирования. Это не реестр страниц и не список MVP-слагов.

Дата: 2026-08-01.

## Зачем файл

`Займы` - первый коммерческий продукт CreditJoy.

Этот файл отвечает за схему продукта:

- как устроены URL;
- как продукт масштабируется через интенты и города;
- какие структурные выводы дали конкуренты;
- где лежит полный рыночный список слагов для ручного выбора;
- где лежат отдельные файлы лендингов.

Файлы лендингов лежат в `products/zaimy/landings/`.

Верхний план проекта: `ROADMAP.md`.

## Файлы лендингов

| Лендинг | Файл | Статус |
| --- | --- | --- |
| `/zaimy/` | `products/zaimy/landings/product.md` | согласован |
| `/zaimy/{intent}/` | `products/zaimy/landings/intent.md` | следующий |
| `/zaimy/{city}/` | `products/zaimy/landings/geo.md` | позже |
| `/zaimy/{intent}/{city}/` | `products/zaimy/landings/intent-city.md` | позже |

## Главный принцип

Сначала берем рынок конкурентов, потом выбираем свои страницы.

На этом этапе не выкидываем интенты по вкусу и не превращаем весь список в MVP. Полный список нужен, чтобы потом руками решить, что запускать, что оставить на потом, а что использовать только как семантику.

Каждый будущий слаг можно думать как сохраненный фильтр/тег для витрины:

- у МФО есть теги и данные: `na-kartu`, `bez-procentov`, `pod-zalog-pts`, `moskva`;
- страница `/zaimy/na-kartu/` показывает компании и офферы с тегом `na-kartu`;
- страница `/zaimy/na-kartu/moskva/` показывает тот же интент, но с городом `moskva`;
- один оффер может попадать сразу на несколько витрин, если он подходит по условиям.

## Займы, микрозаймы, микрокредиты

На старте держим один продуктовый раздел:

```text
/zaimy/
```

Отдельные продуктовые разделы `/mikrozaymy/` и `/microkredity/` на старт не планируем.

Как используем микро-тематику:

- `микрозаймы`, `микрокредиты`, `microloans`, `mikrozajmy` - это синонимы и семантика внутри продукта `займы`;
- запросы с этими словами потом привязываем к `/zaimy/` или к подходящим интентам;
- отдельную страницу делаем только если позже увидим, что выдача, спрос и контент реально требуют отдельной витрины.

## Что нашли у конкурентов

Общий рыночный паттерн:

```text
продукт -> интент -> гео -> оффер/компания -> доверие/FAQ/отзывы
```

Разница между конкурентами не в базовой логике, а в глубине матрицы и качестве страницы:

- `Sravni.ru` - сильный продуктовый UX, короткая витрина, интенты, гео, заявка.
- `Bankiros.ru` / `Myfin` - широкая SEO-матрица, длинный хвост, гео, справочники.
- `Banki.ru` - доверие, отзывы, рейтинги, карточки компаний.
- `Finuslugi.ru` - официальный тон, безопасность, проверка МФО, теговая модель.
- `Brobank.ru` - подробные карточки офферов, готовые решения, много контента на страницах.
- `Zaym.me` - самый большой пример масштабирования через `интент x город`.
- `Zaim.com` - полезен как источник длинного SEO-хвоста, залогов и гео-комбинаций.
- `Rus.credit` - полезен как пример слоя МФО, карточек компаний, отзывов и гео по компаниям.

URL-подходы конкурентов:

- `Sravni.ru`: `/zaimy/`, `/zaimy/na-kartu-onlain/`, `/zaimy/moskva/`.
- `Bankiros.ru`: `/zaymy`, `/zaymy/na-kartu`, `/zaymy/na-kartu/moskva`.
- `Banki.ru`: `/microloans/`, `/microloans/catalogue/{intent}/`, `/microloans/catalogue/{intent}/{city}/`.
- `Finuslugi.ru`: `/mikrozajmy`, `/mikrozajmy/teg_{intent}`, `/mikrozajmy/reg_moskva`.
- `Brobank.ru`: `/zajmy/online/`, `/zajmy/na-kartu/`, `/zajmy/pod-zalog-pts/`.
- `Zaym.me`: `/zaimi`, `/zaimi/{city}`, `/zaimi/filter-{intent}`, `/zaimi/filter-{intent}/{city}`.
- `Zaim.com`: человекочитаемые URL через `/zaimy-*`, `/zaymy-*`, города, залоги, суммы и сроки.
- `Rus.credit`: `/microloans`, `/mfo`, `/mfo/{company}`, `/mfo/cities/{city}`.

Вывод для CreditJoy: не изобретать новую структуру, а взять понятную модель `продукт -> интент -> город` и выигрывать за счет полезности страницы, понятной стоимости, условий, карточек компаний и перелинковки.

## Общая схема CreditJoy

Простая URL-логика: продукт сначала, потом интент, потом город.

```text
/
|-- /zaimy/ - страница продукта
|   |-- /zaimy/{intent}/ - страница интента
|   |   `-- /zaimy/{intent}/{city}/ - гео-страница интента
|   |
|   `-- /zaimy/{city}/ - гео-страница продукта
|
|-- /companies/{slug}/ - карточка компании
|-- /blog/{slug}/ - блог или справка
`-- /calculators/{slug}/ - калькулятор или сервис
```

Как читать уровни:

- `/` - вход в проект и будущие продукты.
- `/zaimy/` - главный хаб займов.
- `/zaimy/{intent}/` - отдельный сценарий выбора: на карту, без процентов, с плохой КИ, под залог ПТС.
- `/zaimy/{city}/` - все займы в конкретном городе.
- `/zaimy/{intent}/{city}/` - конкретный сценарий в конкретном городе.
- `/companies/{slug}/`, `/blog/{slug}/`, `/calculators/{slug}/` - поддерживающие слои вокруг коммерческих витрин.

Гео не усложняем: город просто добавляется к уже понятной странице, например `/zaimy/moskva/`, `/zaimy/na-kartu/moskva/`, `/zaimy/pod-zalog-pts/moskva/`.

Отдельные интенты по гражданству и статусу заемщика тоже ложатся в `/zaimy/{intent}/`:

```text
|-- /zaimy/dlya-grazhdan-sng/
|-- /zaimy/inostrannym-grazhdanam/
|-- /zaimy/grazhdanam-uzbekistana/
|-- /zaimy/grazhdanam-tadzhikistana/
|-- /zaimy/grazhdanam-kirgizii/
|-- /zaimy/grazhdanam-kazahstana/
|-- /zaimy/grazhdanam-armenii/
|-- /zaimy/grazhdanam-belarusi/
|-- /zaimy/migrantam/
`-- /zaimy/nerezidentam/ - кандидат-алиас к иностранным гражданам, проверяем по семантике
```

Для этих страниц потом отдельно продумываем требования и документы: миграционная карта, регистрация в РФ, РВП/ВНЖ, патент и документы конкретной страны.

## Пред-MVP пример: 5 интентов x 5 городов

Это не финальный MVP и не решение по запуску. Это тестовая сетка, на которой удобно отработать структуру страниц, фильтры, карточки офферов, перелинковку и текстовые блоки.

Берем:

- 1 продукт: `займы`;
- 5 интентов: `na-kartu`, `bez-procentov`, `s-plohoy-kreditnoy-istoriey`, `pod-zalog-pts`, `pod-zalog-nedvizhimosti`;
- 5 городов: `moskva`, `sankt-peterburg`, `novosibirsk`, `ekaterinburg`, `kazan`.

Почему эти интенты:

- `na-kartu` - самый понятный способ получения денег;
- `bez-procentov` - сильный коммерческий интент по условию;
- `s-plohoy-kreditnoy-istoriey` - сложный заемщик и отдельная логика доверия;
- `pod-zalog-pts` - залоговая ветка по авто/ПТС;
- `pod-zalog-nedvizhimosti` - второй залоговый сценарий с другой структурой условий.

Пример URL-сетки:

```text
/zaimy/ - продукт
|-- /zaimy/moskva/ - гео продукта
|-- /zaimy/sankt-peterburg/ - гео продукта
|-- /zaimy/novosibirsk/ - гео продукта
|-- /zaimy/ekaterinburg/ - гео продукта
|-- /zaimy/kazan/ - гео продукта
|
|-- /zaimy/na-kartu/ - интент
|   |-- /zaimy/na-kartu/moskva/ - интент + город
|   |-- /zaimy/na-kartu/sankt-peterburg/ - интент + город
|   |-- /zaimy/na-kartu/novosibirsk/ - интент + город
|   |-- /zaimy/na-kartu/ekaterinburg/ - интент + город
|   `-- /zaimy/na-kartu/kazan/ - интент + город
|
|-- /zaimy/bez-procentov/ - интент
|   |-- /zaimy/bez-procentov/moskva/ - интент + город
|   |-- /zaimy/bez-procentov/sankt-peterburg/ - интент + город
|   |-- /zaimy/bez-procentov/novosibirsk/ - интент + город
|   |-- /zaimy/bez-procentov/ekaterinburg/ - интент + город
|   `-- /zaimy/bez-procentov/kazan/ - интент + город
|
|-- /zaimy/s-plohoy-kreditnoy-istoriey/ - интент
|   |-- /zaimy/s-plohoy-kreditnoy-istoriey/moskva/ - интент + город
|   |-- /zaimy/s-plohoy-kreditnoy-istoriey/sankt-peterburg/ - интент + город
|   |-- /zaimy/s-plohoy-kreditnoy-istoriey/novosibirsk/ - интент + город
|   |-- /zaimy/s-plohoy-kreditnoy-istoriey/ekaterinburg/ - интент + город
|   `-- /zaimy/s-plohoy-kreditnoy-istoriey/kazan/ - интент + город
|
|-- /zaimy/pod-zalog-pts/ - интент
|   |-- /zaimy/pod-zalog-pts/moskva/ - интент + город
|   |-- /zaimy/pod-zalog-pts/sankt-peterburg/ - интент + город
|   |-- /zaimy/pod-zalog-pts/novosibirsk/ - интент + город
|   |-- /zaimy/pod-zalog-pts/ekaterinburg/ - интент + город
|   `-- /zaimy/pod-zalog-pts/kazan/ - интент + город
|
`-- /zaimy/pod-zalog-nedvizhimosti/ - интент
    |-- /zaimy/pod-zalog-nedvizhimosti/moskva/ - интент + город
    |-- /zaimy/pod-zalog-nedvizhimosti/sankt-peterburg/ - интент + город
    |-- /zaimy/pod-zalog-nedvizhimosti/novosibirsk/ - интент + город
    |-- /zaimy/pod-zalog-nedvizhimosti/ekaterinburg/ - интент + город
    `-- /zaimy/pod-zalog-nedvizhimosti/kazan/ - интент + город
```

Формула расчета страниц без главной:

```text
1 продуктовая + I интентных + C гео продукта + I x C гео-интентных
= 1 + I + C + I x C
```

Для этой сетки:

```text
1 + 5 + 5 + 5 x 5 = 36 страниц без главной
```

Что проверяем на этой сетке:

- как страница продукта ведет в интенты и города;
- как интентная страница отличается от обычного фильтра;
- как карточка МФО попадает на нужные витрины;
- как выглядит городская версия без лишнего усложнения;
- где нужна уникальная локальная польза, а где хватает общей витрины с городским фильтром.

## Рыночный инвентарь и полный список интентов

В этом файле направления интентов не дублируем, чтобы схема продукта оставалась легкой.

Сводка направлений лежит в `ROADMAP.md`, раздел `4.9. Направления лендингов`.

Полный список найденных слагов лежит в:

```text
data/competitor-loan-slugs.csv
```

Формат файла:

```text
direction,intent,slug,competitors,urls,source_slugs
```

Что внутри:

- 301 уникальный рыночный слаг;
- реальные URL конкурентов;
- конкуренты, у которых найден интент;
- исходные варианты слагов, если они отличаются написанием.

Сырой список всех найденных URL остается здесь:

```text
data/competitor-loan-urls.csv
```

Список CSV - это не MVP, а инвентарь рынка для ручного выбора страниц.

Здесь используем только принцип: любой выбранный интент ложится в `/zaimy/{intent}/`, а его городская версия - в `/zaimy/{intent}/{city}/`.

## Как делать лучше

Не придумываем структуру с нуля, если рынок уже показал рабочую модель. Улучшение CreditJoy должно быть в полезности страницы:

- понятные условия офферов;
- фильтры, которые реально меняют выдачу;
- объяснение рисков без воды;
- нормальные карточки компаний;
- связка витрины, компании, FAQ, отзывов, блога и калькуляторов.

Структуры лендингов для разработки лежат отдельными файлами в `products/zaimy/landings/`.

## Следующий шаг

Дальше: наполнить `products/zaimy/landings/intent.md` и набросать структуру `/zaimy/{intent}/`. После этого выбрать MVP-слаги из `data/competitor-loan-slugs.csv` и привязать к ним запросы из `data/keywords.csv`.
