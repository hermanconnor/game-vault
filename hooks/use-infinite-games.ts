import { useMemo } from "react";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchGames } from "@/lib/rawg";
import useGameFilters from "./use-game-filters";
import { ApiResponse, Game } from "@/lib/types";

type GamesResponse = ApiResponse<Game>;

const useInfiniteGames = (initialGames?: GamesResponse) => {
  const { search, platform, ordering, genre } = useGameFilters();

  const isDefaultView = !search && !platform && !ordering && !genre;

  const query = useInfiniteQuery({
    queryKey: ["games", "infinite", search, platform, ordering, genre],
    queryFn: ({ pageParam = 1 }) =>
      fetchGames({
        page: pageParam as number,
        search,
        platform,
        ordering,
        genre,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get("page"));
    },
    initialPageParam: 1,
    initialData:
      isDefaultView && initialGames
        ? { pages: [initialGames], pageParams: [1] }
        : undefined,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  // Flatten the games here so the component gets a clean array
  const allGames = useMemo(
    () => query.data?.pages.flatMap((page) => page.results) || [],
    [query.data],
  );

  return {
    ...query,
    allGames,
  };
};

export default useInfiniteGames;
