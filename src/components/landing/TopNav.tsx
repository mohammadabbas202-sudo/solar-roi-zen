import { Sun } from "lucide-react";

export function TopNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container flex items-center justify-between py-5">
        <a href="#" className="flex items-center gap-2 text-navy">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-navy-foreground">
            <Sun className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="font-semibold tracking-tight text-[17px]">SolarLedger</span>
        </a>
        <a
          href="#how"
          className="hidden sm:inline-flex text-sm font-medium text-slate hover:text-navy transition-colors"
        >
          How it works
        </a>
      </div>
    </header>
  );
}
