"use client";

import { ApiResponse, Game } from "@/lib/types";
import { InfiniteScroll } from "./infinite-scroll";
import { GameCard } from "./game-card";
import useInfiniteGames from "@/hooks/use-infinite-games";

interface Props {
  initialGames: ApiResponse<Game>;
}

export default function GameGrid({ initialGames }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteGames(initialGames);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {initialGames.results.map((g) => (
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
