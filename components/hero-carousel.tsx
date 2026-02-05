"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useFeaturedGames from "@/hooks/use-featured-games";

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useFeaturedGames();

  const games = data?.results || [];

  const handleNext = useCallback(() => {
    if (games.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const handlePrev = useCallback(() => {
    if (games.length === 0) return;

    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  }, [games.length]);

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
      className="group relative h-[70vh] min-h-125 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    ></section>
  );
}
