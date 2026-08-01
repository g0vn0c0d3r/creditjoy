# Структура займов у топ-5

Статус: результат пункта 3 плана запуска.

Дата среза: 2026-08-01.

## Что проверяли

- Хаб займов.
- Интентные страницы.
- Гео-страницы.
- Карточки МФО/офферов.
- Фильтры и калькуляторы.
- FAQ, отзывы, экспертные блоки.
- Перелинковку внутри раздела.

## Короткий вывод

Рынок строит раздел `займы` по одной базовой логике: продуктовый хаб -> интенты -> гео -> офферы/МФО -> доверие/FAQ/отзывы. Отличаются не принципы, а глубина матрицы и качество данных.

Для CreditJoy базовый стандарт такой:

- продукт первым в URL;
- интенты как отдельные посадочные только при отдельном сценарии выбора;
- гео как множитель, а не самостоятельная структура;
- карточка оффера должна показывать сумму, срок, ставку, ПСК, вероятность/скорость решения, лицензию, способы получения, риски платных услуг;
- на странице нужны не только SEO-текст и офферы, но и калькулятор/подбор, FAQ, отзывы, блоки доверия и перелинковка.

## Сводка slug-интентов конкурентов

Срез: 2026-08-01.

В таблице один ряд = один коммерческий сценарий. Внутри ряда собраны варианты slug-ов и формулировок конкурентов, которые пересекаются по смыслу. Гео-страницы, карточки конкретных МФО и отзывы вынесены отдельно, чтобы не смешивать продуктовые интенты с сущностями.

