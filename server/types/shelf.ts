/** Single entry on any shelf — fields are optional per shelf type */
export interface ShelfItem {
  title?: string;
  url?: string;
  coverSrc?: string;
  dateFinished?: string;
  rating?: number;         // 1–5 stars
  releaseYear?: string;
  // Games only
  platform?: string;
  firstTime?: string;     // 'true' = first playthrough
  completed?: string;     // 'true' = 100% completion
  // Books only
  author?: string;
  // Parades and Concerts
  band?: string;
  prize?: string;
  suit?: string;
  // Runs
  name?: string;
  time?: string;
  pace?: string;
  miles?: string;
}

export interface Shelf {
  items: ShelfItem[];
  title: string;        // e.g. "Currently Playing", "Recently Finished"
  viewAll: string;      // canonical URL for "View all" links
}

export interface ShelfResponse {
  lastUpdated: string;  // ISO date string
  shelves?: Shelf[];
}
