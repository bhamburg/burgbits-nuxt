/**
 * GET /api/shelf/mummers
 *
 * Reads the Mummers sheet tab and returns a single "Mummers Parades" shelf
 * containing all rows with a date, sorted most recent first.
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  date            Parade year/date, e.g. "Jan 1, 2025"
 *  band            String band name
 *  prize           Award or placement
 *  suit            Did I wear a suit that year
 *  title           Display name of the performance
 *  url             Link to the performance
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Response is cached for 1 hour via Nitro's built-in cache layer.
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { Shelf, ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = '932465211';
const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToMummersItem(row: Record<string, string>): ShelfItem {
  return {
    band: row.band ?? '',
    dateFinished: row.date ?? '',
    prize: row.prize ?? '',
    suit: row.suit ?? '',
    title: row.title ?? '',
    url: row.url ?? '',
  };
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const items: ShelfItem[] = rows
      .map(rowToMummersItem)
      .filter((item) => item.title !== '' && !!item.dateFinished)
      .sort((a, b) => {
        if (!a.dateFinished) return 1;
        if (!b.dateFinished) return -1;
        return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
      });

    const shelf: Shelf = {
      items,
      title: 'String Band Themes',
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
    name: 'shelf-parades',
    getKey: () => 'parades',
  },
);