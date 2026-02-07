import Navbar from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { fetchGamesServerSide } from "@/lib/rawg";
import GamesHeading from "@/components/games-heading";
import GameGrid from "@/components/game-grid";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search : "";
  const platform = typeof params.platform === "string" ? params.platform : "";
  const ordering = typeof params.ordering === "string" ? params.ordering : "";
  const genre = typeof params.genre === "string" ? params.genre : "";

  const initialGames = await fetchGamesServerSide({
    page: 1,
    pageSize: 20,
    search,
    platform,
    ordering,
    genre,
  });

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-dvh">
        <div>
          <HeroCarousel />
        </div>
        <section className="container mx-auto space-y-8 px-4">
          <GamesHeading />

          <GameGrid initialGames={initialGames} />
        </section>
      </main>
    </>
  );
}
