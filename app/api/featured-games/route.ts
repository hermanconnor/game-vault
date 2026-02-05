import { NextResponse } from "next/server";

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    key: API_KEY,
    page_size: "5",
    ordering: "-added",
    metacritic: "85,100",
    dates: "2024-01-01,2026-12-31",
  });

  try {
    const response = await fetch(`${BASE_URL}/games?${params.toString()}`, {
      next: { revalidate: 86400 }, // Cache on server for 24 hours (ISR)
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "External API error" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Featured Games Route Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
