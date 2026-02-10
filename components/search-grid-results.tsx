"use client";

import Link from "next/link";
import { AlertCircle, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { GameCardSkeleton } from "@/components/game-card-skeleton";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useSearchGames } from "@/hooks/use-search-games";

interface Props {
  query: string;
}

export function SearchResultsGrid({ query }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useSearchGames(query);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <SearchX className="text-muted-foreground/50 mb-6 size-16" />
        <h2 className="mb-2 text-2xl font-semibold">Start searching</h2>
        <p className="text-muted-foreground max-w-md">
          Type a game name in the search bar above to find games.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="text-destructive/70 mb-6 h-16 w-16" />
        <h2 className="mb-2 text-2xl font-semibold">Search failed</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {error instanceof Error
            ? error.message
            : "Something went wrong while searching."}
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const games = data?.pages.flatMap((page) => page.results) || [];
  const totalCount = data?.pages[0]?.count || 0;

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <SearchX className="text-muted-foreground/50 mb-6 size-16" />
        <h2 className="mb-2 text-2xl font-semibold">No results found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          {"We couldn't find any games matching \""}
          <span className="text-foreground font-medium">{query}</span>
          {'". Try a different search term.'}
        </p>
        <Button asChild variant="outline" className="bg-transparent">
          <Link href="/">Browse All Games</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-6 text-sm">
        {totalCount.toLocaleString()} {totalCount === 1 ? "result" : "results"}{" "}
        found
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
}
