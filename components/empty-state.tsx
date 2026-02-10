import { Gamepad2 } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Gamepad2 className="text-muted-foreground mb-4 size-12" />
      <h2 className="mb-2 text-xl font-semibold">No games found</h2>
      <p className="text-muted-foreground">
        Try adjusting your search or filters
      </p>
    </div>
  );
}
