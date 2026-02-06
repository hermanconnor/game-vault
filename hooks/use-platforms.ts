import { fetchPlatforms } from "@/lib/rawg";
import { useQuery } from "@tanstack/react-query";

const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: fetchPlatforms,
    staleTime: Infinity, // These rarely change, keep them cached
  });
};

export default usePlatforms;
