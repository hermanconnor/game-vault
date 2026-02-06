"use client";

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

  const platformName = platform
    ? platformsData?.results.find((p) => p.id.toString() === platform)?.name
    : null;
  const genreName = genre
    ? genresData?.results.find((g) => g.id.toString() === genre)?.name
    : null;

  let heading = "Games";

  if (platformName && genreName) {
    heading = `${platformName} ${genreName} Games`;
  } else if (platformName) {
    heading = `${platformName} Games`;
  } else if (genreName) {
    heading = `${genreName} Games`;
  }

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
