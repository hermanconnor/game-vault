import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailer,
} from "@/lib/rawg";
import GameScreenshots from "@/components/game-screenshots";
import GameTrailer from "@/components/game-trailer";
import GameDetailsHero from "@/components/game-details-hero";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const game = await fetchGameDetails(slug);

  if (!game) return { title: "Game Not Found" };

  return {
    title: `${game.name} | GameVault`,
    description: `Check out details, trailers, and screenshots for ${game.name}.`,
    openGraph: {
      title: game.name,
      images: game.background_image ? [game.background_image] : [],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  const game = await fetchGameDetails(slug);

  if (!game) notFound();

  const [trailers, screenshots] = await Promise.all([
    fetchGameTrailer(slug),
    fetchGameScreenshots(slug),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <GameDetailsHero game={game} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Game Media</h2>
              <GameTrailer trailers={trailers.results} />
              <GameScreenshots screenshots={screenshots.results} />
            </div>

            {/* About */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">About</h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {game.description_raw || "No description available."}
                </p>
              </div>
            </div>

            {/* Tags */}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Platforms */}

            {/* Developers & Publishers */}

            {/* Stores */}

            {/* Website */}
          </aside>
        </div>
      </section>
    </div>
  );
}
