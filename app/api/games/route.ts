import { type NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  const { searchParams } = request.nextUrl;

  const queryParams = new URLSearchParams({
    key: API_KEY,
    page: searchParams.get("page") || "1",
    page_size: searchParams.get("page_size") || "20",
  });

  const filters = ["search", "ordering", "genres"];
  filters.forEach((filter) => {
    const value = searchParams.get(filter);
    if (value) queryParams.append(filter, value);
  });

  const platforms = searchParams.get("platforms");
  if (platforms) {
    queryParams.append("parent_platforms", platforms);
  }

  try {
    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("RAWG Fetch Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