| Группа | Уникальный сценарий | Найденные варианты у конкурентов | Что это значит для CreditJoy |
| --- | --- | --- | --- |
| База | Хаб займов | `/zaimy/`, `/zaymy`, `/zajmy/`, `/zajmy/online/`, `/microloans/`, `/mikrozajmy` | Нужен один продуктовый хаб `/zaimy/`. |
| База | Онлайн-заявка / онлайн-займ | `online`, `onlain`, `microcredit-online`, `teg_online_zayavka`, `zaym_online`, `byistryie_zaymyi` | Чистый базовый интент, можно держать как основной сценарий хаба или отдельную страницу после проверки семантики. |
| База | Подбор / калькулятор | `/podbor-zayma-online`, `/podbor_zajma`, `/zajmy/calculator/`, `zayavka-vse-mfo` | Это лучше делать как функциональный слой, а не только SEO-страницу. |
| Рейтинг/организации | Лучшие / топ / рейтинг | `best`, `top`, `luchshie`, `top_zaimov`, `rating`, `rating-mfo`, `proverennye`, `nadezhnye` | Нужен слой доверия: рейтинг МФО, проверенные компании, методология. |
| Рейтинг/организации | МФО и карточки компаний | `mfo`, `mkk`, `mfo/{company}`, `mfo/{company}/otzyvy`, `/zaym-{company}/`, `polzovatelskij_rejting_mfo` | Карточки компаний лучше проектировать как отдельную сущность, связанную с интентами. |
| Способ получения | На карту | `na-kartu`, `online-na-kartu`, `na-kartu-onlain`, `onlajn_na_kartu`, `mikrokredity-na-kartu`, `zaym_na_kartu`, `zaymyi_na_kartu_po_vsey_rossii` | Один из главных чистых интентов для MVP. |
| Способ получения | На карту быстро / срочно / мгновенно | `na-kartu-bystro`, `na-kartu-mgnovenno`, `na-kartu-ekspress`, `ekspress_zajm_na_kartu`, `srazu-na-kartu`, `srochnye-na-kartu`, `za-5-minut-na-kartu` | Не плодить все сразу: это алиасы к `на карту` и `срочно`, пока не доказан отдельный спрос. |
| Способ получения | Конкретные карты и банки | `na-kartu-mir`, `na-kartu-sberbanka`, `na-kartu-sberbanka-do-zarplaty`, `na-kartu-tinkoff`, `na-kartu-tbank`, `na-kartu-vtb`, `na-kartu-alfa-banka`, `na-kartu-ozon-banka`, `na-kartu-kukuruza`, `na-kartu-maestro`, `na-kartu-visa`, `na-kartu-momentum`, `na-kreditnuyu-kartu`, `na-virtualnuyu-kartu`, `na-neimennuyu-kartu`, `na-chuzhuyu-kartu`, `na-kartu-s-nulevym-balansom` | Длинный хвост. В MVP только если есть сильный спрос и можно дать полезные отличия. |
| Способ получения | Наличными / счет / перевод | `nalichnymi`, `na-bankovskij-schet`, `perevodom`, `denezhnym-perevodom`, `cherez-zolotuyu-koronu`, `zolotaya-korona`, `na-contact`, `po-sbp` | Можно держать как фильтры и будущие посадочные. |
| Способ получения | Электронные кошельки | `na-koshelek`, `na-elektronnyy-koshelek`, `na-elektronnyj-koshelek`, `na-yandex-dengi`, `na-yandex`, `na-yoomoney`, `yoomoney`, `qiwi`, `na_qiwi_koshelek`, `webmoney` | Хвостовый интент, не первый приоритет. |
| Способ получения | По телефону / SMS / номеру | `po-telefonu`, `na-nomer-telefona`, `na-telefon`, `po-sms`, `sms` | Часто пересекается с упрощенной заявкой; осторожно с качеством страницы. |
| Способ получения | Без карты / на дом | `bez-karty`, `na-dom`, `na-dom-srochno`, `zaem-na-dom`, `ne-vyhodya-iz-doma` | Лучше как фильтр, отдельная посадочная только при понятных офферах. |
| Цена | Без процентов / первый бесплатно | `bez-procentov`, `bez-protsentov`, `pervyj-bez-procentov`, `pervyj-zajm-bez-procentov`, `pod-0-procentov`, `besplatnye`, `30-dnej-bez-procentov`, `bez-protsentov-na-30-dnej`, `na-kartu-bez-procentov`, `na-mesyac-bez-procentov`, `srochnye-bez-procentov` | Чистый интент для MVP, но с прозрачным объяснением условий акции. |
| Цена | Низкий процент / выгодные | `pod-nizkiy-procent`, `pod-nizkij-procent`, `s-nizkim-procentom`, `vygodnye`, `pod-procenty` | Требует честной методологии сортировки. |
| Цена | Без платных услуг / скрытых списаний | `bez-podpisok`, `bez-platnyh-podpisok`, `bez_platnyh_uslug`, `bez-komissii`, `bez-predoplat`, `bez-predoplaty`, `bez-spisaniya-deneg-s-karty`, `bez-strahovok`, `bez-posrednikov` | Хорошее место для улучшения CreditJoy: показывать подписки, комиссии и риски в карточке. |
| Одобрение/КИ | Плохая кредитная история | `s-plohoi-ki`, `s-plohoy-kreditnoy-istoriey`, `s-plokhoj-kreditnoj-istoriej`, `s_plohoy_kreditnoy_istoriey`, `na-kartu-s-plohoi-ki`, `s-plohoy-kreditnoy-istoriey-na-kartu` | Можно делать только без обещаний, через вероятность и условия МФО. |
| Одобрение/КИ | Просрочки / черный список / нет истории | `s-prosrochkami`, `s-chernym-spiskom`, `bez-kreditnoj-istorii`, `dlya-uluchsheniya-kreditnoj-istorii`, `mfo-bez-proverki-kreditnoy-istorii` | Сомнительная зона, нужна юридически аккуратная подача. |
| Одобрение/КИ | Без отказа / всем / 100% | `bez-otkaza`, `bezotkaznye`, `na-kartu-bez-otkaza`, `na-kartu-bez-otkazov`, `100-procentov-odobreniya`, `100-procentov-odobrenie`, `bez-otkaza-100-procentov-odobreniya`, `s-vysokim-odobreniem`, `s-avtomaticheskim-odobreniem`, `absolyutno-vsem`, `vsem`, `posle-otkaza` | Для CreditJoy это не “чистый” MVP-интент: нельзя обещать гарантированное одобрение. |
| Одобрение/КИ | Должники / банкроты / сложные заемщики | `dolzhnikam`, `bankrotam`, `dlya-bankrotov`, `propashchim`, `sovsem-propashchim`, `s-samozapretom`, `dengi-v-dolg-bez-proverki-kreditnoj-istorii` | Отложить до отдельной проверки спроса, рисков и качества офферов. |
| Документы | По паспорту | `po-pasportu`, `zaym_po_pasportu` | Чистый интент, но может быть алиасом к онлайн-займу. |
| Документы | Без справок / поручителей / залога | `bez-spravok`, `bez-poruchiteley`, `bez-poruchitelej`, `bez-poruchiteley-i-spravok`, `bez-zaloga`, `mikrozaem_bez_zaloga` | `без залога` может быть важным антонимом к залоговым займам. |
| Документы | Без документов / идентификации | `bez-pasporta`, `bez-dokumentov`, `bez-foto`, `bez-foto-pasporta`, `bez-foto-lica-i-dokumentov`, `bez-snils`, `bez-snilsa`, `bez-podtverzhdeniya-lichnosti`, `zajmy-bez-biometrii`, `bez-nomera-telefona`, `bez-elektronnoy-pochty`, `bez-ukazanija-raboti`, `bez-registracii`, `bez-propiski` | В основном рискованный хвост, не MVP. |
| Документы | Госуслуги / приложение / роботы | `cherez-gosuslugi`, `gosuslugi`, `cherez-prilozhenie`, `tinkoff-id`, `robot`, `roboty-zajmov`, `telegram` | Фиксируем как рынок, но не берем в чистый MVP без веской причины. |
| Скорость | Срочно / быстро / моментально | `srochnyj`, `srochnye`, `srochnye_onlajn`, `bystryj`, `bystryi`, `momentalnyi`, `mgnovennye`, `na-kartu-mgnovenno`, `express`, `ehkspress-na-kartu`, `za-5-minut`, `za-1-minutu`, `za-minutu`, `za-15-minut`, `srazu`, `kruglosutochno`, `24-chasa-onlayn`, `nochyu`, `v-den-obrashcheniya`, `avtomatom` | Сильная группа, но нужно объединять близкие алиасы. |
| Срок | До зарплаты / короткий срок | `do-zarplaty`, `na-kartu-do-zarplaty`, `do-zarplaty-na-kartu`, `kratkosrochnye`, `kratkosrochnyi`, `na-7-dney`, `na-60-dnej` | `до зарплаты` выглядит как отдельный чистый интент. |
| Срок | Долгосрочные / конкретный срок | `dolgosrochnyj`, `dolgosrochnye`, `na-kartu-dolgosrochniy`, `dolgosrochnye-na-kartu`, `na-mesyac`, `na-1-mesjac`, `na-polgoda`, `na-polgoda-6-mesyacev`, `na-6-mesyacev`, `na-3-mesyaca`, `3-mesyaca`, `na-god`, `na-1-god`, `na-2-goda`, `na-5-let` | Долгосрочные можно рассматривать, конкретные сроки чаще как хвост. |
| Возврат | Ежемесячный платеж / рассрочка / погашение | `s-ezhemesyachnyj-platezhom`, `s-ezhemesyachnym-platezhom`, `na-dlitelnyj-srok-s-ezhemesyachnoj-oplatoj`, `v-rassrochku`, `dengi-v-rassrochku-bez-procentov`, `s-prolongaciej`, `dlya-pogasheniya`, `dlja-pogashenija`, `na-pogashenie-drugih-zajmov`, `refinansirovanie` | Важная информационная группа, но коммерческие страницы нужны только при офферах. |
| Сумма | Микро- и крупные суммы | `mini`, `bolshie`, `bolshie-zaimy`, `na-bolshuyu-summu` | Можно использовать как навигационный фильтр. |
| Сумма | Конкретная сумма | `100-rubley`, `na-100-rublej`, `500-rubley`, `na-500-rublej`, `1000-rubley`, `na-1000-rublej`, `2000-rubley`, `na-2000-rublej`, `3000-rubley`, `4000-rubley`, `5000-rubley`, `10000-rubley`, `15000-rubley`, `20000-rubley`, `25000-rubley`, `30000-rubley`, `40000-rubley`, `50000-rubley`, `60000-rubley`, `70000-rubley`, `100000-rubley`, `150000-rubley`, `200000-rubley`, `300000-rubley`, `na-500000-rublej`, `srochno-{sum}`, `teg_500000` | Массовый хвост. Для MVP не нужен как отдельная сетка, лучше через калькулятор и алиасы. |
| Аудитория | Возраст | `s-16-let-na-kartu`, `s-18-let`, `s-19-let`, `s-20-let`, `s-21-goda`, `do-75-let`, `pensioneram-do-75-let`, `do-80-let`, `pensioneram-do-80-let`, `80-let`, `85-let` | Сомнительный хвост, не стартовать без данных. |
| Аудитория | Социальная/профильная категория | `studentam`, `studentam-na-kartu-bez-otkaza`, `pensioneram`, `pensioneram-na-kartu`, `bezrabotnym`, `na-kartu-bezrabotnym`, `dlya-ip`, `dlya-biznesa`, `biznes`, `dlya-samozaniatykh-grazhdan`, `microzaym_dlya_samozanyatih`, `muzhchinam`, `zhenshchinam`, `voennosluzhashhim` | Брать только если есть отдельные условия/офферы или сильный спрос. |
| Аудитория | Гражданство / иностранцы | `dlya-grazhdan-sng`, `dlya-inostrannyh-grazhdan`, `inostrannym-grazdanam`, `inostrancam`, `dlya-grazhdan-kazahstana`, `dlya-grazhdan-kazakhstana`, `dlya-grazhdan-kirgizii`, `dlya-grazhdan-tadzhikistana`, `dlya-grazhdan-uzbekistana`, `dlya-grazhdan-belorussii`, `dlya-grazhdan-armenii` | Хвост с высоким риском тонких страниц. |
| Залог | Без залога | `bez-zaloga`, `mikrozaem_bez_zaloga` | Один из ключевых MVP-сценариев как противопоставление залоговым займам. |
| Залог | Под залог ПТС | `pod-zalog-pts`, `pod-pts`, `pod-pts-avtolombardy`, `dengi-v-dolg-pod-zalog-pts` | Ключевой MVP-сценарий. |
| Залог | Под залог авто / транспорта | `pod-zalog-avto`, `pod-zalog-gruzovogo-avtomobilya`, `zaym_pod_zalog_avto` | Ключевой залоговый сценарий, может быть рядом с ПТС. |
| Залог | Под залог недвижимости / квартиры | `pod-zalog-nedvizhimosti`, `pod-zalog-kvartiry` | Ключевой MVP-сценарий, если брокерская модель покрывает такие офферы. |
| Залог | Другие виды залога | `pod-zalog`, `pod-zalog-dokumentov`, `pod-raspisku`, `pod-materinskij-kapital` | Сначала как дочерняя логика, не обязательно MVP. |
| Другое | Частные / деньги в долг / сезонное | `dengi-v-dolg`, `dengi-v-dolg-na-kartu`, `chastnye`, `novye`, `novye-mfo`, `maloizvestnye`, `novogodnie`, `credit-services` | Использовать как рабочую память, не как готовую структуру. |

