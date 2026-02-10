import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGames } from "@/lib/rawg";

export function useSearchGames(query: string) {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) =>
      fetchGames({
        page: pageParam,
        search: query,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });
}
