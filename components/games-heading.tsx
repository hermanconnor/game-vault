"use client";

import { useMemo } from "react";
import useGameFilters from "@/hooks/use-game-filters";
import usePlatforms from "@/hooks/use-platforms";
import useGenres from "@/hooks/use-genres";
import PlatformSelector from "@/components/platform-selector";
import GenreSelector from "@/components/genre-selector";
import SortSelector from "@/components/sort-selector";

export default function GamesHeading() {
  const { data: platformsData } = usePlatforms();
  const { data: genresData } = useGenres();
  const { platform, setPlatform, genre, setGenre, ordering, setOrdering } =
    useGameFilters();

  const heading = useMemo(() => {
    const platformName = platformsData?.results.find(
      (p) => p.id.toString() === platform,
    )?.name;

    const genreName = genresData?.results.find(
      (g) => g.id.toString() === genre,
    )?.name;

    if (platformName && genreName) return `${platformName} ${genreName} Games`;
    if (platformName) return `${platformName} Games`;
    if (genreName) return `${genreName} Games`;

    return "All Games";
  }, [platform, genre, platformsData, genresData]);

  return (
    <header>
      <div className="flex flex-col gap-4 sm:justify-between md:flex-row">
        <h2 className="animate-in fade-in text-3xl font-bold tracking-tight text-balance duration-500">
          {heading}
        </h2>
        <div className="flex flex-col gap-4 sm:justify-between md:flex-row">
          <PlatformSelector
            data={platformsData}
            platform={platform}
            setPlatform={setPlatform}
          />
          <GenreSelector data={genresData} genre={genre} setGenre={setGenre} />
          <SortSelector ordering={ordering} setOrdering={setOrdering} />
        </div>
      </div>
    </header>
  );
}