## Как конкуренты группируют интенты

| Конкурент | Как устроена группировка | Логика, которую можно взять |
| --- | --- | --- |
| `Sravni.ru` | Хаб `/zaimy/`, верхние интенты в навигации, гео-блоки, prefooter "Часто ищут": регионы, ПТС/автоломбарды, без проверок, быстрое оформление, сроки, погашение, сложные случаи, рейтинги/новинки, способы получения, суммы, аудитории и документы. | Хорошая связка `продукт -> интент -> город`, плюс prefooter как карта спроса. |
| `Bankiros.ru` | Почти вся матрица лежит плоско в `/zaymy/{intent}`; отдельно есть `/podbor-zayma-online`; гео идет тем же продуктовым уровнем. | Максимальный источник хвоста. Для CreditJoy полезен как инвентарь, но не как готовый список страниц. |
| `Banki.ru` | Хаб `/microloans/`, каталог `/microloans/catalogue/{intent}/`, город после интента, отдельные карточки продуктов и сильный слой отзывов/рейтингов. | Брать доверительный слой: каталог, карточки МФО, отзывы, эксперты, вопросы. |
| `Finuslugi.ru` | Хаб `/mikrozajmy`, интенты через `teg_*`, гео через `reg_*`, отдельный мастер `/podbor_zajma`, официальная навигация по МФО и отзывам. | Брать официальный тон, безопасность, экспертов и подбор; не брать технические `teg_`/`reg_` в URL. |
| `Brobank.ru` | Хаб `/zajmy/`, основной вход `/zajmy/online/`, табы над выдачей и блок "Готовые решения": условия получения, тип займа, сумма, срок, категории заемщиков, скорость, возврат, проверенные МФО. | Лучшая явная группировка хвоста. Можно адаптировать как навигацию и внутреннюю перелинковку. |

