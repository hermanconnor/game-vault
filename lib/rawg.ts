import {
  ApiResponse,
  Game,
  GameDetails,
  GenresResponse,
  PlatformsResponse,
  ScreenshotResponse,
  TrailerResponse,
} from "./types";

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

interface FetchOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  platform?: string;
  ordering?: string;
  genre?: string;
}

const buildParams = (options: FetchOptions) => {
  const params = new URLSearchParams();

  if (options.page) params.append("page", options.page.toString());
  if (options.pageSize) params.append("page_size", options.pageSize.toString());
  if (options.search) params.append("search", options.search);
  if (options.platform) params.append("parent_platforms", options.platform);
  if (options.ordering) params.append("ordering", options.ordering);
  if (options.genre) params.append("genres", options.genre);

  return params;
};

export async function fetchFeaturedGames(): Promise<ApiResponse<Game>> {
  const response = await fetch("/api/featured-games", { cache: "force-cache" });

  if (!response.ok) throw new Error("Failed to fetch featured games");

  const data = await response.json();

  return data;
}

export async function fetchPlatforms(): Promise<PlatformsResponse> {
  const response = await fetch("/api/platforms");

  if (!response.ok) throw new Error("Failed to fetch platforms");

  const data = await response.json();

  return data;
}

export async function fetchGenres(): Promise<GenresResponse> {
  const response = await fetch("/api/genres");

  if (!response.ok) throw new Error("Failed to fetch genres");

  const data = await response.json();

  return data;
}

export async function fetchGames(
  options: FetchOptions = {},
): Promise<ApiResponse<Game>> {
  const params = buildParams(options);

  const response = await fetch(`/api/games?${params.toString()}`);

  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

  const data = await response.json();

  return data;
}

export async function fetchGamesServerSide(
  options: FetchOptions = {},
): Promise<ApiResponse<Game>> {
  if (!API_KEY) throw new Error("API key not configured.");

  const params = buildParams(options);
  params.append("key", API_KEY);

  const response = await fetch(`${BASE_URL}/games?${params.toString()}`, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) throw new Error("Failed to fetch games from server");

  return await response.json();
}

export async function fetchGameDetails(
  slug: string,
): Promise<GameDetails | null> {
  if (!API_KEY) throw new Error("API key not configured.");

  const response = await fetch(`${BASE_URL}/games/${slug}?key=${API_KEY}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    if (response.status === 404) return null;

    throw new Error("Failed to fetch game details");
  }

  return await response.json();
}

export async function fetchGameScreenshots(
  gameId: number | string,
): Promise<ScreenshotResponse> {
  if (!API_KEY) throw new Error("API key not configured.");

  const response = await fetch(
    `${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!response.ok) throw new Error("Failed to fetch screenshots");

  return await response.json();
}

export async function fetchGameTrailer(
  gameId: number | string,
): Promise<TrailerResponse> {
  if (!API_KEY) throw new Error("API key not configured.");

  const response = await fetch(
    `${BASE_URL}/games/${gameId}/movies?key=${API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!response.ok) throw new Error("Failed to fetch trailers");

  return await response.json();
}
