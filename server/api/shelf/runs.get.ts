/**
 * GET /api/shelf/runs
 *
 * Reads the Runs sheet tab and returns a single "Runs" shelf
 * containing all rows with a date, sorted most recent first.
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  date            Race date, e.g. "Jan 1, 2025"
 *  name            Race name
 *  time            Finish time, e.g. "1:44:32"
 *  pace            Pace per mile, e.g. "10:27"
 *  miles           Race distance in miles, e.g. "10"
 *  url             Link to race results
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Response is cached for 1 hour via Nitro's built-in cache layer.
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { Shelf, ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = '1655703602';
const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToRaceItem(row: Record<string, string>): ShelfItem {
  return {
    dateFinished: row.date ?? '',
    miles: row.miles ?? '',
    name: row.name ?? '',
    pace: row.pace ?? '',
    time: row.time ?? '',
    url: row.url ?? '',
  };
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const items: ShelfItem[] = rows
      .map(rowToRaceItem)
      .filter((item) => item.name !== '' && !!item.dateFinished)
      .sort((a, b) => {
        if (!a.dateFinished) return 1;
        if (!b.dateFinished) return -1;
        return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
      });

    const shelf: Shelf = {
      items,
      title: 'Race Finishes',
      viewAll: SHEET_URL,
    };

    const response: ShelfResponse = {
      lastUpdated: new Date().toISOString(),
      shelves: items.length > 0 ? [shelf] : [],
    };

    return response;
  },
  {
    maxAge: 60 * 60,
    name: 'shelf-races',
    getKey: () => 'races',
  },
);