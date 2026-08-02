# Схема продукта: займы

Статус: рабочая схема продукта, URL-структуры и масштабирования. Это не реестр страниц и не список MVP-слагов.

Дата: 2026-08-01.

## Что решаем

`Займы` - первый коммерческий продукт CreditJoy.

В этом файле фиксируем:

- как будут устроены страницы продукта;
- какие направления лендингов нашли у конкурентов;
- где лежит полный список рыночных слагов для ручного выбора.

Полный верхний план и конкурентный блок: `planning/project.md`.

Состав будущих лендингов и логика содержания страниц: `planning/products/zaimy-landings.md`.

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

## Структура страниц

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

| Тип страницы | URL | Что на странице | Пример у конкурентов |
| --- | --- | --- | --- |
| Главная | `/` | Вход в CreditJoy и список продуктов. В MVP главный продукт - займы. Позже сюда добавятся валюты, карты, кредиты, блог, сервисы. | Общая логика маркетплейсов: с главной ведут в продуктовые разделы. |
| Страница продукта | `/zaimy/` | Главный хаб: все займы, базовые фильтры, лучшие направления, компании, FAQ, переходы в интенты и города. | [Sravni: займы](https://www.sravni.ru/zaimy/), [Bankiros: займы](https://bankiros.ru/zaymy), [Banki.ru: microloans](https://www.banki.ru/microloans/) |
| Страница интента | `/zaimy/{intent}/` | Одна понятная потребность: на карту, без процентов, с плохой КИ, под залог ПТС, пенсионерам, срочно. | [Brobank: на карту](https://brobank.ru/zajmy/na-kartu/), [Bankiros: без процентов](https://bankiros.ru/zaymy/bez-procentov), [Finuslugi: под залог ПТС](https://finuslugi.ru/mikrozajmy/teg_pod_zalog_pts) |
| Гео продукта | `/zaimy/{city}/` | Все займы в городе: офферы, компании, условия, локальные переходы в интенты. | [Sravni: Москва](https://www.sravni.ru/zaimy/moskva/), [Finuslugi: Москва](https://finuslugi.ru/mikrozajmy/reg_moskva) |
| Гео интента | `/zaimy/{intent}/{city}/` | Конкретный интент в городе: например займы на карту в Москве или под залог ПТС в СПб. | [Bankiros: на карту в Москве](https://bankiros.ru/zaymy/na-kartu/moskva), [Zaym.me: filter + city](https://zaym.me/zaimi/filter-zaim-na-kartu/moskva) |
| Карточка компании | `/companies/{slug}/` | Данные МФО, условия, лицензия, отзывы, связанные витрины. | [Banki.ru: компании и отзывы](https://www.banki.ru/microloans/), [Rus.credit: МФО](https://rus.credit/mfo) |
| Блог/справка | `/blog/{slug}/` | Материалы, которые помогают коммерческим страницам: условия, риски, новости, разборы. | У Brobank и Banki.ru много контента вокруг продукта. |
| Калькулятор/сервис | `/calculators/{slug}/` | Помощь в расчете переплаты, срока, платежа, сравнения условий. | У крупных конкурентов сервисные элементы усиливают витрину. |

Гео не усложняем: город просто добавляется к уже понятной странице, например `/zaimy/moskva/`, `/zaimy/na-kartu/moskva/`, `/zaimy/pod-zalog-pts/moskva/`. Полная тестовая сетка ниже.

## Пред-MVP структура для отработки

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

Матрица `интент x город`:

| Интент | Москва | Санкт-Петербург | Новосибирск | Екатеринбург | Казань |
| --- | --- | --- | --- | --- | --- |
| На карту | `/zaimy/na-kartu/moskva/` | `/zaimy/na-kartu/sankt-peterburg/` | `/zaimy/na-kartu/novosibirsk/` | `/zaimy/na-kartu/ekaterinburg/` | `/zaimy/na-kartu/kazan/` |
| Без процентов | `/zaimy/bez-procentov/moskva/` | `/zaimy/bez-procentov/sankt-peterburg/` | `/zaimy/bez-procentov/novosibirsk/` | `/zaimy/bez-procentov/ekaterinburg/` | `/zaimy/bez-procentov/kazan/` |
| С плохой КИ | `/zaimy/s-plohoy-kreditnoy-istoriey/moskva/` | `/zaimy/s-plohoy-kreditnoy-istoriey/sankt-peterburg/` | `/zaimy/s-plohoy-kreditnoy-istoriey/novosibirsk/` | `/zaimy/s-plohoy-kreditnoy-istoriey/ekaterinburg/` | `/zaimy/s-plohoy-kreditnoy-istoriey/kazan/` |
| Под залог ПТС | `/zaimy/pod-zalog-pts/moskva/` | `/zaimy/pod-zalog-pts/sankt-peterburg/` | `/zaimy/pod-zalog-pts/novosibirsk/` | `/zaimy/pod-zalog-pts/ekaterinburg/` | `/zaimy/pod-zalog-pts/kazan/` |
| Под залог недвижимости | `/zaimy/pod-zalog-nedvizhimosti/moskva/` | `/zaimy/pod-zalog-nedvizhimosti/sankt-peterburg/` | `/zaimy/pod-zalog-nedvizhimosti/novosibirsk/` | `/zaimy/pod-zalog-nedvizhimosti/ekaterinburg/` | `/zaimy/pod-zalog-nedvizhimosti/kazan/` |

Что на ней проверяем:

- как страница продукта ведет в интенты и города;
- как интентная страница отличается от обычного фильтра;
- какие данные нужны карточке МФО, чтобы она попадала на нужные витрины;
- как выглядит городская версия без лишнего усложнения;
- где нужна уникальная локальная польза, а где хватает общей витрины с городским фильтром.

## Рыночный инвентарь

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

## Направления интентов

Это не список страниц к запуску. Это карта рынка: какие типы посадочных используют конкуренты.

Сводка по `data/competitor-loan-slugs.csv`:

- Хаб и названия продукта - 9;
- Каталог, подбор, доверие - 16;
- Способ получения - 21;
- Карты и банки - 40;
- Цена и условия - 24;
- Документы и проверки - 25;
- КИ и одобрение - 29;
- Скорость - 33;
- Срок и погашение - 29;
- Сумма - 25;
- Заемщик - 20;
- Залог - 15;
- Гео - 4;
- Смешанные посадочные - 11.

Как читать таблицу ниже:

- `Направление` - большая группа лендингов;
- `Пример CreditJoy` - как такой интент может лечь в нашу URL-логику;
- `Примеры у конкурентов` - реальные страницы, из которых взята логика.

| Направление | Смысл | Пример CreditJoy | Примеры у конкурентов |
| --- | --- | --- | --- |
| Хаб и названия продукта | Общие страницы про займы и близкие названия продукта. | `/zaimy/`; микро-запросы как алиасы к продукту. | [Bankiros: займы](https://bankiros.ru/zaymy), [Banki.ru: microloans](https://www.banki.ru/microloans/), [Finuslugi: mikrozajmy](https://finuslugi.ru/mikrozajmy) |
| Каталог, подбор, доверие | Лучшие, проверенные, надежные, МФО, отзывы, подбор. | `/zaimy/luchshie/`, `/zaimy/proverennye/` | [Brobank: лучшие](https://brobank.ru/zajmy/luchshie/), [Bankiros: проверенные](https://bankiros.ru/zaymy/proverennye) |
| Способ получения | Куда или как человек хочет получить деньги. | `/zaimy/na-kartu/`, `/zaimy/nalichnymi/` | [Bankiros: на карту](https://bankiros.ru/zaymy/na-kartu), [Brobank: наличными](https://brobank.ru/zajmy/nalichnymi/) |
| Карты и банки | Уточнение сценария "на карту": банк, платежная система, тип карты. | `/zaimy/na-kartu-sberbanka/`, `/zaimy/na-kartu-mir/` | [Brobank: Сбербанк](https://brobank.ru/zajmy/na-kartu-sberbanka/), [Bankiros: Мир](https://bankiros.ru/zaymy/na-kartu-mir) |
| Цена и условия | Проценты, подписки, комиссии, страховки, первый займ бесплатно. | `/zaimy/bez-procentov/`, `/zaimy/bez-podpisok/` | [Brobank: без процентов](https://brobank.ru/zajmy/bez-procentov/), [Finuslugi: без процентов](https://finuslugi.ru/mikrozajmy/teg_bez_procentov) |
| Документы и проверки | Что нужно для оформления и как проходит проверка. | `/zaimy/po-pasportu/`, `/zaimy/bez-spravok/` | [Bankiros: по паспорту](https://bankiros.ru/zaymy/po-pasportu), [Brobank: без справок](https://brobank.ru/zajmy/bez-spravok/) |
| КИ и одобрение | Плохая КИ, просрочки, отказ, высокий шанс одобрения. | `/zaimy/s-plohoy-kreditnoy-istoriey/`, `/zaimy/s-prosrochkami/` | [Banki.ru: плохая КИ](https://www.banki.ru/microloans/catalogue/zaymyi_s_plohoy_kreditnoy_istoriey/), [Brobank: просрочки](https://brobank.ru/zajmy/s-prosrochkami/) |
| Скорость | Срочно, быстро, моментально, круглосуточно, ночью. | `/zaimy/srochnye/`, `/zaimy/za-5-minut/` | [Banki.ru: быстрые](https://www.banki.ru/microloans/catalogue/byistryie_zaymyi/), [Bankiros: за 5 минут](https://bankiros.ru/zaymy/za-5-minut) |
| Срок и погашение | На какой срок берут и как возвращают. | `/zaimy/do-zarplaty/`, `/zaimy/na-mesyac/` | [Brobank: до зарплаты](https://brobank.ru/zajmy/do-zarplaty/), [Bankiros: на месяц](https://bankiros.ru/zaymy/na-mesyac) |
| Сумма | Конкретная сумма или размер займа. | `/zaimy/10000-rubley/`, `/zaimy/50000-rubley/` | [Brobank: 10000 рублей](https://brobank.ru/zajmy/na-10000-rublej/), [Bankiros: 50000 рублей](https://bankiros.ru/zaymy/50000-rubley) |
| Заемщик | Кто берет займ: пенсионер, студент, ИП, самозанятый, иностранец, возраст. | `/zaimy/pensioneram/`, `/zaimy/s-18-let/` | [Brobank: пенсионерам](https://brobank.ru/zajmy/pensioneram/), [Bankiros: с 18 лет](https://bankiros.ru/zaymy/s-18-let) |
| Залог | Есть ли обеспечение и какое именно. | `/zaimy/pod-zalog-pts/`, `/zaimy/pod-zalog-nedvizhimosti/` | [Brobank: ПТС](https://brobank.ru/zajmy/pod-zalog-pts/), [Bankiros: недвижимость](https://bankiros.ru/zaymy/pod-zalog-nedvizhimosti) |
| Гео | Та же витрина, но под конкретный город. | `/zaimy/moskva/`, `/zaimy/na-kartu/moskva/` | [Sravni: Москва](https://www.sravni.ru/zaimy/moskva/), [Bankiros: на карту в Москве](https://bankiros.ru/zaymy/na-kartu/moskva) |
| Смешанные посадочные | Два условия в одном слаге. Потом решаем, нужна ли отдельная страница. | `/zaimy/do-zarplaty-na-kartu/`, `/zaimy/srochnye-bez-procentov/` | [Brobank: срочные без процентов](https://brobank.ru/zajmy/srochnye-bez-procentov/), [Zaim.com: до зарплаты на карту](https://zaim.com/zaimy-do-zarplaty-na-kartu/) |

## Что берем из конкурентов

- `Bankiros.ru` / `Myfin` - референс по широкой матрице, гео и позднему входу на рынок.
- `Brobank.ru` - референс по насыщенности коммерческих страниц контентом.
- `Sravni.ru` - референс по короткой и понятной продуктовой витрине.
- `Banki.ru` - референс по доверию, отзывам, компаниям и рейтинговости.
- `Finuslugi.ru` - референс по аккуратной теговой модели и официальному тону.
- `Zaym.me` - референс по масштабированию `интент x город`.
- `Zaim.com` - референс по длинному SEO-хвосту, залогам и гео-комбинациям.

## Как делать лучше

Не придумываем структуру с нуля, если рынок уже показал рабочую модель. Улучшение CreditJoy должно быть в полезности страницы:

- понятные условия офферов;
- фильтры, которые реально меняют выдачу;
- объяснение рисков без воды;
- нормальные карточки компаний;
- связка витрины, компании, FAQ, отзывов, блога и калькуляторов.

## Следующий шаг

Выбрать MVP-слаги из `data/competitor-loan-slugs.csv`: сначала продуктовый хаб, потом самые сильные интенты, потом первые гео-страницы. После этого привязать к выбранным страницам запросы из `data/keywords.csv`.
