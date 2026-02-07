"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Can log the error to an error reporting service like Sentry
    console.error("Application Error:", error);
  }, [error]);

  const isApiError =
    error.message.includes("fetch") || error.message.includes("RAWG");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-destructive/10 mb-6 rounded-full p-4">
        <AlertCircle className="text-destructive size-12" />
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        {isApiError
          ? "Service Temporarily Unavailable"
          : "Something went wrong"}
      </h1>

      <p className="text-muted-foreground mb-8 max-w-md">
        {isApiError
          ? "We're having trouble connecting to the game database. This might be a temporary outage or rate limit."
          : "An unexpected error occurred. Our team has been notified."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => reset()} variant="default" className="gap-2">
          <RefreshCcw className="size-4" />
          Try Again
        </Button>

        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <Home className="size-4" />
            Go Home
          </Link>
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <pre className="bg-muted text-muted-foreground mt-10 max-w-full overflow-auto rounded p-4 text-left text-xs">
          {error.message}
        </pre>
      )}
    </div>
  );
}
