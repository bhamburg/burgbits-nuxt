/**
 * GET /api/shelf/games
 *
 * Reads a single sheet tab and splits rows into two shelves by
 * whether the `dateWatched` column is populated:
 *   • "Currently Playing"  — rows where dateWatched is blank
 *   • "Recently Finished"    — rows where dateWatched is present
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  title           Display name of the game
 *  url             Link to the game's page (e.g. IGDB, Steam)
 *  coverSrc        Direct URL to cover art image
 *  platform        Platform the game is available on, e.g. "PS5,PC"
 *  dateFinished    Human-readable date, e.g. "Jan 2024"
 *  rating          Integer 1–5 (leave blank for currently-playing rows)
 *  firstTime       "true" / "false" — was this the first playthrough?
 *  completed       "true" / "false" — is the game 100% completed?
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Response is cached for 1 hour via Nitro's built-in cache layer.
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { Shelf, ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = '142648611';
const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToGameItem(row: Record<string, string>): ShelfItem {
  return {
    title: row.title ?? '',
    url: row.url ?? '',
    coverSrc: row.coverSrc ?? '',
    ...(row.dateFinished ? { dateFinished: row.dateFinished } : {}),
    ...(row.rating ? { rating: Number(row.rating) } : {}),
    platform: row.platform ?? '',
    firstTime: row.firstTime ?? 'false',
    completed: row.completed ?? 'false',
  };
}

function makeShelves(items: ShelfItem[]): Shelf[] {
  let shelves = [];
  if (items.filter((item) => !item.dateFinished).length > 0) {
    shelves.push({
      items: items.filter((item) => !item.dateFinished),
      title: 'Currently Playing',
      viewAll: 'https://www.grouvee.com/user/21384-burgbits/shelves/113530-playing/',
    });
  }
  if (items.filter((item) => !!item.dateFinished).length > 0) {
    shelves.push({
      items: items.filter((item) => !!item.dateFinished).sort((a, b) => {
        // Sort recently finished shelf by dateFinished, most recent first
        if (!a.dateFinished) return 1;
        if (!b.dateFinished) return -1;
        return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
      }),
      title: 'Recently Finished',
      viewAll: 'https://www.grouvee.com/user/21384-burgbits/shelves/148221-finished/',
    });
  }
  return shelves;
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const allItems = rows
      .map(rowToGameItem)
      .filter((item) => item.title !== '');

    const response: ShelfResponse = {
      lastUpdated: new Date().toISOString(),
      shelves: makeShelves(allItems),
    };

    return response;
  },
  {
    maxAge: 60 * 60,
    name: 'shelf-films',
    getKey: () => 'films',
  },
);
