import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "data", "processed");
const bucketDir = path.join(outputDir, "buckets");

const sourceFiles = [
  {
    id: "zaim",
    label: "займ",
    file: "data/raw/wordcraft/wordcraft-zaim.xlsx",
  },
  {
    id: "microzaim",
    label: "микрозайм",
    file: "data/raw/wordcraft/wordcraft-microzaim.xlsx",
  },
  {
    id: "microcredit",
    label: "микрокредит",
    file: "data/raw/wordcraft/wordcraft-microcredit.xlsx",
  },
].map((source) => ({
  ...source,
  path: path.join(projectRoot, source.file),
}));

const difficultyRank = {
  NO_DATA: 0,
  LOW: 1,
  AVERAGE: 2,
  HIGH: 3,
};

const cities = [
  ["moskva", /(^|\s)(москва|москве|москвы|мск)(\s|$)/],
  ["sankt-peterburg", /(санкт[- ]петербург|петербург|спб|питер)/],
  ["novosibirsk", /новосибирск/],
  ["ekaterinburg", /екатеринбург/],
  ["kazan", /казан/],
  ["nizhniy-novgorod", /нижн(ий|ем|его) новгород/],
  ["chelyabinsk", /челябинск/],
  ["samara", /самар/],
  ["ufa", /(^|\s)уфа|уфе|уфы(\s|$)/],
  ["rostov-na-donu", /ростов(а)?[- ]на[- ]дону|ростов/],
  ["krasnodar", /краснодар/],
  ["krasnoyarsk", /красноярск/],
  ["perm", /(^|\s)перм(ь|и|ский)?(\s|$)/],
  ["voronezh", /воронеж/],
  ["volgograd", /волгоград/],
  ["omsk", /(^|\s)омск|омске|омска(\s|$)/],
  ["saratov", /саратов/],
  ["tyumen", /тюмен/],
  ["tolyatti", /тольятти/],
  ["izhevsk", /ижевск/],
  ["almaty", /алмат|алма[- ]аты/],
  ["minsk", /минск/],
];

const brandPatterns = [
  /юкк?и|ykky/,
  /привет сосед|privsosed/,
  /корона займ|золотая корона|korona/,
  /займ мобайл|zaim mobile/,
  /лайк ?займ|лайк ?мани|like ?money/,
  /папа ?займ|papa ?zaim/,
  /дополучкино|dopoluchk/,
  /бюджет ?займ|budget/,
  /бережн(ый|ыи)|beregny/,
  /каширо|cashiro/,
  /бери ?беру|beriberu/,
  /белые деньги|beliedengi/,
  /целевые финансы/,
  /бум ?займ/,
  /давака|davaka/,
  /деньги на дом|denginadom/,
  /кит кредит/,
  /скб финанс/,
  /пробаланс/,
  /эко ?займ|ecozaym/,
  /надо денег|nadodeneg/,
  /возьмика/,
  /деньги ок|dengi ok/,
  /рейзор/,
  /простой вопрос/,
  /рокетмен|rocketman/,
  /рублион/,
  /свои люди/,
  /digicash|digii ?cash|диги ?кэш/,
  /конга/,
  /апельсинка/,
  /хурма|hurma/,
  /кредиттер|creditter/,
  /честное слово/,
  /пчелка/,
  /эква ?займ|eqzaim|eqcredit/,
  /кэш ?магнит|cashmagnit/,
  /кубышка/,
  /монеза|moneza/,
  /умн(ый|ые) наличн|умный займ/,
  /кальмия/,
  /финмолл/,
  /микро ?резерв|mrezerv/,
  /гранат/,
  /фридом|freedom/,
  /tez ?bol|тез ?бол/,
  /сисилоун|ciciloan/,
  /тенгебай|teng(e|i)bai/,
  /hava|хава/,
  /solva|солва/,
  /koke|коке/,
  /gmoney/,
  /ccloan/,
  /7pay/,
  /payda/,
  /kengo|кенго/,
  /akshamat|акшамат/,
  /turbomoney|турбомани/,
  /dengiclick/,
  /cashbee/,
  /kreditkassa/,
  /mfo-zaim/,
  /mfo zaim/,
  /sobrano|собрано|soberano/,
  /definance/,
  /лайм ?займ|lime ?zaim/,
  /веб ?займ|web ?zaim|webbankir|веббанкир/,
  /турбо ?займ|turbozaim/,
  /добро ?займ|dobrozaim|доброщайм/,
  /квику|kviku|квики/,
  /капуста|екапуста|е капуста|ekapusta/,
  /займер|zaimer|zaymer/,
  /манимен|moneyman|money ?man/,
  /миг ?кредит|migcredit/,
  /быстро ?деньги|bistrodengi/,
  /деньга|denga/,
  /срочно ?деньги|srochnodengi/,
  /смс ?финанс|smsfinance/,
  /аденьги|а деньги/,
  /boostra|бустра/,
  /platiza|платиза/,
  /vivus|вивус/,
  /belka ?credit|белка ?кредит/,
  /zaymigo|займиго/,
  /joy ?money|джой ?мани/,
  /credit ?plus|кредит ?плюс/,
  /credit7|кредит7/,
  /cashiro|cash ?to ?you|cashtoyou/,
  /one ?click ?money|oneclickmoney/,
  /greenmoney|грин ?мани/,
  /capitalina|капиталина/,
  /car ?money|carmoney|кармани/,
  /nebus|небус/,
  /beriberu|бериберу/,
  /ezaem|е заем|е ?заем/,
  /pay ?p\.?s\.?|payps/,
  /кредиска|krediska/,
  /495 ?кредит|495credit/,
  /финтерра|finterra/,
  /до ?зарплаты\.?ком|dozarplati/,
  /яндекс|сбер|альфа|тинькофф|т-банк|совкомбанк|втб|газпромбанк|озон/,
];

