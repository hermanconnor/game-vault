import { ApiResponse, Game } from "./types";

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_BASE_URL = "https://api.rawg.io/api";

export async function getFeaturedGames(): Promise<ApiResponse<Game>> {
  if (!RAWG_API_KEY) throw new Error("RAWG_API_KEY is not configured.");

  const params = new URLSearchParams({
    key: RAWG_API_KEY,
    page_size: "5",
    ordering: "-added",
    metacritic: "85,100",
  });

  const response = await fetch(`${RAWG_BASE_URL}/games?${params.toString()}`, {
    next: { revalidate: 86400 }, // 24 hours in seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured games from RAWG");
  }

  return response.json();
}
