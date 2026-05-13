/**
 * GET /api/shelf/games
 *
 * Reads two tabs from the Google Sheet and returns them as two shelves:
 *   • "Currently Playing"  (gid 2002828633)
 *   • "Recently Finished"  (gid 0  ← update to the real gid)
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  title           Display name of the game
 *  url             Link to the game's page (e.g. IGDB, Steam)
 *  coverSrc        Direct URL to cover art image
 *  platforms       Comma-separated list of platforms, e.g. "PS5,PC"
 *  dateFinished    Human-readable date, e.g. "Jan 2024"
 *  rating          Integer 1–5 (leave blank for currently-playing rows)
 *  firstTime       "true" / "false" — was this the first playthrough?
 *  completionLevel "A" = 100% completion; leave blank otherwise
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Response is cached for 1 hour via Nitro's built-in cache layer.
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';

const SHEETS = [
  {
    title: 'Currently Playing',
    gid: '2002828633', // ← confirmed from the URL you shared
    sheetUrl:
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
      `/edit?gid=2002828633#gid=2002828633`,
  },
  {
    title: 'Recently Finished',
    gid: '0', // ← replace with the real gid for your "finished games" tab
    sheetUrl:
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
      `/edit?gid=0#gid=0`,
  },
] as const;

function rowToGameItem(row: Record<string, string>): ShelfItem {
  return {
    title: row.title ?? '',
    url: row.url ?? '',
    coverSrc: row.coverSrc ?? '',
    ...(row.dateFinished ? { dateFinished: row.dateFinished } : {}),
    ...(row.rating ? { rating: Number(row.rating) } : {}),
    platforms: row.platforms
      ? row.platforms.split(',').map((p) => p.trim()).filter(Boolean)
      : [],
    firstTime: row.firstTime?.toLowerCase() === 'true',
    ...(row.completionLevel ? { completionLevel: row.completionLevel } : {}),
  };
}

export default defineCachedEventHandler(
  async () => {
    const shelves = await Promise.all(
      SHEETS.map(async (sheet) => {
        const rows = await fetchSheetRows(SPREADSHEET_ID, sheet.gid);
        return {
          title: sheet.title,
          fetchedFrom: sheet.sheetUrl,
          items: rows.map(rowToGameItem).filter((item) => item.title !== ''),
        };
      }),
    );

    const response: ShelfResponse = {
      lastUpdated: new Date().toISOString(),
      shelves,
    };

    return response;
  },
  {
    // Cache for 1 hour; Nitro will serve stale while revalidating
    maxAge: 60 * 60,
    name: 'shelf-games',
    getKey: () => 'games',
  },
);
