import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchResultsGrid } from "@/components/search-grid-results";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";

  if (query) {
    return {
      title: `"${query}" - Search Results | GameVault`,
      description: `Search results for "${query}" on GameVault. Browse games, ratings, and more.`,
    };
  }

  return {
    title: "Search Games | GameVault",
    description: "Search for your favorite games on GameVault.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";

  return (
    <section className="container mx-auto px-8 py-12">
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground mb-4 -ml-2"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {query ? (
          <div className="mb-2 flex items-center gap-3">
            <Search className="text-muted-foreground size-6 shrink-0" />
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {'Results for "'}
              <span className="text-primary">{query}</span>
              {'"'}
            </h1>
          </div>
        ) : (
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Search Games
          </h1>
        )}
      </div>

      {/* SEARCH RESULTS GRID */}
      <SearchResultsGrid query={query} />
    </section>
  );
}
