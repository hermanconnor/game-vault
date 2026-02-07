"use client";

import { ApiResponse, Game } from "@/lib/types";
import { InfiniteScroll } from "./infinite-scroll";
import { GameCard } from "./game-card";
import useInfiniteGames from "@/hooks/use-infinite-games";
import EmptyState from "./empty-state";
import GameGridSkeleton from "./game-grid-skeleton";
import ErrorState from "./error-state";

interface Props {
  initialGames: ApiResponse<Game>;
}

export default function GameGrid({ initialGames }: Props) {
  const {
    allGames,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isPlaceholderData,
  } = useInfiniteGames(initialGames);

  if (isLoading && !isPlaceholderData) return <GameGridSkeleton />;

  if (isError) return <ErrorState error={error} refetch={refetch} />;

  if (allGames.length === 0) return <EmptyState />;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allGames.map((g) => (
          <GameCard key={g.id} game={g} />
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
