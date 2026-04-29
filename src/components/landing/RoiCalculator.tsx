import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "./AnimatedNumber";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function RoiCalculator() {
  const [bill, setBill] = useState(250);

  const yearly = bill * 12 * 0.7;
  const year1 = Math.round(yearly);
  const year10 = Math.round(yearly * 10);
  const total25 = Math.round(yearly * 25);

  // For the SVG graph
  const points = [
    { x: 0, y: 100 },
    { x: 25, y: 100 - (year1 / total25) * 80 },
    { x: 50, y: 100 - (year10 / total25) * 80 },
    { x: 100, y: 20 },
  ];
  const pathData = `M 0 100 Q 25 ${100 - (year1 / (yearly * 25)) * 100}, 50 ${100 - (year10 / (yearly * 25)) * 100} T 100 20`;

  return (
    <section id="calculator" className="relative py-32 sm:py-40 bg-surface/50 noise-overlay">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cta mb-6">
            <TrendingUp className="h-4 w-4" /> Live ROI Engine
          </div>
          <h2 className="text-5xl sm:text-6xl text-navy text-balance leading-[1.02]">
            Watch your savings <span className="italic font-light text-slate">multiply.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-3xl bg-card shadow-elevated border border-border overflow-hidden glass-panel">
            {/* Hero Visualization — midnight panel */}
            <div className="bg-gradient-navy px-8 sm:px-12 py-12 sm:py-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-center md:text-left">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-light/60 mb-4">
                    Projected 25-Year Savings
                  </p>
                  <div className="text-6xl sm:text-8xl text-white leading-none tracking-tight font-display italic">
                    <AnimatedNumber value={total25} prefix="$" />
                  </div>
                  <p className="mt-6 text-sm text-slate-light font-medium max-w-[240px]">
                    Based on your current monthly electric bill of <span className="text-white">${bill}</span>
                  </p>
                </div>

                {/* SVG Savings Curve */}
                <div className="w-full max-w-[320px] aspect-[4/3] relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,191,0,0.3)]">
                    <defs>
                      <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--cta))" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={pathData}
                      fill="none"
                      stroke="url(#curveGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={false}
                      animate={{ d: pathData }}
                      transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    />
                    {/* Points */}
                    <circle cx="100" cy="20" r="4" fill="hsl(var(--cta))" className="animate-pulse" />
                  </svg>
                  <div className="absolute bottom-0 left-0 text-[10px] text-slate-light/40 font-mono uppercase">Year 0</div>
                  <div className="absolute top-0 right-0 text-[10px] text-cta font-mono uppercase font-bold">Year 25</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="px-8 sm:px-12 py-10 border-b border-border/50">
              <div className="flex items-center justify-between mb-8">
                <label htmlFor="bill-slider" className="text-sm font-semibold text-navy uppercase tracking-wider">
                  Current Monthly Bill
                </label>
                <div className="text-4xl font-display italic text-navy">
                  ${bill}
                </div>
              </div>
              <Slider
                id="bill-slider"
                min={100}
                max={800}
                step={10}
                value={[bill]}
                onValueChange={(v) => setBill(v[0])}
                className="my-4"
              />
              <div className="mt-4 flex justify-between text-[10px] text-slate font-bold tracking-widest uppercase">
                <span>Starter ($100)</span>
                <span>Estate ($800+)</span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-3 border-b border-border/50">
              {[
                { label: "1 Year", value: year1, sub: "Immediate ROI" },
                { label: "10 Years", value: year10, sub: "Net Profit" },
                { label: "25 Years", value: total25, sub: "Total Wealth" },
              ].map((row) => (
                <div key={row.label} className="px-6 py-8 text-center group hover:bg-navy/[0.02] transition-colors border-r last:border-r-0 border-border/50">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate mb-3">
                    {row.label}
                  </p>
                  <div className="text-2xl sm:text-4xl text-navy mb-1 font-display italic">
                    <AnimatedNumber value={row.value} prefix="$" />
                  </div>
                  <p className="text-[10px] text-slate-light font-bold uppercase tracking-tighter">
                    {row.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-8 sm:px-12 py-8 bg-surface/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <p className="text-xs text-slate font-medium">
                  Updated with 2026 local utility rates.
                </p>
              </div>
              <Button
                onClick={scrollToReport}
                className="bg-solar-glow hover:bg-cta-hover text-cta-foreground font-bold shadow-cta rounded-2xl h-14 px-8 group whitespace-nowrap"
              >
                Get Full ROI Report
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
