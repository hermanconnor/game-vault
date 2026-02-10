import { fetchGenres } from "@/lib/rawg";
import { useQuery } from "@tanstack/react-query";

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });
};

export default useGenres;
