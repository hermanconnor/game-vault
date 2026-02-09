import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, ExternalLink, Monitor, Tag } from "lucide-react";
import GameScreenshots from "@/components/game-screenshots";
import GameTrailer from "@/components/game-trailer";
import GameDetailsHero from "@/components/game-details-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailer,
} from "@/lib/rawg";

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
      <section className="container mx-auto p-8 md:py-12">
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
            {game.tags && game.tags.length > 0 && (
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-2xl font-semibold">
                  <Tag className="size-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.slice(0, 15).map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Platforms */}
            {game.parent_platforms && game.parent_platforms.length > 0 && (
              <div className="bg-card space-y-4 rounded-xl border p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Monitor className="size-4" />
                  Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.parent_platforms.map((p) => (
                    <Badge key={p.platform.id} variant="secondary">
                      {p.platform.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Developers & Publishers */}
            <div className="bg-card space-y-4 rounded-xl border p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <Building2 className="size-4" />
                Credits
              </h3>
              {game.developers && game.developers.length > 0 && (
                <div>
                  <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
                    Developers
                  </p>
                  <p className="text-sm">
                    {game.developers.map((d) => d.name).join(", ")}
                  </p>
                </div>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <div>
                  <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
                    Publishers
                  </p>
                  <p className="text-sm">
                    {game.publishers.map((p) => p.name).join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Stores */}
            {game.stores && game.stores.length > 0 && (
              <div className="bg-card space-y-4 rounded-xl border p-6">
                <h3 className="font-semibold">Where to Buy</h3>
                <div className="flex flex-col gap-2">
                  {game.stores.slice(0, 5).map((s) => (
                    <a
                      key={s.id}
                      href={`https://${s.store.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors"
                    >
                      <span>{s.store.name}</span>
                      <ExternalLink className="text-muted-foreground size-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Website */}
            {game.website && (
              <Button
                asChild
                className="w-full bg-transparent"
                variant="outline"
              >
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 size-4" />
                  Official Website
                </a>
              </Button>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
