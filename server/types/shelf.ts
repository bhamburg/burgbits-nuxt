/** Single entry on any shelf — fields are optional per shelf type */
export interface ShelfItem {
  title: string;
  url: string;
  coverSrc: string;
  dateFinished?: string;
  rating?: number;         // 1–5 stars
  // Games only
  platforms?: string[];
  firstTime?: boolean;     // true = first playthrough
  completionLevel?: string; // "A" = 100% completion
  // Books only
  author?: string;
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
