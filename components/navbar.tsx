import { Gamepad2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto gap-4 p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-primary size-6" />
            <span className="text-xl font-bold">GameVault</span>
          </div>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
