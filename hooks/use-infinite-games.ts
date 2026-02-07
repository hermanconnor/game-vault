import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse, Game } from "@/lib/types";
import { fetchGames } from "@/lib/rawg";
import useGameFilters from "./use-game-filters";

type GamesResponse = ApiResponse<Game>;

const useInfiniteGames = (initialGames?: GamesResponse) => {
  const { search, platform, ordering, genre } = useGameFilters();

  return useInfiniteQuery({
    queryKey: ["games", search, platform, ordering, genre],
    queryFn: ({ pageParam = 1 }) =>
      fetchGames({
        page: pageParam,
        search,
        platform,
        ordering,
        genre,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: initialGames
      ? {
          pages: [initialGames],
          pageParams: [1],
        }
      : undefined,
  });
};

export default useInfiniteGames;
