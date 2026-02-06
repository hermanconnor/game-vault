import Navbar from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search : "";
  const platform = typeof params.platform === "string" ? params.platform : "";
  const ordering = typeof params.ordering === "string" ? params.ordering : "";
  const genre = typeof params.genre === "string" ? params.genre : "";

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-dvh">
        <div>
          <HeroCarousel />
        </div>
      </main>
    </>
  );
}
