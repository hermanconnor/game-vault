import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="contianer border-border mx-auto flex flex-col items-center justify-between gap-2 border-t px-8 py-6 sm:flex-row sm:gap-0">
      <div className="flex items-center gap-2">
        <Gamepad2 className="size-5" />
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} GameVault. All rights reserved.
        </p>
      </div>

      <p className="text-muted-foreground text-sm">
        Powered by{" "}
        <a
          href="https://rawg.io"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          RAWG API
        </a>
      </p>
    </footer>
  );
}