const noisePattern =
  /t_me_|choosingbestloan|microcreditor|creditulka|xn--|https?:|(^|\s)t\.me(\s|$)|телеграм|telegram|\.ru|\.com|\.by|\.kz|\.uz|\.su|\.net|\.org|sravni|bankiros|banki|finuslugi|myfin|выберу|vbr|your[- ]?loans|be\$|zanimator|rsb24|24рсб|creditom|promo|промокод|промокоды/i;

const informationalPattern =
  /(^|\s)(как|что|можно ли|почему|зачем|какие|какой|куда|если|могут ли)(\s|$)|договор|образец|закон|коллектор|должник|не платить|не отдавать|не вернуть|не выплачивать|платить нечем|долг|долги|задолж|списать|списание|банкрот|проверить|проверка|узнать|посмотреть|закрыть|закрытие|отменить|избавиться|мошен|песня|отпис|удалить|жалоб|суд|алименты|инвестировать|открыть мфо|открыть микрозайм|партнерк|партнерская|реестр|цб|официальный сайт|облигац|материнск.*капитал|между физическими лицами/i;

function normalizeQuery(value) {
  return String(value ?? "")
    .toLocaleLowerCase("ru-RU")
    .replace(/ё/g, "е")
    .replace(/[«»“”"'`]/g, " ")
    .replace(/[()[\]{}]/g, " ")
    .replace(/[_]+/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n\r;]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(rows, columns) {
  const lines = [columns.join(",")];
  for (const row of rows) {
    lines.push(columns.map((column) => csvEscape(row[column])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function rowsFromValues(values) {
  const [headers, ...rows] = values;
  return rows
    .filter((row) => row.some((value) => value !== null && value !== undefined && value !== ""))
    .map((row) => Object.fromEntries(headers.map((header, index) => [String(header), row[index]])));
}

async function loadWorkbookRows(source) {
  const input = await FileBlob.load(source.path);
  const workbook = await SpreadsheetFile.importXlsx(input);
  const sheets = await workbook.inspect({
    kind: "sheet",
    include: "name,address",
    maxChars: 4000,
  });

  const queryRows = [];
  const tableStats = {};

  for (const line of sheets.ndjson.split("\n").filter(Boolean)) {
    const sheet = JSON.parse(line);
    tableStats[sheet.name] = sheet.range;
    if (!["Queries", "AdditionalQueries"].includes(sheet.name)) continue;

    const worksheet = workbook.worksheets.getItem(sheet.name);
    const rows = rowsFromValues(worksheet.getRange(sheet.range).values);
    for (const row of rows) {
      const query = String(row.query ?? "").trim();
      if (!query) continue;
      queryRows.push({
        query,
        normalizedQuery: normalizeQuery(query),
        clicks: Number(row.clicks) || 0,
        demand: Number(row.demand) || 0,
        competitiveness: String(row.competitiveness || "NO_DATA"),
        sourceFile: source.id,
        sourceSheet: sheet.name,
      });
    }
  }

  return {
    source,
    tableStats,
    queryRows,
  };
}

function mergeQueries(inputRows) {
  const map = new Map();
  for (const row of inputRows) {
    if (!row.normalizedQuery) continue;
    const current =
      map.get(row.normalizedQuery) ??
      {
        query: row.query,
        normalizedQuery: row.normalizedQuery,
        variants: new Set(),
        sources: new Set(),
        sourceSheets: new Set(),
        clicks: 0,
        demand: 0,
        competitivenessSet: new Set(),
        sourceRows: [],
      };

    current.variants.add(row.query);
    current.sources.add(row.sourceFile);
    current.sourceSheets.add(`${row.sourceFile}:${row.sourceSheet}`);
    current.clicks = Math.max(current.clicks, row.clicks);
    current.demand = Math.max(current.demand, row.demand);
    current.competitivenessSet.add(row.competitiveness);
    current.sourceRows.push({
      sourceFile: row.sourceFile,
      sourceSheet: row.sourceSheet,
      clicks: row.clicks,
      demand: row.demand,
      competitiveness: row.competitiveness,
    });

    if (row.clicks > current.clicks || row.demand > current.demand) {
      current.query = row.query;
    }
    map.set(row.normalizedQuery, current);
  }

  return [...map.values()].map((record) => {
    const levels = [...record.competitivenessSet];
    const maxCompetitiveness = levels.sort(
      (a, b) => (difficultyRank[b] ?? 0) - (difficultyRank[a] ?? 0),
    )[0];
    return {
      ...record,
      variants: [...record.variants],
      sources: [...record.sources].sort(),
      sourceSheets: [...record.sourceSheets].sort(),
      competitiveness: maxCompetitiveness || "NO_DATA",
      competitivenessSet: [...record.competitivenessSet].sort(),
    };
  });
}

function getSignals(q) {
  const signalMap = {
    online: /онлайн|online/.test(q),
    onCard: /на карту|карт[уы]|банковск.*карт/.test(q),
    noRefusal: /без отказ|безотказ|100 ?%|100 процент|всем|одобрен|одобрение|одобряют/.test(q),
    noInterest: /без процент|беспроцент|бесплат|0 ?%|под 0/.test(q),
    firstFree: /перв(ый|ого|ом).*(без процент|бесплат|0 ?%)|нов(ым|ые|ых).*без процент/.test(q),
    badCredit: /плох.*(кредит|ки|истор)|кредитн.*истор|просроч/.test(q),
    instant: /сроч|быстр|мгнов|моментальн|экспресс/.test(q),
    roundClock: /круглосуточ|24\/7|24 часа|ночью/.test(q),
    noChecks: /без провер|не провер/.test(q),
    noDocs: /без справ|без документ|по паспорту|паспорт/.test(q),
    passport: /паспорт/.test(q),
    noPhoto: /без фото|без селфи|без фотограф/.test(q),
    noPassport: /без паспорта/.test(q),
    noCard: /без карты/.test(q),
    noPhone: /без телефона|без звонк/.test(q),
    cash: /наличн/.test(q),
    wallet: /кошелек|киви|qiwi|юмани|yoomoney|юmoney/.test(q),
    account: /на счет|на счeт|банковск.*счет/.test(q),
    collateralPts: /птс|залог птс/.test(q),
    collateralAuto: /залог авто|залог автомобиля|залог машины|автоломбард/.test(q),
    payday: /до зарплат|до зп/.test(q),
    longTerm: /долгоср|на год|на 12 месяц|на полгода|на 6 месяц/.test(q),
    newLoans: /новые|новый|новых|новинка/.test(q),
    gosuslugi: /госуслуг/.test(q),
    noPaidServices: /без платн|без подпис|подписк|дополнительн.*услуг/.test(q),
    refinance: /рефинанс/.test(q),
    rating: /топ|рейтинг|лучшие|лучший|список|подбор|где лучше|какой.*лучше/.test(q),
    reviews: /отзыв/.test(q),
    calculator: /калькулятор|рассчитать|расчет/.test(q),
    mfo: /мфо|мкк|мфк|микрофинанс/.test(q),
    microcredit: /микрокредит|микро кредит/.test(q),
    microloan: /микрозайм|микро займ/.test(q),
    loan: /займ|заим|займы|заем/.test(q),
  };

  const amount = q.match(/(?:^|\s)(\d[\d\s]{0,8})(?:\s?)(?:руб|р\b|₽)/);
  if (amount) {
    signalMap.amount = amount[1].replace(/\s+/g, "");
  }

  if (/1000|1 000/.test(q)) signalMap.amount = signalMap.amount || "1000";
  if (/3000|3 000/.test(q)) signalMap.amount = signalMap.amount || "3000";
  if (/5000|5 000/.test(q)) signalMap.amount = signalMap.amount || "5000";
  if (/10000|10 000/.test(q)) signalMap.amount = signalMap.amount || "10000";
  if (/30000|30 000/.test(q)) signalMap.amount = signalMap.amount || "30000";
  if (/50000|50 000/.test(q)) signalMap.amount = signalMap.amount || "50000";
  if (/100000|100 000/.test(q)) signalMap.amount = signalMap.amount || "100000";

  if (/на месяц|30 дней|на 30/.test(q)) signalMap.term = "30-days";
  else if (/14 дней|на 14/.test(q)) signalMap.term = "14-days";
  else if (/7 дней|на 7/.test(q)) signalMap.term = "7-days";
  else if (/на год|12 месяц/.test(q)) signalMap.term = "1-year";

  if (/18 лет|с 18/.test(q)) signalMap.audience = "18-plus";
  else if (/студент/.test(q)) signalMap.audience = "students";
  else if (/пенсион/.test(q)) signalMap.audience = "pensioners";
  else if (/безработ|без работы|неработа/.test(q)) signalMap.audience = "unemployed";

  const city = cities.find(([, pattern]) => pattern.test(q));
  if (city) signalMap.city = city[0];

  return signalMap;
}

function activeSignals(signals) {
  return Object.entries(signals)
    .filter(([, value]) => value)
    .map(([key, value]) => (value === true ? key : `${key}:${value}`));
}

function page(slug, name, pageType = "commercial", priority = "medium", notes = "") {
  return { bucket: "page", slug, name, pageType, priority, notes };
}

function support(slug, name, priority = "medium", notes = "") {
  return { bucket: "support", slug, name, pageType: "support", priority, notes };
}

function withCity(base, city) {
  if (!city) return base;
  const slug = base.slug.replace(/\/$/, `/${city}/`);
  return {
    ...base,
    slug,
    name: `${base.name} (${city})`,
    pageType: `${base.pageType}:geo`,
    notes: [base.notes, "Гео-страница: проверить спрос и выдачу по городу."].filter(Boolean).join(" "),
  };
}

function assignRecord(record) {
  const q = record.normalizedQuery;
  const signals = getSignals(q);
  const signalList = activeSignals(signals);
  const isRelevant =
    signals.loan ||
    signals.microloan ||
    signals.microcredit ||
    signals.mfo ||
    signals.payday ||
    signals.collateralAuto ||
    signals.collateralPts;

  if (!isRelevant) {
    return {
      bucket: "review-needed",
      slug: "",
      name: "",
      pageType: "",
      priority: "low",
      notes: "Неочевидная релевантность к займам.",
      signals: signalList,
    };
  }

  if (noisePattern.test(q)) {
    return {
      bucket: "noise",
      slug: "",
      name: "",
      pageType: "",
      priority: "exclude",
      notes: "Технический/паразитный хвост: домен, Telegram, промокод или внешняя сущность.",
      signals: signalList,
    };
  }

  const hasBrand = brandPatterns.some((pattern) => pattern.test(q));

  if (
    /личн.*кабинет|(^|\s)(вход|войти|регистрация|логин)(\s|$)|погасить|оплатить|оплата займа|продлить займ/.test(q) ||
    (/личн/.test(q) && hasBrand)
  ) {
    return {
      bucket: "account",
      slug: "",
      name: "",
      pageType: "",
      priority: "exclude",
      notes: "Навигационный/сервисный запрос, не посадочная коммерческая страница.",
      signals: signalList,
    };
  }

  if (hasBrand) {
    return {
      bucket: "brand",
      slug: "",
      name: "",
      pageType: "",
      priority: "separate",
      notes: "Брендовый запрос МФО/банка. Лучше держать отдельно от небрендовой коммерческой семантики.",
      signals: signalList,
    };
  }

  if (signals.refinance) {
    return {
      ...support(
        "/zaimy/refinansirovanie-mikrozaymov/",
        "Рефинансирование микрозаймов",
        "medium",
        "Спорный, но отдельный спрос. Нужна продуктовая проверка.",
      ),
      signals: signalList,
    };
  }

  if (signals.reviews) {
    return {
      ...support("/reviews/mfo/", "Отзывы о МФО", "medium", "UGC/support слой, не основной коммерческий листинг."),
      signals: signalList,
    };
  }

  if (signals.calculator) {
    return {
      ...support("/calculators/zaim/", "Калькулятор займа", "medium", "Сервисная страница и перелинковка."),
      signals: signalList,
    };
  }

  if (signals.rating) {
    return {
      ...support("/zaimy/top/", "Лучшие займы и рейтинг МФО", "high", "Коммерческо-support листинг: рейтинг/топ/подбор."),
      signals: signalList,
    };
  }

  if (informationalPattern.test(q)) {
    return {
      bucket: "informational",
      slug: "",
      name: "",
      pageType: "",
      priority: "separate",
      notes: "Информационный/юридический/долговой запрос. Не смешивать с коммерческими алиасами.",
      signals: signalList,
    };
  }

  let result;
  if (signals.noPaidServices) {
    result = page("/zaimy/bez-platnyh-uslug-i-podpisok/", "Займы без платных услуг и подписок", "commercial", "high");
  } else if (signals.gosuslugi && signals.onCard && signals.noRefusal) {
    result = page(
      "/zaimy/cherez-gosuslugi-na-kartu-bez-otkaza/",
      "Займы через Госуслуги на карту без отказа",
      "commercial:compound",
      "medium",
    );
  } else if (signals.gosuslugi && signals.onCard) {
    result = page("/zaimy/cherez-gosuslugi-na-kartu/", "Займы через Госуслуги на карту", "commercial:compound", "medium");
  } else if (signals.gosuslugi) {
    result = page("/zaimy/cherez-gosuslugi/", "Займы через Госуслуги", "commercial", "medium");
  } else if (signals.collateralPts) {
    result = page("/zaimy/pod-zalog-pts/", "Займы под залог ПТС", "commercial", "medium");
  } else if (signals.collateralAuto) {
    result = page("/zaimy/pod-zalog-avto/", "Займы под залог автомобиля", "commercial", "medium");
  } else if (signals.badCredit && signals.noRefusal && signals.onCard) {
    result = page(
      "/zaimy/na-kartu-s-plohoy-kreditnoy-istoriey-bez-otkaza/",
      "Займы на карту с плохой кредитной историей без отказа",
      "commercial:compound",
      "high",
    );
  } else if (signals.badCredit && signals.onCard) {
    result = page(
      "/zaimy/na-kartu-s-plohoy-kreditnoy-istoriey/",
      "Займы на карту с плохой кредитной историей",
      "commercial:compound",
      "high",
    );
  } else if (signals.badCredit && signals.noRefusal) {
    result = page(
      "/zaimy/s-plohoy-kreditnoy-istoriey-bez-otkaza/",
      "Займы с плохой кредитной историей без отказа",
      "commercial:compound",
      "high",
    );
  } else if (signals.badCredit) {
    result = page("/zaimy/s-plohoy-kreditnoy-istoriey/", "Займы с плохой кредитной историей", "commercial", "high");
  } else if (signals.noChecks && signals.noRefusal && signals.onCard && signals.instant) {
    result = page(
      "/zaimy/na-kartu-bez-otkaza-bez-proverok-mgnovenno/",
      "Займы на карту без отказа и проверок мгновенно",
      "commercial:compound",
      "high",
      "Высокорисковая формулировка: нужна юридически мягкая подача.",
    );
  } else if (signals.noChecks && signals.onCard) {
    result = page(
      "/zaimy/na-kartu-bez-proverok/",
      "Займы на карту без проверок",
      "commercial:compound",
      "medium",
      "Нужна осторожная формулировка, без обещаний.",
    );
  } else if (signals.noChecks) {
    result = page("/zaimy/bez-proverok/", "Займы без проверок", "commercial", "medium", "Нужна осторожная формулировка.");
  } else if (signals.noRefusal && signals.onCard) {
    result = page(
      "/zaimy/na-kartu-bez-otkaza/",
      "Займы на карту без отказа",
      "commercial:compound",
      "high",
      "Формулировку 'без отказа' использовать аккуратно.",
    );
  } else if (signals.noRefusal) {
    result = page("/zaimy/bez-otkaza/", "Займы без отказа", "commercial", "high", "Формулировку использовать аккуратно.");
  } else if (signals.firstFree && signals.onCard) {
    result = page("/zaimy/pervyy-bez-procentov-na-kartu/", "Первый займ без процентов на карту", "commercial:compound", "high");
  } else if (signals.noInterest && signals.term === "30-days") {
    result = page("/zaimy/bez-procentov-na-30-dney/", "Займы без процентов на 30 дней", "commercial:compound", "medium");
  } else if (signals.noInterest && signals.onCard) {
    result = page("/zaimy/na-kartu-bez-procentov/", "Займы на карту без процентов", "commercial:compound", "high");
  } else if (signals.noInterest) {
    result = page("/zaimy/bez-procentov/", "Займы без процентов", "commercial", "high");
  } else if (signals.roundClock && signals.onCard) {
    result = page("/zaimy/na-kartu-kruglosutochno/", "Займы на карту круглосуточно", "commercial:compound", "medium");
  } else if (signals.roundClock) {
    result = page("/zaimy/kruglosutochno/", "Круглосуточные займы", "commercial", "medium");
  } else if (signals.instant && signals.onCard) {
    result = page("/zaimy/srochno-na-kartu/", "Срочные займы на карту", "commercial:compound", "high");
  } else if (signals.instant) {
    result = page("/zaimy/srochno/", "Срочные займы", "commercial", "high");
  } else if (signals.passport && signals.onCard) {
    result = page("/zaimy/po-pasportu-na-kartu/", "Займы по паспорту на карту", "commercial:compound", "medium");
  } else if (signals.passport) {
    result = page("/zaimy/po-pasportu/", "Займы по паспорту", "commercial", "medium");
  } else if (signals.noPhoto) {
    result = page("/zaimy/bez-foto/", "Займы без фото", "commercial", "low", "Спорная страница: проверить качество выдачи и легальность обещаний.");
  } else if (signals.noPassport) {
    result = page("/zaimy/bez-pasporta/", "Займы без паспорта", "commercial", "low", "Спорная страница: возможно инфо/отказ от обещаний.");
  } else if (signals.noCard) {
    result = page("/zaimy/bez-karty/", "Займы без карты", "commercial", "medium");
  } else if (signals.noPhone) {
    result = page("/zaimy/bez-telefonnyh-zvonkov/", "Займы без звонков", "commercial", "low");
  } else if (signals.cash) {
    result = page("/zaimy/nalichnymi/", "Займы наличными", "commercial", "medium");
  } else if (signals.wallet) {
    result = page("/zaimy/na-elektronnyy-koshelek/", "Займы на электронный кошелек", "commercial", "low");
  } else if (signals.account) {
    result = page("/zaimy/na-schet/", "Займы на банковский счет", "commercial", "low");
  } else if (signals.payday) {
    result = page("/zaimy/do-zarplaty/", "Займы до зарплаты", "commercial", "medium");
  } else if (signals.audience === "18-plus") {
    result = page("/zaimy/s-18-let/", "Займы с 18 лет", "commercial", "medium");
  } else if (signals.audience === "students") {
    result = page("/zaimy/studentam/", "Займы студентам", "commercial", "medium");
  } else if (signals.audience === "pensioners") {
    result = page("/zaimy/pensioneram/", "Займы пенсионерам", "commercial", "medium");
  } else if (signals.audience === "unemployed") {
    result = page("/zaimy/bezrabotnym/", "Займы безработным", "commercial", "medium");
  } else if (signals.longTerm) {
    result = page("/zaimy/dolgosrochnye/", "Долгосрочные займы", "commercial", "medium");
  } else if (signals.newLoans) {
    result = page("/zaimy/novye/", "Новые займы", "commercial", "medium");
  } else if (signals.amount) {
    result = page(`/zaimy/${signals.amount}-rubley/`, `Займы ${signals.amount} рублей`, "commercial:amount", "low");
  } else if (signals.term === "30-days") {
    result = page("/zaimy/na-30-dney/", "Займы на 30 дней", "commercial:term", "medium");
  } else if (signals.term === "14-days") {
    result = page("/zaimy/na-14-dney/", "Займы на 14 дней", "commercial:term", "low");
  } else if (signals.term === "7-days") {
    result = page("/zaimy/na-7-dney/", "Займы на 7 дней", "commercial:term", "low");
  } else if (signals.onCard) {
    result = page("/zaimy/na-kartu/", "Займы на карту", "commercial", "high");
  } else if (signals.online) {
    result = page("/zaimy/online/", "Займы онлайн", "commercial", "high");
  } else if (signals.microcredit && !signals.loan && !signals.microloan) {
    result = page(
      "/mikrokredity/",
      "Микрокредиты",
      "commercial:review",
      "medium",
      "Проверить: делать отдельной страницей или алиасом к займам/микрозаймам.",
    );
  } else {
    result = page("/zaimy/", "Займы и микрозаймы", "commercial", "high");
  }

  const geoResult = withCity(result, signals.city);
  return {
    ...geoResult,
    signals: signalList,
  };
}

function priorityScore(priority) {
  return { high: 3, medium: 2, low: 1, separate: 1, exclude: 0 }[priority] ?? 0;
}

function sortQueries(records) {
  return [...records].sort((a, b) => b.clicks - a.clicks || b.demand - a.demand || a.query.localeCompare(b.query, "ru"));
}

function buildPageRows(records) {
  const groups = new Map();
  for (const record of records.filter((item) => ["page", "support"].includes(item.bucket))) {
    const key = record.pageSlug;
    const current =
      groups.get(key) ??
      {
        page_slug: record.pageSlug,
        page_name: record.pageName,
        page_type: record.pageType,
        priority: record.priority,
        query_count: 0,
        total_clicks: 0,
        total_demand: 0,
        primary_query: "",
        alias_queries: "",
        sample_queries: "",
        signals: new Set(),
        notes: new Set(),
        queries: [],
      };

    current.query_count += 1;
    current.total_clicks += record.clicks;
    current.total_demand += record.demand;
    current.priority =
      priorityScore(record.priority) > priorityScore(current.priority) ? record.priority : current.priority;
    for (const signal of String(record.signals).split(";").filter(Boolean)) current.signals.add(signal);
    if (record.notes) current.notes.add(record.notes);
    current.queries.push(record);
    groups.set(key, current);
  }

  return [...groups.values()]
    .map((group) => {
      const sorted = sortQueries(group.queries);
      const aliases = sorted.map((item) => item.query);
      return {
        page_slug: group.page_slug,
        page_name: group.page_name,
        page_type: group.page_type,
        priority: group.priority,
        query_count: group.query_count,
        total_clicks: group.total_clicks,
        total_demand: group.total_demand,
        primary_query: aliases[0] ?? "",
        alias_queries: aliases.join("; "),
        sample_queries: aliases.slice(0, 12).join("; "),
        signals: [...group.signals].sort().join(";"),
        notes: [...group.notes].join(" "),
        queries: sorted,
      };
    })
    .sort((a, b) => b.total_clicks - a.total_clicks || b.query_count - a.query_count);
}

function buildMarkdownSummary({ sourceSummaries, allRecords, pageRows, bucketCounts, signalStats }) {
  const topPages = pageRows.slice(0, 25);
  const topSignals = [...signalStats.values()].sort((a, b) => b.clicks - a.clicks).slice(0, 20);
  const totalUnique = allRecords.length;
  const totalClicks = allRecords.reduce((sum, row) => sum + row.clicks, 0);
  const totalDemand = allRecords.reduce((sum, row) => sum + row.demand, 0);

  const lines = [
    "# Keyword Processing Summary",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Method",
    "",
    "- Read `Queries` and `AdditionalQueries` from each Wordcraft workbook.",
    "- Ignored the original `cluster` column completely.",
    "- Deduplicated by normalized query text.",
    "- For duplicate queries across files, kept the maximum `clicks` and maximum `demand` instead of summing them.",
    "- Assigned queries to draft future pages by rule-based intent signals; this is a working draft for human review.",
    "",
    "## Source Files",
    "",
    "| Source | Rows read | Sheets |",
    "| --- | ---: | --- |",
    ...sourceSummaries.map(
      (source) =>
        `| ${source.label} | ${source.queryRows} | ${Object.entries(source.tableStats)
          .map(([name, range]) => `${name} ${range}`)
          .join("<br>")} |`,
    ),
    "",
    "## Overall",
    "",
    `- Unique queries: ${totalUnique.toLocaleString("ru-RU")}`,
    `- Max-click total across unique queries: ${totalClicks.toLocaleString("ru-RU")}`,
    `- Max-demand total across unique queries: ${totalDemand.toLocaleString("ru-RU")}`,
    "",
    "## Buckets",
    "",
    "| Bucket | Queries | Clicks | Demand |",
    "| --- | ---: | ---: | ---: |",
    ...Object.values(bucketCounts)
      .sort((a, b) => b.clicks - a.clicks)
      .map(
        (bucket) =>
          `| ${bucket.bucket} | ${bucket.count.toLocaleString("ru-RU")} | ${bucket.clicks.toLocaleString("ru-RU")} | ${bucket.demand.toLocaleString("ru-RU")} |`,
      ),
    "",
    "## Top Draft Pages",
    "",
    "| Page | Type | Queries | Clicks | Demand | Primary query |",
    "| --- | --- | ---: | ---: | ---: | --- |",
    ...topPages.map(
      (pageRow) =>
        `| ${pageRow.page_slug} | ${pageRow.page_type} | ${pageRow.query_count.toLocaleString("ru-RU")} | ${pageRow.total_clicks.toLocaleString("ru-RU")} | ${pageRow.total_demand.toLocaleString("ru-RU")} | ${pageRow.primary_query} |`,
    ),
    "",
    "## Strong Signals",
    "",
    "| Signal | Queries | Clicks | Demand |",
    "| --- | ---: | ---: | ---: |",
    ...topSignals.map(
      (signal) =>
        `| ${signal.signal} | ${signal.count.toLocaleString("ru-RU")} | ${signal.clicks.toLocaleString("ru-RU")} | ${signal.demand.toLocaleString("ru-RU")} |`,
    ),
    "",
    "## Files",
    "",
    "- `all-keywords.csv` - every unique query with assigned bucket/page.",
    "- `page-candidates.csv` - draft future commercial/support pages with aliases.",
    "- `page-aliases.json` - full page -> query alias map.",
    "- `buckets/*.csv` - excluded/separate buckets for review.",
    "",
    "## Review Notes",
    "",
    "- `brand`, `account`, and `noise` are intentionally not mixed into commercial pages.",
    "- `support` contains top/rating/reviews/calculator/refinancing pages that can still be useful for SEO and trust.",
    "- `microcredit` queries are mostly treated as aliases into the same loan intent unless the query is purely `микрокредит`; those go to `/mikrokredity/` for manual review.",
    "- Pages with wording like `без отказа`, `без проверок`, `100% одобрение` need careful legal and UX wording.",
    "",
  ];

  return `${lines.join("\n")}\n`;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(bucketDir, { recursive: true });

  const loaded = [];
  for (const source of sourceFiles) {
    loaded.push(await loadWorkbookRows(source));
  }

  const rawRows = loaded.flatMap((item) => item.queryRows);
  const merged = mergeQueries(rawRows);

  const records = merged.map((record) => {
    const assignment = assignRecord(record);
    return {
      query: record.query,
      normalized_query: record.normalizedQuery,
      variants: record.variants.join("; "),
      clicks: record.clicks,
      demand: record.demand,
      competitiveness: record.competitiveness,
      competitiveness_set: record.competitivenessSet.join(";"),
      sources: record.sources.join(";"),
      source_sheets: record.sourceSheets.join(";"),
      bucket: assignment.bucket,
      page_slug: assignment.slug,
      page_name: assignment.name,
      page_type: assignment.pageType,
      priority: assignment.priority,
      signals: assignment.signals.join(";"),
      notes: assignment.notes,
      pageSlug: assignment.slug,
      pageName: assignment.name,
      pageType: assignment.pageType,
    };
  });

  const sortedRecords = sortQueries(records);
  const pageRows = buildPageRows(sortedRecords);

  const bucketCounts = {};
  for (const record of sortedRecords) {
    const bucket =
      bucketCounts[record.bucket] ??
      {
        bucket: record.bucket,
        count: 0,
        clicks: 0,
        demand: 0,
      };
    bucket.count += 1;
    bucket.clicks += record.clicks;
    bucket.demand += record.demand;
    bucketCounts[record.bucket] = bucket;
  }

  const signalStats = new Map();
  for (const record of sortedRecords) {
    for (const signal of String(record.signals).split(";").filter(Boolean)) {
      const current = signalStats.get(signal) ?? { signal, count: 0, clicks: 0, demand: 0 };
      current.count += 1;
      current.clicks += record.clicks;
      current.demand += record.demand;
      signalStats.set(signal, current);
    }
  }

  const allColumns = [
    "query",
    "normalized_query",
    "variants",
    "clicks",
    "demand",
    "competitiveness",
    "competitiveness_set",
    "sources",
    "source_sheets",
    "bucket",
    "page_slug",
    "page_name",
    "page_type",
    "priority",
    "signals",
    "notes",
  ];
  await fs.writeFile(path.join(outputDir, "all-keywords.csv"), toCsv(sortedRecords, allColumns), "utf8");

  const pageColumns = [
    "page_slug",
    "page_name",
    "page_type",
    "priority",
    "query_count",
    "total_clicks",
    "total_demand",
    "primary_query",
    "alias_queries",
    "sample_queries",
    "signals",
    "notes",
  ];
  await fs.writeFile(path.join(outputDir, "page-candidates.csv"), toCsv(pageRows, pageColumns), "utf8");

  const aliases = {
    generatedAt: new Date().toISOString(),
    method: {
      sourceClusterColumn: "ignored",
      duplicateMetricPolicy: "max clicks/demand per normalized query",
      classification: "rule-based draft for manual review",
    },
    sourceFiles: sourceFiles.map(({ id, label, file }) => ({ id, label, file })),
    pages: pageRows.map((pageRow) => ({
      slug: pageRow.page_slug,
      name: pageRow.page_name,
      type: pageRow.page_type,
      priority: pageRow.priority,
      queryCount: pageRow.query_count,
      totalClicks: pageRow.total_clicks,
      totalDemand: pageRow.total_demand,
      primaryQuery: pageRow.primary_query,
      notes: pageRow.notes,
      aliases: pageRow.queries.map((query) => ({
        query: query.query,
        clicks: query.clicks,
        demand: query.demand,
        competitiveness: query.competitiveness,
        sources: query.sources,
        signals: query.signals,
      })),
    })),
  };
  await fs.writeFile(path.join(outputDir, "page-aliases.json"), `${JSON.stringify(aliases, null, 2)}\n`, "utf8");

  const bucketFiles = {
    brand: "brand-keywords.csv",
    account: "account-keywords.csv",
    noise: "noise-keywords.csv",
    informational: "informational-keywords.csv",
    "review-needed": "review-needed.csv",
    support: "support-keywords.csv",
  };

  for (const [bucket, fileName] of Object.entries(bucketFiles)) {
    const rows = sortedRecords.filter((record) => record.bucket === bucket);
    await fs.writeFile(path.join(bucketDir, fileName), toCsv(rows, allColumns), "utf8");
  }

  const sourceManifest = [
    "# Source Files",
    "",
    "These workbooks are stored in the repository with short normalized names.",
    "",
    "| ID | Label | Path | Query rows read |",
    "| --- | --- | --- | ---: |",
    ...loaded.map(
      (item) =>
      `| ${item.source.id} | ${item.source.label} | ${item.source.file} | ${item.queryRows.length.toLocaleString("ru-RU")} |`,
    ),
    "",
    "Processing ignores the source `cluster` column.",
    "",
  ].join("\n");
  await fs.writeFile(path.join(projectRoot, "data", "source-files.md"), sourceManifest, "utf8");

  const summary = buildMarkdownSummary({
    sourceSummaries: loaded.map((item) => ({
      label: item.source.label,
      queryRows: item.queryRows.length,
      tableStats: item.tableStats,
    })),
    allRecords: sortedRecords,
    pageRows,
    bucketCounts,
    signalStats,
  });
  await fs.writeFile(path.join(outputDir, "summary.md"), summary, "utf8");

  const processingDoc = [
    "# Keyword Processing",
    "",
    "This project processes Wordcraft keyword workbooks into a draft map of future commercial pages.",
    "",
    "## Rules",
    "",
    "1. Read only `Queries` and `AdditionalQueries` sheets.",
    "2. Ignore the source `cluster` column.",
    "3. Normalize query text for deduplication.",
    "4. Use maximum `clicks` and maximum `demand` when the same query appears in multiple files.",
    "5. Split queries into draft page candidates, support pages, and review buckets.",
    "6. Keep brand, personal account, and noise queries outside generic commercial page aliases.",
    "",
    "## Outputs",
    "",
    "- `data/processed/all-keywords.csv`",
    "- `data/processed/page-candidates.csv`",
    "- `data/processed/page-aliases.json`",
    "- `data/processed/buckets/*.csv`",
    "- `data/processed/summary.md`",
    "",
    "## Rebuild",
    "",
    "Run:",
    "",
    "```bash",
    "node scripts/build-keyword-map.mjs",
    "```",
    "",
    "The script expects the source workbooks to exist at the paths listed in `data/source-files.md`.",
    "",
  ].join("\n");
  await fs.writeFile(path.join(projectRoot, "docs", "03-keyword-processing.md"), processingDoc, "utf8");

  console.log(
    JSON.stringify(
      {
        uniqueQueries: sortedRecords.length,
        buckets: Object.values(bucketCounts).sort((a, b) => b.clicks - a.clicks),
        topPages: pageRows.slice(0, 20).map((row) => ({
          page_slug: row.page_slug,
          page_name: row.page_name,
          query_count: row.query_count,
          total_clicks: row.total_clicks,
          primary_query: row.primary_query,
        })),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
