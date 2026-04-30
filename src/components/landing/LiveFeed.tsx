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
    const initial = setTimeout(() => setNotice(pickNotice(id++)), 5000);
    const interval = setInterval(() => {
      if (paused) return;
      setNotice(null);
      setTimeout(() => setNotice(pickNotice(id++)), 350);
    }, 16000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [paused, dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-28 left-4 z-30 hidden lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {notice && (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 rounded-2xl glass-panel shadow-elevated pl-3.5 pr-2.5 py-3.5 max-w-[340px]"
          >
            <div className="relative">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success shrink-0">
                <TrendingUp className="h-5 w-5" />
              </span>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success border-2 border-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-navy leading-tight font-medium">
                Example Savings in <span className="text-success font-bold">{notice.city}</span>:{" "}
                <span className="font-bold underline decoration-success/30 decoration-2 underline-offset-2">${notice.amount.toLocaleString()}/yr</span>
              </p>
              <p className="text-xs text-slate font-semibold mt-1.5 flex items-center gap-1.5 opacity-70">
                Simulated preview activity
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate/40 hover:text-navy hover:bg-navy/5 transition-all shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
