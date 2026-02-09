import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Game } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  game: Game;
}

export default function GameDetailsHero({ game }: Props) {
  return (
    <section className="relative h-[60vh] min-h-100 w-full overflow-hidden">
      <Image
        src={game.background_image || "/placeholder.svg"}
        alt={game.name}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="from-background via-background/70 to-background/30 absolute inset-0 bg-linear-to-t" />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="bg-background/50 backdrop-blur-sm"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Link>
        </Button>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-8 pb-8 md:pb-12">
          <div className="max-w-4xl space-y-4">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              {game.metacritic && (
                <Badge
                  className={cn(
                    "px-3 py-1 text-sm",
                    game.metacritic >= 75
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : game.metacritic >= 50
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-red-500 hover:bg-red-600",
                  )}
                >
                  Metacritic: {game.metacritic}
                </Badge>
              )}
              {game.esrb_rating && (
                <Badge
                  variant="outline"
                  className="bg-background/50 backdrop-blur-sm"
                >
                  {game.esrb_rating.name}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              {game.name}
            </h1>

            {/* Meta info */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-semibold">
                  {game.rating?.toFixed(1)}
                </span>
                <span>({game.ratings_count.toLocaleString()} reviews)</span>
              </div>
              {game.released && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  <span>
                    {new Date(game.released).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {game.playtime && game.playtime > 0 && (
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  <span>{game.playtime} hours average</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
