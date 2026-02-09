import { Trailer } from "@/lib/types";

interface Props {
  trailers: Trailer[];
}

export default function GameTrailer({ trailers }: Props) {
  const mainTrailer = trailers[0];

  return (
    <>
      {mainTrailer ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
          <video
            controls
            poster={mainTrailer.preview}
            className="h-full w-full"
          >
            <source src={mainTrailer.data.max} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null}
    </>
  );
}
