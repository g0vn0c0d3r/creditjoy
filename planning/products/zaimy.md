# Продукт: займы

Статус: рабочая карта продукта. Это не реестр страниц и не список MVP-слагов.

Дата: 2026-08-01.

## Роль

`Займы` - первый коммерческий продукт CreditJoy.

Задача файла - держать простую карту:

- как продукт растет вширь;
- какие направления лендингов есть у конкурентов;
- где лежит полный список рыночных слагов;
- как потом выбрать структуру CreditJoy.

Полный верхний план и конкурентный блок: `planning/project.md`.

## Принцип

Сначала собираем реальные посадочные конкурентов, потом выбираем свои страницы.

На этом этапе не выбираем MVP и не отсекаем интенты по вкусу.

## Займ или микрозайм

Пока держим один продуктовый слой:

```text
/zaimy/
```

Запросы `микрозайм`, `микрозаймы`, `микрокредит`, `микрокредиты` считаем частью поля `займы`.

Причина простая: конкуренты называют один и тот же рынок по-разному (`/zaymy/`, `/zajmy/`, `/microloans/`, `/mikrozajmy/`). Разделять продукт будем только если выдача, семантика и контент покажут, что нужна отдельная страница.

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

## Простая схема

Базовая URL-логика для обсуждения: сначала продукт, потом интент, потом город.

```text
/zaimy/                         общий хаб займов
/zaimy/na-kartu/                интент: займы на карту
/zaimy/pod-zalog-pts/           интент: займы под залог ПТС

/zaimy/moskva/                  город: все займы в Москве
/zaimy/na-kartu/moskva/         интент + город: займы на карту в Москве
/zaimy/pod-zalog-pts/moskva/    интент + город: займы под залог ПТС в Москве

/companies/{slug}/
/blog/{slug}/
/calculators/{slug}/
```

Город не живет сам по себе как отдельная логика. Это просто версия уже выбранной страницы под конкретный город.

Это не финальная структура. Это понятная рамка, чтобы смотреть на рынок без лишней математики.

## Вширь

Основные слои продукта:

- продуктовый хаб;
- интентные лендинги;
- гео-страницы;
- карточки компаний;
- блог и справка;
- калькуляторы и сервисы.

## Вглубь

Направления из конкурентных слагов:

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

## Как читать направления

Проще думать так: каждое направление - это тип витрины. Конкретный слаг внутри направления - это сохраненный фильтр/тег, по которому на страницу попадают подходящие офферы МФО.

