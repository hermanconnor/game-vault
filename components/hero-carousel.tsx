"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useFeaturedGames from "@/hooks/use-featured-games";
import { Star } from "lucide-react";

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useFeaturedGames();

  const games = data?.results || [];

  const handleNext = useCallback(() => {
    if (games.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (games.length === 0 || isPaused) return;

    timerRef.current = setInterval(handleNext, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [games.length, handleNext, isPaused]);

  if (isLoading) return <Skeleton className="h-[70vh] min-h-125 w-full" />;
  if (games.length === 0) return null;

  const currentGame = games[currentIndex];

  return (
    <section
      className="relative h-[70vh] min-h-125 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      {games.map((game, index) => (
        <div
          key={game.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={
              game.background_image || "/placeholder.svg?height=1080&width=1920"
            }
            alt={game.name}
            fill
            priority={index === 0}
            className="object-cover brightness-50"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="from-background via-background/60 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="from-background/80 to-background/80 absolute inset-0 bg-linear-to-r via-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-6 duration-700">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-primary-foreground rounded px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase">
                Featured
              </Badge>

              {currentGame.metacritic && (
                <Badge className="rounded border border-emerald-500/50 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                  {currentGame.metacritic} Metascore
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              {currentGame.name}
            </h1>

            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-medium">
                  {currentGame.rating?.toFixed(1)}
                </span>
                <span>
                  ({currentGame.ratings_count.toLocaleString()} reviews)
                </span>
              </div>
              {currentGame.released && (
                <span>
                  Released:{" "}
                  {new Date(currentGame.released).toLocaleDateString()}
                </span>
              )}
            </div>

            {currentGame.genres && currentGame.genres.length > 0 && (
              <>
                <div className="flex flex-wrap gap-2">
                  {currentGame.genres.slice(0, 4).map((genre) => (
                    <Badge
                      variant="secondary"
                      key={genre.id}
                      className="border-border/50 bg-background/50 rounded-full border px-3 py-1 text-xs backdrop-blur-sm"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            {/* CTA */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base font-bold transition-transform hover:scale-105"
              >
                <Link href={`/games/${currentGame.slug}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 cursor-pointer rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60 w-2",
            )}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
