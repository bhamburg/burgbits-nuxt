/**
 * Fetches a Google Sheet tab as parsed CSV rows.
 *
 * Uses the public /export?format=csv endpoint — the sheet must be
 * published or shared with "Anyone with the link can view".
 *
 * @param spreadsheetId  The long ID from the sheet URL
 * @param gid            The numeric gid of the specific tab
 */
export async function fetchSheetRows(
  spreadsheetId: string,
  gid: string | number,
): Promise<Record<string, string>[]> {
  const url =
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}` +
    `/export?format=csv&gid=${gid}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `Failed to fetch sheet gid=${gid}: ${res.status} ${res.statusText}`,
    });
  }

  const raw = await res.text();
  return parseCsv(raw);
}

/**
 * Minimal RFC-4180-aware CSV parser.
 * Returns an array of objects keyed by the header row.
 */
function parseCsv(raw: string): Record<string, string>[] {
  const lines = splitCsvLines(raw);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());

  return lines
    .slice(1)
    .map((line) => {
      const values = parseCsvLine(line);
      return Object.fromEntries(
        headers.map((header, i) => [header, (values[i] ?? '').trim()]),
      );
    })
    .filter((row) => Object.values(row).some((v) => v !== ''));
}

function splitCsvLines(raw: string): string[] {
  // Split on newlines that aren't inside quoted fields
  const lines: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === '"') {
      if (inQuotes && raw[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
        current += ch;
      }
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && raw[i + 1] === '\n') i++;
      lines.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}