## Вывод по slug-срезу

- Рынок уже доказал основные группы: способ получения, залог, цена, скорость, срок, КИ/одобрение, документы, аудитории, суммы, гео, МФО/отзывы.
- Для MVP не нужно копировать всю матрицу: чистыми выглядят `на карту`, `без процентов`, `без залога`, `под залог`, `под залог ПТС`, `под залог авто`, `под залог недвижимости`, `до зарплаты`, возможно `с плохой КИ` только с осторожной формулировкой.
- Рискованные интенты (`без отказа`, `100% одобрение`, `всем`, `без проверок`, `без паспорта`, `Госуслуги`) фиксируем как рынок, но не берем в чистый MVP без отдельного решения.
- Суммы, сроки, банки карт и аудитории лучше сначала использовать как фильтры/алиасы и проверять по `data/keywords.csv`.
- Лучшее улучшение CreditJoy не в новой архитектуре, а в качестве страницы: прозрачные условия, ПСК, комиссии, подписки, страховки, лицензии, методология рейтинга, калькулятор и понятная перелинковка.

## Матрица конкурентов

| Сайт | Хаб | Интенты | Гео | Карточки | Фильтры/калькулятор | FAQ/экспертность | Перелинковка |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Sravni.ru` | сильный продуктовый хаб `/zaimy/` | широкий набор чистых и рискованных интентов | города после продукта | офферы + МФО + отзывы | подбор/калькулятор, сумма/срок | сильные H2, FAQ, отзывы | интенты, города, МФО, отзывы |
| `Bankiros.ru` | сильный SEO-хаб `/zaymy` | самая широкая матрица | города после продукта | офферы с лицензией, рейтингом, ПСК | сумма/срок/ставка, вероятность, история | длинный справочный блок | похожие займы, города, организации |
| `Banki.ru` | доверительный хаб `/microloans/` | каталог `/catalogue/{intent}/` | город после интента | МФО, рейтинги, отзывы | калькулятор/условия | экспертность и народный рейтинг | каталог, отзывы, МФО |
| `Finuslugi.ru` | официальный хаб `/mikrozajmy` | `teg_`-страницы | `reg_`-страницы | продуктовые карточки МФО | фильтры + калькулятор | эксперт, FAQ, безопасность | теги, регионы, МФО, подбор |
| `Brobank.ru` | хаб `/zajmy/`, вход `/zajmy/online/` | очень широкая сетка | есть гео и общероссийские страницы | детальные карточки офферов | фильтры, калькулятор, раскрытия условий | FAQ, отзывы, новости | табы, готовые решения, МФО, статьи |

## Sravni.ru

Роль: ориентир по продуктовой UX-структуре и гео.

Структура:

- хаб: `/zaimy/`;
- интенты: `/zaimy/onlain/`, `/zaimy/na-kartu-onlain/`, `/zaimy/bez-otkaza/`, `/zaimy/s-plokhoj-kreditnoj-istoriej/`, `/zaimy/po-pasportu/`, `/zaimy/bez-protsentov/`, `/zaimy/pod-pts/`;
- гео: `/zaimy/moskva/`, `/zaimy/sankt-peterburg/`, `/zaimy/ekaterinburg/` и другие города;
- компании/отзывы: `/zaimy/mfo/{company}/otzyvy/`;
- дополнительные интенты: ПТС, долгосрочные, без подписок, без проверок, суммы, аудитории, возраст, способы получения.

Типовая страница:

- H1 под продукт/интент;
- подбор или калькулятор сверху;
- список офферов;
- блок "Как получить займ";
- объясняющие секции: что такое займ, МФК/МКК, путь от заявки до денег, виды займов, риски;
- FAQ;
- отзывы о продукте;
- перелинковка на интенты, города и МФО.

Что брать:

- UX: быстрый путь от H1 к офферам;
- структуру `хаб -> интент -> город`;
- блоки рисков и FAQ рядом с коммерческой задачей;
- слой отзывов по МФО.

Что не копировать:

- рискованные посадочные вроде `без отказа`, `без проверок`, `всем` без аккуратной юридической подачи;
- слишком широкую сетку сумм/возраста до проверки данных.

## Bankiros.ru

Роль: ориентир по SEO-матрице и масштабированию.

Структура:

- хаб: `/zaymy`;
- верхние интенты: `/zaymy/online`, `/zaymy/na-kartu`, `/zaymy/bez-otkaza`, `/zaymy/pod-zalog-pts`, `/zaymy/bez-procentov`, `/zaymy/best`;
- длинный хвост: `bystryj`, `po-pasportu`, `online-na-kartu`, `s-plohoi-ki`, `30-dnej-bez-procentov`, `pensioneram`, `na-god`, `momentalnyi`, `nalichnymi`, `na-kartu-mgnovenno`, `na-kartu-s-plohoi-ki`, `s-prosrochkami`, `do-zarplaty`, `bez-podpisok`, `bez-strahovok`;
- залог: `pod-zalog-pts`, `pod-zalog-avto`, `pod-zalog-nedvizhimosti`, `pod-zalog-kvartiry`;
- гео: `/zaymy/moskva`, `/zaymy/spb`, `/zaymy/novosibirsk`, `/zaymy/kazan` и далее;
- отдельный слой сервисов/организаций: МФО, рейтинги, отзывы, кредитные сервисы.

Типовая страница:

- H1 под страну/город/интент;
- офферы МФО с параметрами;
- карточки содержат сумму, срок, ставку, ПСК, лицензию, рейтинг, вероятность одобрения, скорость решения;
- большой справочный блок;
- блоки "Лучшие займы", "Другие микрозаймы", "Займы в других городах";
- перелинковка на соседние интенты и города.

Что брать:

- принцип матрицы интентов;
- использование данных в карточке: ПСК, лицензия, рейтинг, вероятность, скорость;
- городскую перелинковку;
- Bankiros/Myfin как референс роста через структуру.

Что не копировать:

- риск тонких страниц;
- страницы с опасными обещаниями как чистые коммерческие страницы;
- слишком мелкие суммы/аудитории без отдельной пользы.

## Banki.ru

Роль: ориентир по доверию, отзывам, рейтингам и карточкам МФО.

Структура:

- хаб: `/microloans/`;
- каталог интентов: `/microloans/catalogue/{intent}/`;
- примеры: `/microloans/catalogue/zaym_na_kartu/`, `/microloans/catalogue/besprotsentnyiy_zaym/`;
- гео после интента: `/microloans/catalogue/zaymyi_s_plohoy_kreditnoy_istoriey/kazan~/`, `/microloans/catalogue/zaym_na_kartu_s_plohoy_kreditnoy_istoriey/rostov-na-donu/`;
- отдельные слои: отзывы о МФО, народный рейтинг, карточки компаний, форум/вопросы.

Типовая логика:

- продуктовый каталог;
- фильтрация/сравнение условий;
- карточки МФО и предложений;
- отзывы и рейтинги как центральный доверительный слой;
- экспертные материалы и пользовательские обсуждения вокруг продукта.

Что брать:

- доверие через отзывы, рейтинги и проверку МФО;
- карточку компании как самостоятельную сущность;
- связку коммерческих страниц с отзывами и экспертными материалами.

Что не копировать:

- тяжелую структуру и длинный путь к выбору;
- URL-формат `catalogue` и `_`, он не нужен CreditJoy.

Примечание: при техническом срезе страницы Banki.ru возвращали JS-защиту, поэтому разбор основан на доступных каталоговых URL, поисковых фрагментах и уже зафиксированной структуре продукта.

## Finuslugi.ru

Роль: ориентир по юридической чистоте, официальности и безопасности.

Структура:

- хаб: `/mikrozajmy`;
- интенты через системные теги: `/mikrozajmy/teg_bez_procentov`, `/mikrozajmy/teg_onlajn_na_kartu`, `/mikrozajmy/teg_po_pasportu`, `/mikrozajmy/teg_do_zarplaty`, `/mikrozajmy/teg_srochnye_onlajn`, `/mikrozajmy/teg_pod_zalog_pts`, `/mikrozajmy/teg_s_plohoj_kreditnoj_istoriej`;
- гео через системные регионы: `/mikrozajmy/reg_moskva`, `/mikrozajmy/reg_sankt-peterburg`, `/mikrozajmy/reg_tatarstan/kazan`, `/mikrozajmy/reg_rostovskaja_oblast/rostov_na_donu`;
- продуктовые страницы МФО: `/mikrozajmy/{company}_{product}`;
- отдельный подбор: `/podbor_zajma`.

Типовая страница:

- H1 "Микрозаймы";
- список офферов МФО;
- фильтры по сумме, сроку и параметрам;
- калькулятор переплаты;
- блок "Мнение эксперта";
- эксперты направления;
- отзывы;
- частые вопросы;
- сильные юридические/безопасностные объяснения: реестр, ЦБ, официальные партнеры.

Что брать:

- официальный тон и блок безопасности;
- экспертный слой;
- связку "офферы -> калькулятор -> FAQ -> отзывы";
- идею отдельного мастера подбора.

Что не копировать:

- технические `teg_` и `reg_` в URL;
- обещания одобрения как коммерческий headline без проверки.

## Brobank.ru

Роль: ориентир по детальным карточкам офферов и готовым решениям.

Структура:

- хаб: `/zajmy/`;
- основной SEO-вход: `/zajmy/online/`;
- табы/готовые решения: `/zajmy/na-kartu/`, `/zajmy/bez-otkaza/`, `/zajmy/bez-procentov/`, `/zajmy/pod-zalog-pts/`, `/zajmy/mfo/`, `/zajmy/calculator/`, `/zajmy/do-zarplaty/`, `/zajmy/srochnye/`, `/zajmy/luchshie/`, `/zajmy/s-plohoj-kreditnoj-istoriej/`, `/zajmy/pervyj-zajm-bez-procentov/`, `/zajmy/s-prosrochkami/`;
- длинный хвост: документы, способы получения, конкретные карты, суммы, сроки, аудитории, скорость, "высокое одобрение";
- залог: `/zajmy/pod-zalog/`, `/zajmy/pod-zalog-avto/`, `/zajmy/pod-zalog-pts/`, `/zajmy/pod-zalog-nedvizhimosti/`, `/zajmy/pod-zalog-kvartiry/`;
- МФО: `/zajmy/mfo/`, отдельные страницы предложений вида `/zaym-{company}/`;
- контент: отзывы, вопросы, новости о займах.

Типовая страница:

- H1 и короткое вступление;
- табы по готовым решениям;
- фильтры;
- список офферов;
- раскрытия в карточке: ПСК, ставка, срок, сумма, решение, залог, способы получения, документы, возраст, кредитная история, подтверждение личности;
- FAQ;
- блок "Готовые решения";
- отзывы, вопросы и новости.

Что брать:

- подробность карточек офферов;
- табы/готовые решения как навигацию;
- связку коммерческой страницы с отзывами, вопросами и новостями;
- отдельный калькулятор.

Что не копировать:

- агрессивные обещания `без отказа`, `100% одобрение`, `абсолютно всем`;
- чрезмерно длинную сетку сумм, сроков и аудиторий до появления данных.

## Структурный стандарт для CreditJoy

Это не шаблон страницы, не wireframe и не ТЗ на контент. Это набор структурных слоев, которые рынок считает обязательными для коммерческого раздела займов. Шаблоны страниц будем проектировать позже, после карты продукта и MVP-слагов.

### Продуктовый хаб

- H1 и короткий сценарий выбора.
- Быстрый подбор: сумма, срок, способ получения, тип клиента.
- Список предложений.
- Основные интенты.
- Гео-входы.
- Блок доверия: ЦБ, лицензии, ПСК, платные услуги.
- FAQ, отзывы, блог/новости.

### Продукт + интент

- H1 под интент.
- Офферы, отфильтрованные под сценарий.
- Условия и риски именно этого интента.
- FAQ по интенту.
- Соседние интенты и города.
- Ссылки на карточки МФО.

### Продукт + город

- H1 с городом.
- Офферы, доступные в городе.
- Локальные МФО/офисы, если есть.
- Локальный FAQ.
- Ссылки на сильные интенты в этом городе.

### Карточка МФО/компании

- Название, тип, лицензия, реестр.
- Условия займов: сумма, срок, ставка, ПСК.
- Способы получения и погашения.
- Подписки, комиссии, страховки.
- Отзывы и рейтинг.
- Связанные интенты и города.

## Вывод для пункта 4

Рыночный стандарт уже понятен: структура не требует изобретения. Улучшения CreditJoy должны быть не в странной архитектуре, а в качестве данных и полезности страниц:

- явно показывать ПСК, подписки, страховки и комиссии;
- не обещать то, что нельзя гарантировать;
- объединять алиасы в канонические страницы;
- делать гео только с локальной пользой;
- связывать офферы, МФО, отзывы, FAQ, новости и справочные материалы в одну систему.

## Источники

- https://www.sravni.ru/zaimy/
- https://www.sravni.ru/zaimy/moskva/
- https://www.sravni.ru/zaimy/pod-pts/
- https://www.sravni.ru/zaimy/bez-otkaza/
- https://www.sravni.ru/zaimy/na-kartu-onlain/
- https://bankiros.ru/zaymy
- https://bankiros.ru/sitemap-zaymy.xml
- https://bankiros.ru/zaymy/online
- https://bankiros.ru/zaymy/pod-zalog-pts
- https://bankiros.ru/zaymy/bez-podpisok
- https://www.banki.ru/microloans/
- https://www.banki.ru/microloans/catalogue/zaym_na_kartu/
- https://www.banki.ru/microloans/catalogue/zaymyi_na_kartu_po_vsey_rossii/
- https://www.banki.ru/microloans/catalogue/byistryie_zaymyi/
- https://www.banki.ru/microloans/catalogue/besprotsentnyiy_zaym/
- https://www.banki.ru/microloans/catalogue/zaymy_pod_zalog_dokumentov/
- https://www.banki.ru/microloans/catalogue/zaymyi_s_plohoy_kreditnoy_istoriey/kazan~/
- https://finuslugi.ru/sitemap
- https://finuslugi.ru/mikrozajmy
- https://finuslugi.ru/mikrozajmy/teg_bez_procentov
- https://finuslugi.ru/mikrozajmy/teg_onlajn_na_kartu
- https://finuslugi.ru/mikrozajmy/teg_pod_zalog_pts
- https://finuslugi.ru/mikrozajmy/reg_moskva
- https://brobank.ru/zajmy/online/
- https://brobank.ru/zajmy/na-kartu/
- https://brobank.ru/zajmy/pod-zalog-pts/
- https://brobank.ru/zajmy/calculator/
