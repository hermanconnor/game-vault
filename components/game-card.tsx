import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/lib/types";

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  return (
    <Link href={`/games/${game.slug}`}>
      <Card className="group cursor-pointer overflow-hidden pt-0 transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="bg-muted relative aspect-video overflow-hidden">
          {game.background_image ? (
            <Image
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center">
              No Image
            </div>
          )}
          {game.metacritic && (
            <Badge
              className="absolute top-2 right-2"
              variant={
                game.metacritic >= 75
                  ? "default"
                  : game.metacritic >= 50
                    ? "secondary"
                    : "destructive"
              }
            >
              {game.metacritic}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold">
            {game.name}
          </h3>
          <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{game.rating?.toFixed(1)}</span>
            </div>
            {game.released && (
              <>
                <span>•</span>
                <span>{new Date(game.released).getFullYear()}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {game.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre.id} variant="outline" className="text-xs">
                {genre.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
