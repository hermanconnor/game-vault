"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

interface Props {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  children?: React.ReactNode;
}

export function InfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  children,
}: Props) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div ref={ref} className="flex justify-center py-8">
      {isFetchingNextPage ? (
        children || (
          <div className="text-muted-foreground flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            <span>Loading more...</span>
          </div>
        )
      ) : !hasNextPage ? (
        <p className="text-muted-foreground">No more items to load</p>
      ) : null}
    </div>
  );
}
