import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, TrendingUp } from "lucide-react";

const cities = [
  "Austin, TX", "Phoenix, AZ", "San Diego, CA", "Denver, CO", "Orlando, FL",
  "Charlotte, NC", "Las Vegas, NV", "Salt Lake City, UT", "Albuquerque, NM",
  "Sacramento, CA", "Tampa, FL", "Boise, ID", "Tucson, AZ", "Raleigh, NC",
  "Houston, TX", "Atlanta, GA", "Reno, NV", "Fresno, CA",
];

interface Notice {
  id: number;
  city: string;
  amount: number;
}

function pickNotice(id: number): Notice {
  return {
    id,
    city: cities[Math.floor(Math.random() * cities.length)],
    amount: Math.round((800 + Math.random() * 1600) / 20) * 20,
  };
}

export function LiveFeed() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [paused, setPaused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let id = 1;
    const initial = setTimeout(() => setNotice(pickNotice(id++)), 3000);
    const interval = setInterval(() => {
      if (paused) return;
      setNotice(null);
      setTimeout(() => setNotice(pickNotice(id++)), 350);
    }, 9000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [paused, dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-24 left-4 z-40 hidden sm:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {notice && (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-xl bg-card border border-border shadow-elevated pl-3 pr-2 py-3 max-w-[320px]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-success/10 text-success shrink-0">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-navy leading-snug">
                Someone in <span className="font-semibold">{notice.city}</span> just saved{" "}
                <span className="font-semibold">${notice.amount.toLocaleString()}/year</span>
              </p>
              <p className="text-[11px] text-slate-light mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                Live · just now
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="grid h-7 w-7 place-items-center rounded-md text-slate-light hover:text-navy hover:bg-muted transition-colors shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
