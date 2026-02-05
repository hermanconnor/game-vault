import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedGames } from "@/lib/rawg";

const useFeaturedGames = () => {
  return useQuery({
    queryKey: ["featured-games"],
    queryFn: fetchFeaturedGames,
    staleTime: 1000 * 60 * 60, // 1 hour (featured games don't change often)
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });
};

export default useFeaturedGames;
