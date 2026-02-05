export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

// Short screenshot interface
export interface ShortScreenshot {
  id: number;
  image: string;
}

// Platform details interface
export interface PlatformDetails {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start?: number | null;
  games_count?: number;
  image_background?: string;
}

// System requirements interface
export interface SystemRequirements {
  minimum?: string;
  recommended?: string;
}

// Platform with release info interface
export interface Platform {
  platform: PlatformDetails;
  released_at: string | null;
  requirements_en: SystemRequirements | null;
  requirements_ru: SystemRequirements | null;
}

// Parent platform interface
export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

// ESRB rating interface
export interface ESRBRating {
  id: number;
  name: string;
  slug: string;
}

// Added by status interface
export interface AddedByStatus {
  beaten: number;
  dropped: number;
  owned: number;
  playing: number;
  toplay: number;
  yet: number;
}

// Genre interface
export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

// Store details interface
export interface StoreDetails {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
}

// Store interface
export interface Store {
  id: number;
  store: StoreDetails;
}

// Tag interface
export interface Tag {
  id: number;
  name: string;
  slug: string;
  language?: string;
  games_count?: number;
  image_background?: string;
}

// Main game interface
export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image?: string;
  rating?: number;
  rating_top?: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_count: number;
  reviews_text_count: number;
  added?: number;
  added_by_status?: AddedByStatus;
  metacritic?: number | null;
  playtime?: number;
  suggestions_count: number;
  updated: string;
  user_game?: null | Record<string, unknown>;
  saturated_color: string;
  dominant_color?: string;
  platforms?: Platform[];
  parent_platforms?: ParentPlatform[];
  genres?: Genre[];
  stores: Store[];
  clip?: null | Record<string, unknown>;
  tags: Tag[];
  esrb_rating?: ESRBRating | null;
  short_screenshots: ShortScreenshot[];
}

export interface GameDetails extends Game {
  description_raw: string;
  website: string | null;
  developers: { id: number; name: string }[];
  publishers: { id: number; name: string }[];
  esrb_rating: ESRBRating | null;
  tags: (Genre & { slug: string })[];
  screenshots: { id: number; image: string }[];
  playtime: number;
  stores: Store[];
}
