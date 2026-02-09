import { Screenshot } from "@/lib/types";
import Image from "next/image";

interface Props {
  screenshots: Screenshot[];
}

export default function GameScreenshots({ screenshots }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {screenshots &&
        screenshots.length > 0 &&
        screenshots.map((img) => (
          <div key={img.id} className="aspect-video overflow-hidden rounded-lg">
            <Image
              src={img.image || "/placeholder.svg"}
              alt="Game Screenshot"
              width={img.width}
              height={img.height}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
    </div>
  );
}
