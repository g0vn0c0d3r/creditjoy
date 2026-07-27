# Keyword Processing Summary

Generated: 2026-07-27T17:20:25.229Z

## Method

- Read `Queries` and `AdditionalQueries` from each Wordcraft workbook.
- Ignored the original `cluster` column completely.
- Deduplicated by normalized query text.
- For duplicate queries across files, kept the maximum `clicks` and maximum `demand` instead of summing them.
- Assigned queries to draft future pages by rule-based intent signals; this is a working draft for human review.

## Source Files

| Source | Rows read | Sheets |
| --- | ---: | --- |
| займ | 1887 | HostsTable A1:A1081<br>UrlsTable A1:C2001<br>Queries A1:E1001<br>AdditionalQueries A1:E888 |
| микрозайм | 1926 | Queries A1:E1001<br>AdditionalQueries A1:E927<br>HostsTable A1:A515<br>UrlsTable A1:C2001 |
| микрокредит | 1925 | HostsTable A1:A306<br>AdditionalQueries A1:E926<br>Queries A1:E1001<br>UrlsTable A1:C1455 |

## Overall

- Unique queries: 5 507
- Max-click total across unique queries: 6 437 573
- Max-demand total across unique queries: 9 293 153

## Buckets

| Bucket | Queries | Clicks | Demand |
| --- | ---: | ---: | ---: |
| page | 3 282 | 5 138 908 | 7 435 636 |
| brand | 361 | 398 723 | 809 965 |
| noise | 422 | 371 936 | 221 101 |
| account | 171 | 247 768 | 439 922 |
| support | 272 | 125 259 | 162 787 |
| review-needed | 724 | 95 240 | 153 809 |
| informational | 275 | 59 739 | 69 933 |

## Top Draft Pages

| Page | Type | Queries | Clicks | Demand | Primary query |
| --- | --- | ---: | ---: | ---: | --- |
| /zaimy/ | commercial | 455 | 995 190 | 2 051 203 | займ |
| /zaimy/na-kartu/ | commercial | 266 | 751 970 | 972 057 | займ на карту |
| /zaimy/na-kartu-bez-otkaza/ | commercial:compound | 366 | 656 188 | 810 752 | займ на карту без отказа |
| /zaimy/online/ | commercial | 169 | 645 960 | 1 056 306 | займы онлайн |
| /zaimy/bez-otkaza/ | commercial | 256 | 221 633 | 318 017 | займы без отказа |
| /zaimy/bez-procentov/ | commercial | 102 | 188 479 | 306 094 | займ без процентов |
| /zaimy/s-plohoy-kreditnoy-istoriey/ | commercial | 141 | 165 243 | 165 995 | займ с плохой кредитной историей |
| /zaimy/srochno/ | commercial | 100 | 154 230 | 186 534 | быстрый займ |
| /zaimy/srochno-na-kartu/ | commercial:compound | 124 | 147 473 | 180 130 | займ на карту срочно |
| /zaimy/s-plohoy-kreditnoy-istoriey-bez-otkaza/ | commercial:compound | 50 | 121 592 | 117 509 | займы с плохой кредитной историей без отказа |
| /zaimy/na-kartu-bez-procentov/ | commercial:compound | 76 | 121 163 | 168 040 | микрозайм без процентов на карту |
| /zaimy/pod-zalog-avto/ | commercial | 64 | 119 681 | 155 028 | займ под залог авто |
| /zaimy/cherez-gosuslugi/ | commercial | 74 | 105 073 | 93 823 | займ через госуслуги |
| /zaimy/novye/ | commercial | 79 | 85 817 | 92 624 | новые займы |
| /zaimy/pod-zalog-pts/ | commercial | 55 | 82 240 | 112 868 | займ под залог птс |
| /zaimy/do-zarplaty/ | commercial | 46 | 77 621 | 87 625 | займ до зарплаты |
| /zaimy/top/ | support | 149 | 70 750 | 99 054 | топ займов |
| /zaimy/cherez-gosuslugi-na-kartu/ | commercial:compound | 45 | 66 416 | 59 385 | займ через госуслуги на карту |
| /zaimy/na-kartu-bez-proverok/ | commercial:compound | 68 | 54 638 | 64 119 | займ на карту без отказа без проверки |
| /zaimy/na-kartu-s-plohoy-kreditnoy-istoriey/ | commercial:compound | 41 | 47 819 | 46 907 | займ на карту с плохой кредитной историей |
| /zaimy/na-kartu-s-plohoy-kreditnoy-istoriey-bez-otkaza/ | commercial:compound | 56 | 37 238 | 34 484 | займ без отказа на карту с плохой кредитной историей срочно |
| /zaimy/refinansirovanie-mikrozaymov/ | support | 82 | 32 288 | 37 374 | рефинансирование займов |
| /zaimy/po-pasportu/ | commercial | 76 | 31 303 | 39 652 | займ по паспорту |
| /zaimy/bez-procentov-na-30-dney/ | commercial:compound | 21 | 27 985 | 35 631 | микрозайм без процентов на 30 дней |
| /zaimy/bez-proverok/ | commercial | 38 | 27 360 | 32 595 | займ без проверок |

## Strong Signals

| Signal | Queries | Clicks | Demand |
| --- | ---: | ---: | ---: |
| loan | 3 563 | 6 172 981 | 8 931 261 |
| onCard | 1 640 | 2 268 016 | 2 680 480 |
| online | 1 265 | 1 812 730 | 2 444 678 |
| noRefusal | 1 015 | 1 218 604 | 1 447 686 |
| microloan | 1 372 | 842 846 | 1 166 898 |
| instant | 961 | 754 725 | 868 968 |
| noInterest | 304 | 392 736 | 566 009 |
| badCredit | 383 | 389 499 | 378 793 |
| gosuslugi | 164 | 194 998 | 174 317 |
| collateralAuto | 98 | 173 244 | 221 185 |
| newLoans | 148 | 127 050 | 134 005 |
| noChecks | 192 | 121 479 | 140 374 |
| collateralPts | 75 | 115 884 | 157 408 |
| microcredit | 1 021 | 92 026 | 112 498 |
| payday | 67 | 84 558 | 95 418 |
| rating | 188 | 80 944 | 107 178 |
| noDocs | 167 | 68 779 | 82 368 |
| passport | 160 | 68 518 | 82 111 |
| city:moskva | 42 | 51 435 | 66 057 |
| mfo | 231 | 39 179 | 44 085 |

## Files

- `all-keywords.csv` - every unique query with assigned bucket/page.
- `page-candidates.csv` - draft future commercial/support pages with aliases.
- `page-aliases.json` - full page -> query alias map.
- `buckets/*.csv` - excluded/separate buckets for review.

## Review Notes

- `brand`, `account`, and `noise` are intentionally not mixed into commercial pages.
- `support` contains top/rating/reviews/calculator/refinancing pages that can still be useful for SEO and trust.
- `microcredit` queries are mostly treated as aliases into the same loan intent unless the query is purely `микрокредит`; those go to `/mikrokredity/` for manual review.
- Pages with wording like `без отказа`, `без проверок`, `100% одобрение` need careful legal and UX wording.

