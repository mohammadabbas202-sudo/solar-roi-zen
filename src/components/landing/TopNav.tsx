import { Sun } from "lucide-react";

export function TopNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between py-8">
        <a href="/" className="flex items-center gap-2.5 text-navy group">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white shadow-lg shadow-navy/20 transition-transform group-hover:scale-105">
            <Sun className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="font-display text-2xl tracking-tight italic">SolarLedger</span>
        </a>
        <nav className="flex items-center gap-8">
          <a
            href="#how"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-[0.2em] text-slate hover:text-navy transition-colors"
          >
            Our Protocol
          </a>
          <a
            href="#calculator"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-[0.2em] text-slate hover:text-navy transition-colors"
          >
            ROI Engine
          </a>
        </nav>
      </div>
    </header>
  );
}
