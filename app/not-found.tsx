import Link from "next/link";
import { Gamepad2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="relative mb-8">
        <div className="bg-primary/10 absolute -inset-4 rounded-full blur-xl" />
        <Gamepad2 className="text-primary relative size-24 opacity-20" />
        <Search className="text-foreground absolute right-0 bottom-0 size-10" />
      </div>

      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          Game Not Found
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Sorry, we couldn&apos;t find the game you&apos;re looking for. It
          might have been removed, or the link might be broken.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
