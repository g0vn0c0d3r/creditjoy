# Keyword Processing

This project processes Wordcraft keyword workbooks into a draft map of future commercial pages.

## Rules

1. Read only `Queries` and `AdditionalQueries` sheets.
2. Ignore the source `cluster` column.
3. Normalize query text for deduplication.
4. Use maximum `clicks` and maximum `demand` when the same query appears in multiple files.
5. Split queries into draft page candidates, support pages, and review buckets.
6. Keep brand, personal account, and noise queries outside generic commercial page aliases.

## Outputs

- `data/processed/all-keywords.csv`
- `data/processed/page-candidates.csv`
- `data/processed/page-aliases.json`
- `data/processed/buckets/*.csv`
- `data/processed/summary.md`

## Rebuild

Run:

```bash
node scripts/build-keyword-map.mjs
```

The script expects the source workbooks to exist at the paths listed in `data/source-files.md`.
