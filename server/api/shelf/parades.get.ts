/**
 * GET /api/shelf/parades
 *
 * Reads a single sheet tab as one shelf: "Mummers Parades".
 * All rows are treated as past events.
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  url      Link to a recap, video, or official page
 *  coverSrc Direct URL to parade photo or division logo
 *  date     Human-readable date, e.g. "Jan, 1 2024"
 * ────────────────────────────────────────────────────────────────────────────
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = ''; // ← replace with the real gid for your Mummers Parades tab

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToMummersItem(row: Record<string, string>): ShelfItem {
  return {
    title: row.title ?? '',
    url: row.url ?? '',
    coverSrc: row.coverSrc ?? '',
    ...(row.date ? { dateFinished: row.date } : {}),
    ...(row.rating ? { rating: Number(row.rating) } : {}),
  };
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const response: ShelfResponse = {
      lastUpdated: new Date().toISOString(),
      shelves: [
        {
          title: 'Mummers Parades',
          fetchedFrom: SHEET_URL,
          items: rows
            .map(rowToMummersItem)
            .filter((item) => item.title !== ''),
        },
      ],
    };

    return response;
  },
  {
    maxAge: 60 * 60,
    name: 'shelf-mummers',
    getKey: () => 'mummers',
  },
);
