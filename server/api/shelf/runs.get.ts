/**
 * GET /api/shelf/runs
 *
 * Reads a single sheet tab as one shelf: "Runs".
 *
 * Note: the Vue component hides the Rating column whenever the shelf title
 * contains "run", so no rating field is mapped here.
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  title    Race / run name (e.g. "Broad Street Run 2024")
 *  url      Link to race results or event page
 *  coverSrc Direct URL to race logo or finisher image
 *  date     Human-readable date, e.g. "May 2024"
 * ────────────────────────────────────────────────────────────────────────────
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = '1655703602';

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToRunItem(row: Record<string, string>): ShelfItem {
  return {
    title: row.title ?? '',
    url: row.url ?? '',
    coverSrc: row.coverSrc ?? '',
    ...(row.date ? { dateFinished: row.date } : {}),
  };
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const response: ShelfResponse = {
      lastUpdated: new Date().toISOString(),
      shelves: [
        {
          title: 'Runs',
          fetchedFrom: SHEET_URL,
          items: rows
            .map(rowToRunItem)
            .filter((item) => item.title !== ''),
        },
      ],
    };

    return response;
  },
  {
    maxAge: 60 * 60,
    name: 'shelf-runs',
    getKey: () => 'runs',
  },
);
