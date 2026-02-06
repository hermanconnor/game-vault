import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const useGameFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const platform = searchParams.get("platform") || "";
  const ordering = searchParams.get("ordering") || "";
  const genre = searchParams.get("genre") || "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      if (!updates.page && params.has("page")) {
        params.set("page", "1");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setSearch = useCallback(
    (value: string) => updateParams({ search: value }),
    [updateParams],
  );

  const setPlatform = useCallback(
    (value: string) => updateParams({ platform: value === "all" ? "" : value }),
    [updateParams],
  );

  const setOrdering = useCallback(
    (value: string) =>
      updateParams({ ordering: value === "default" ? "" : value }),
    [updateParams],
  );

  const setGenre = useCallback(
    (value: string) => updateParams({ genre: value === "all" ? "" : value }),
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    search,
    platform,
    ordering,
    genre,
    setSearch,
    setPlatform,
    setOrdering,
    setGenre,
    clearFilters,
  };
};

export default useGameFilters;
