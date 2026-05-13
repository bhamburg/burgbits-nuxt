/**
 * GET /api/shelf/books
 *
 * Reads a single sheet tab and splits rows into two shelves purely by
 * whether the `dateRead` column is populated:
 *   • "Currently Reading"  — rows where dateRead is blank
 *   • "Recently Read"      — rows where dateRead is present
 *
 * ── Expected column headers (case-sensitive) ────────────────────────────────
 *  authorLast  Last name of the author
 *  authorFirst First name of the author
 *  coverSrc    Direct URL to cover art image
 *  dateRead    Finish date string; blank = in progress
 *  rating      Integer 1–5
 *  title       Display name of the book
 *  url         Link to the book's page (e.g. Goodreads, OpenLibrary)
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Response is cached for 1 hour via Nitro's built-in cache layer.
 */

import { fetchSheetRows } from '../../utils/sheets';
import type { ShelfItem, ShelfResponse } from '../../types/shelf';

const SPREADSHEET_ID = '1IAGxWmD6xg5JIaIGPHFIKARA7AigSYSvG5nqlTz15L0';
const GID = '2002828633';
const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}` +
  `/edit?gid=${GID}#gid=${GID}`;

function rowToBookItem(row: Record<string, string>): ShelfItem {
  return {
    author: `${row.authorLast ?? ''}, ${row.authorFirst ?? ''}`.trim(),
    coverSrc: row.coverSrc ?? '',
    dateFinished: row.dateRead ?? '',
    rating: row.rating 
      ? Number(row.rating) 
      : undefined,
    title: row.title ?? '',
    url: row.url ?? '',
  };
}

export default defineCachedEventHandler(
  async () => {
    const rows = await fetchSheetRows(SPREADSHEET_ID, GID);

    const allItems = rows
      .map(rowToBookItem)
      .filter((item) => item.title !== '');

    const response: ShelfResponse = {
      lastUpdated: new Date().toISOString(),
      shelves: [
        {
          items: allItems.filter((item) => !item.dateFinished),
          title: 'Currently Reading',
          viewAll: SHEET_URL,
        },
        {
          items: allItems.filter((item) => !!item.dateFinished).sort((a, b) => {
            // Sort recently read shelf by dateFinished, most recent first
            const dateA = new Date(a.dateFinished!);
            const dateB = new Date(b.dateFinished!);
            return dateB.getTime() - dateA.getTime();
          }),
          title: 'Recently Read',
          viewAll: SHEET_URL,
        },
      ],
    };

    return response;
  },
  {
    // maxAge: 60 * 60,
    name: 'shelf-books',
    getKey: () => 'books',
  },
);
