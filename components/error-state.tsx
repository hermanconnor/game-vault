import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorState({
  error,
  refetch,
}: {
  error: unknown;
  refetch: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="text-destructive mb-4 h-12 w-12" />
      <h2 className="mb-2 text-xl font-semibold">Failed to load games</h2>
      <p className="text-muted-foreground mb-4">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
      <Button onClick={() => refetch()}>Try Again</Button>
    </div>
  );
}
