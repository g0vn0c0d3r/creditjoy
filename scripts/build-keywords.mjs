import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputFile = path.join(projectRoot, "data", "keywords.csv");

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

function normalizeQuery(value) {
  return String(value ?? "")
    .toLocaleLowerCase("ru-RU")
    .replace(/ё/g, "е")
    .replace(/[«»“”"'`]/g, " ")
    .replace(/[()[\]{}]/g, " ")
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

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell || row.length) {
    row.push(cell);
    if (row.some((value) => value !== "")) rows.push(row);
  }

  const [headers = [], ...body] = rows;
  return body.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

async function loadExistingDecisions() {
  try {
    const csv = await fs.readFile(outputFile, "utf8");
    const rows = parseCsv(csv);
    return new Map(
      rows.map((row) => [
        normalizeQuery(row.query),
        {
          decision: row.decision ?? "",
          notes: row.notes ?? "",
        },
      ]),
    );
  } catch (error) {
    if (error.code === "ENOENT") return new Map();
    throw error;
  }
}

function rowsFromValues(values) {
  const [headers, ...rows] = values;
  const normalizedHeaders = headers.map((header) => String(header ?? "").trim());

  return rows
    .filter((row) => row.some((value) => value !== null && value !== undefined && value !== ""))
    .map((row) =>
      Object.fromEntries(normalizedHeaders.map((header, index) => [header, row[index]])),
    );
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
  const sheetStats = {};

  for (const line of sheets.ndjson.split("\n").filter(Boolean)) {
    const sheet = JSON.parse(line);
    sheetStats[sheet.name] = sheet.range;
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
        source: source.id,
        sourceSheet: sheet.name,
      });
    }
  }

  return {
    source,
    sheetStats,
    queryRows,
  };
}

function mergeRows(rows, existingDecisions) {
  const merged = new Map();

  for (const row of rows) {
    if (!row.normalizedQuery) continue;

    const current =
      merged.get(row.normalizedQuery) ??
      {
        query: row.query,
        normalizedQuery: row.normalizedQuery,
        clicks: 0,
        demand: 0,
        sources: new Set(),
        sourceSheets: new Set(),
      };

    if (row.clicks > current.clicks || (row.clicks === current.clicks && row.demand > current.demand)) {
      current.query = row.query;
    }

    current.clicks = Math.max(current.clicks, row.clicks);
    current.demand = Math.max(current.demand, row.demand);
    current.sources.add(row.source);
    current.sourceSheets.add(`${row.source}:${row.sourceSheet}`);

    merged.set(row.normalizedQuery, current);
  }

  return [...merged.values()]
    .map((row) => {
      const existing = existingDecisions.get(row.normalizedQuery) ?? {};
      return {
        query: row.query,
        clicks: row.clicks,
        demand: row.demand,
        sources: [...row.sources].sort().join(";"),
        decision: existing.decision ?? "",
        notes: existing.notes ?? "",
      };
    })
    .sort((left, right) => right.clicks - left.clicks || right.demand - left.demand || left.query.localeCompare(right.query, "ru"));
}

async function main() {
  const existingDecisions = await loadExistingDecisions();

  const loaded = [];
  for (const source of sourceFiles) {
    loaded.push(await loadWorkbookRows(source));
  }

  const rows = mergeRows(
    loaded.flatMap((item) => item.queryRows),
    existingDecisions,
  );

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(
    outputFile,
    toCsv(rows, ["query", "clicks", "demand", "sources", "decision", "notes"]),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        output: path.relative(projectRoot, outputFile),
        sourceFiles: loaded.map((item) => ({
          id: item.source.id,
          rowsRead: item.queryRows.length,
        })),
        uniqueQueries: rows.length,
        totalClicksMax: rows.reduce((sum, row) => sum + row.clicks, 0),
        totalDemandMax: rows.reduce((sum, row) => sum + row.demand, 0),
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