| Направление | Что это значит | Пример CreditJoy | Примеры у конкурентов |
| --- | --- | --- | --- |
| Хаб и названия продукта | Общие страницы про сам продукт и его близкие названия. | `/zaimy/`, `/zaimy/microkredity/` | [Bankiros: займы](https://bankiros.ru/zaymy), [Banki.ru: microloans](https://www.banki.ru/microloans/) |
| Каталог, подбор, доверие | Страницы для сравнения и выбора: лучшие, проверенные, надежные, МФО, отзывы. | `/zaimy/luchshie/`, `/zaimy/proverennye/` | [Brobank: лучшие](https://brobank.ru/zajmy/luchshie/), [Bankiros: проверенные](https://bankiros.ru/zaymy/proverennye) |
| Способ получения | Куда или как человек хочет получить деньги. | `/zaimy/na-kartu/`, `/zaimy/nalichnymi/` | [Bankiros: на карту](https://bankiros.ru/zaymy/na-kartu), [Brobank: наличными](https://brobank.ru/zajmy/nalichnymi/) |
| Карты и банки | Уточнение внутри сценария "на карту": банк, платежная система, особый тип карты. | `/zaimy/na-kartu-sberbanka/`, `/zaimy/na-kartu-mir/` | [Brobank: Сбербанк](https://brobank.ru/zajmy/na-kartu-sberbanka/), [Bankiros: Мир](https://bankiros.ru/zaymy/na-kartu-mir) |
| Цена и условия | Страницы про стоимость и неприятные условия: проценты, подписки, комиссии, страховки. | `/zaimy/bez-procentov/`, `/zaimy/bez-podpisok/` | [Brobank: без процентов](https://brobank.ru/zajmy/bez-procentov/), [Finuslugi: без процентов](https://finuslugi.ru/mikrozajmy/teg_bez_procentov) |
| Документы и проверки | Что нужно для оформления и как проходит проверка. | `/zaimy/po-pasportu/`, `/zaimy/bez-spravok/` | [Bankiros: по паспорту](https://bankiros.ru/zaymy/po-pasportu), [Brobank: без справок](https://brobank.ru/zajmy/bez-spravok/) |
| КИ и одобрение | Сложные случаи заемщика: плохая КИ, просрочки, отказ, высокий шанс одобрения. | `/zaimy/s-plohoy-kreditnoy-istoriey/`, `/zaimy/s-prosrochkami/` | [Banki.ru: плохая КИ](https://www.banki.ru/microloans/catalogue/zaymyi_s_plohoy_kreditnoy_istoriey/), [Brobank: просрочки](https://brobank.ru/zajmy/s-prosrochkami/) |
| Скорость | Когда деньги нужны быстро: срочно, моментально, круглосуточно, ночью. | `/zaimy/srochnye/`, `/zaimy/za-5-minut/` | [Banki.ru: быстрые](https://www.banki.ru/microloans/catalogue/byistryie_zaymyi/), [Bankiros: за 5 минут](https://bankiros.ru/zaymy/za-5-minut) |
| Срок и погашение | На какой срок берут и как возвращают. | `/zaimy/do-zarplaty/`, `/zaimy/na-mesyac/` | [Brobank: до зарплаты](https://brobank.ru/zajmy/do-zarplaty/), [Bankiros: на месяц](https://bankiros.ru/zaymy/na-mesyac) |
| Сумма | Конкретная сумма или размер займа. | `/zaimy/10000-rubley/`, `/zaimy/50000-rubley/` | [Brobank: 10000 рублей](https://brobank.ru/zajmy/na-10000-rublej/), [Bankiros: 50000 рублей](https://bankiros.ru/zaymy/50000-rubley) |
| Заемщик | Кто берет займ: пенсионер, студент, ИП, самозанятый, иностранец, возраст. | `/zaimy/pensioneram/`, `/zaimy/s-18-let/` | [Brobank: пенсионерам](https://brobank.ru/zajmy/pensioneram/), [Bankiros: с 18 лет](https://bankiros.ru/zaymy/s-18-let) |
| Залог | Есть ли обеспечение и какое именно. | `/zaimy/pod-zalog-pts/`, `/zaimy/pod-zalog-nedvizhimosti/` | [Brobank: ПТС](https://brobank.ru/zajmy/pod-zalog-pts/), [Bankiros: недвижимость](https://bankiros.ru/zaymy/pod-zalog-nedvizhimosti) |
| Гео | Та же витрина, но для конкретного города. | `/zaimy/moskva/`, `/zaimy/na-kartu/moskva/` | [Sravni: Москва](https://www.sravni.ru/zaimy/moskva/), [Finuslugi: Москва](https://finuslugi.ru/mikrozajmy/reg_moskva) |
| Смешанные посадочные | Комбинация двух условий в одном слаге. Решаем отдельно, делать страницей или нет. | `/zaimy/do-zarplaty-na-kartu/`, `/zaimy/srochnye-bez-procentov/` | [Brobank: срочные без процентов](https://brobank.ru/zajmy/srochnye-bez-procentov/), [Zaim.com: до зарплаты на карту](https://zaim.com/zaimy-do-zarplaty-na-kartu/) |

## Что подсмотрели у конкурентов

- `Sravni.ru` держит короткий набор сильных интентов прямо рядом с выдачей.
- `Bankiros.ru` дает большой блок `Другие микрозаймы` с рыночным хвостом.
- `Brobank.ru` хорошо разложил `Готовые решения` по условиям, типу займа, суммам, срокам, заемщикам и скорости.
- `Finuslugi.ru` использует теговую модель `/mikrozajmy/teg_{intent}`.
- `Zaym.me` масштабирует через `filter + city`.
- `Zaim.com` полезен как источник широкой SEO-матрицы и залоговых/гео-комбинаций.

## Следующий шаг

Открыть `data/competitor-loan-slugs.csv` и выбрать, какие направления CreditJoy берет в структуру продукта, а какие остаются только как семантика, алиасы или темы для блога.
