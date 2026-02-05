import { ApiResponse, Game } from "./types";

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function fetchFeaturedGames(): Promise<ApiResponse<Game>> {
  const response = await fetch("/api/featured-games", { cache: "force-cache" });

  if (!response.ok) throw new Error("Failed to fetch featured games");

  const data = await response.json();

  return data;
}
