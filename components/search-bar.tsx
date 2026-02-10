"use client";

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import useGameFilters from "@/hooks/use-game-filters";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchBar() {
  const { search, setSearch } = useGameFilters();
  const [value, setValue] = useState(search);

  const { debouncedValue, isDebouncing } = useDebounce(value, 500);

  // Sync local input with URL (e.g., if user clears filters or hits back button)
  useEffect(() => {
    setValue(search);
  }, [search]);

  // Sync URL with debounced input
  useEffect(() => {
    // CRITICAL: Only trigger the router push if the values actually differ
    if (debouncedValue !== search) {
      setSearch(debouncedValue);
    }
  }, [debouncedValue, search, setSearch]);

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        {isDebouncing ? (
          <Loader2 className="text-muted-foreground size-4 animate-spin" />
        ) : (
          <Search className="text-muted-foreground size-4" />
        )}
      </div>

      <Input
        type="search"
        placeholder="Search games..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-9 pl-9"
      />
    </div>
  );
}
