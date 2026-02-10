"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSearchPage = pathname === "/search";
  const currentQuery = isSearchPage ? searchParams.get("q") || "" : "";

  const [value, setValue] = useState(currentQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmed = value.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [value, router],
  );

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        // The key prop ensures that if currentQuery changes (via URL),
        // the state resets to match it.
        key={currentQuery}
        ref={inputRef}
        type="search"
        placeholder="Search games..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-9 pl-9"
      />
    </form>
  );
}
