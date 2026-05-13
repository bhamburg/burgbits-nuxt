/**
 * GET /api/shelf/videos
 *
 * Reads a single sheet tab and splits rows into two shelves by
 * whether the `dateWatched` column is populated:
 *   • "Currently Watching"  — rows where dateWatched is blank
 *   • "Recently Watched"    — rows where dateWatched is present
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  title        Display name of the film
 *  url          Link to the film's page (e.g. Letterboxd, IMDb)
 *  coverSrc     Direct URL to poster/cover image
 *  dateWatched  Human-readable finish date, e.g. "Jan 1, 2024"
 *  rating       Integer 1–5 (leave blank for in-progress rows)
 * ────────────────────────────────────────────────────────────────────────────
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { Shelf, ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = '542860284';

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToFilmItem(row: Record<string, string>): ShelfItem {
  return {
    title: row.title ?? '',
    url: row.url ?? '',
    coverSrc: row.coverSrc ?? '',
    ...(row.dateWatched ? { dateFinished: row.dateWatched } : {}),
    ...(row.rating ? { rating: Number(row.rating) } : {}),
  };
}

function makeShelves(items: ShelfItem[]): Shelf[] {
  let shelves = [];
  if (items.filter((item) => !item.dateFinished).length > 0) {
    shelves.push({
      items: items.filter((item) => !item.dateFinished),
      title: 'Currently Watching',
      viewAll: SHEET_URL,
    });
  }
  if (items.filter((item) => !!item.dateFinished).length > 0) {
    shelves.push({
      items: items.filter((item) => !!item.dateFinished),
      title: 'Recently Watched',
      viewAll: SHEET_URL,
    });
  }
  return shelves;
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const allItems = rows
      .map(rowToFilmItem)
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
