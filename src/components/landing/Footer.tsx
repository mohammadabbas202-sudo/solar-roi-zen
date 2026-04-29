import { Sun } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-slate-light py-10 border-t border-white/5">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-5 text-sm">
        <div className="flex items-center gap-2 text-navy-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white/10">
            <Sun className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight">SolarLedger</span>
        </div>
        <p className="text-xs text-center sm:text-right max-w-md leading-relaxed">
          Savings estimates are illustrative and based on average grid rates and a 70% solar offset.
          Actual figures depend on your roof, location, and utility provider.
        </p>
        <p className="text-xs">© {new Date().getFullYear()} SolarLedger</p>
      </div>
    </footer>
  );
}
