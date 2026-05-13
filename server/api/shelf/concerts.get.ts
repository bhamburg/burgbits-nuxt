/**
 * GET /api/shelf/concerts
 *
 * Reads a single sheet tab as one shelf: "Concerts Attended".
 * All rows are treated as past events — no "currently" split.
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  title        Artist / show name
 *  url          Link to the event or artist page
 *  coverSrc     Direct URL to artist photo or show poster
 *  dateAttended Human-readable date, e.g. "Jan 2024"
 *  venue        Venue name (stored in the unused `author` field so the
 *               component can render it in the Author column if desired)
 *  rating       Integer 1–5
 * ────────────────────────────────────────────────────────────────────────────
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = ''; // ← replace with the real gid for your Concerts tab

const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToConcertItem(row: Record<string, string>): ShelfItem {
  return {
    title: row.title ?? '',
    url: row.url ?? '',
    coverSrc: row.coverSrc ?? '',
    ...(row.dateAttended ? { dateFinished: row.dateAttended } : {}),
    ...(row.venue ? { author: row.venue } : {}),
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
          title: 'Concerts Attended',
          fetchedFrom: SHEET_URL,
          items: rows
            .map(rowToConcertItem)
            .filter((item) => item.title !== ''),
        },
      ],
    };

    return response;
  },
  {
    maxAge: 60 * 60,
    name: 'shelf-concerts',
    getKey: () => 'concerts',
  },
);
