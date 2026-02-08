import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchGameDetails } from "@/lib/rawg";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const game = await fetchGameDetails(slug);

  if (!game) return { title: "Game Not Found" };

  return {
    title: `${game.name} | GameVault`,
    description: `Check out details, trailers, and screenshots for ${game.name}.`,
    openGraph: {
      title: game.name,
      images: game.background_image ? [game.background_image] : [],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  const game = await fetchGameDetails(slug);

  if (!game) notFound();

  return (
    <div>
      <h1>{game.name}</h1>
    </div>
  );
}
