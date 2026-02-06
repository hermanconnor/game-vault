import { Skeleton } from "@/components/ui/skeleton";

export function GameGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-75 w-full rounded-xl" />
      ))}
    </div>
  );
}
