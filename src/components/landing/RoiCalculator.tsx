import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "./AnimatedNumber";
import { PRIMARY_CTA_LABEL } from "@/lib/copy";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("report-heading")?.focus();
};

interface RoiCalculatorProps {
  bill: number;
  onBillChange: (value: number) => void;
}

export function RoiCalculator({ bill, onBillChange }: RoiCalculatorProps) {

  const yearly = bill * 12 * 0.7;
  const utilityEscalation = 0.035;
  const year1 = Math.round(yearly);
  const year10 = Math.round(yearly * 10 * (1 + utilityEscalation));
  const total25 = Math.round(yearly * 25 * (1 + utilityEscalation * 1.4));

  // For the SVG graph
  const points = [
    { x: 0, y: 100 },
    { x: 25, y: 100 - (year1 / total25) * 80 },
    { x: 50, y: 100 - (year10 / total25) * 80 },
    { x: 100, y: 20 },
  ];
  const pathData = `M 0 100 Q 25 ${100 - (year1 / (yearly * 25)) * 100}, 50 ${100 - (year10 / (yearly * 25)) * 100} T 100 20`;

  return (
    <section id="calculator" className="relative py-24 sm:py-32 bg-surface/50 noise-overlay">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-navy mb-6">
            <TrendingUp className="h-4 w-4" /> Savings estimate
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-navy text-balance leading-[1.05]">
            Watch your savings grow over <span className="font-light text-slate">25 years.</span>
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
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-light/70 mb-4">
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
                  <div className="absolute bottom-0 left-0 text-[10px] text-slate-light/70 font-mono uppercase">Year 0</div>
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
              <p id="slider-help" className="text-xs text-slate mb-4">
                Use arrow keys for precise changes. Typical residential range shown below.
              </p>
              <Slider
                id="bill-slider"
                aria-describedby="slider-help"
                min={100}
                max={800}
                step={10}
                value={[bill]}
                onValueChange={(v) => onBillChange(v[0])}
                className="my-4"
              />
              <div className="mt-4 flex justify-between text-xs text-slate font-bold tracking-wide uppercase">
                <span>Lower bill home ($100)</span>
                <span>Higher bill home ($800+)</span>
              </div>
              <div className="mt-3 inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                Estimate updated instantly
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-3 border-b border-border/50">
              {[
                { label: "1 Year", value: year1, sub: "Estimated first-year bill reduction" },
                { label: "10 Years", value: year10, sub: "Estimated net savings vs grid-only costs" },
                { label: "25 Years", value: total25, sub: "Estimated lifetime savings projection" },
              ].map((row) => (
                <div key={row.label} className="px-6 py-8 text-center group hover:bg-navy/[0.02] transition-colors border-r last:border-r-0 border-border/50">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate mb-3">
                    {row.label}
                  </p>
                  <div className="text-2xl sm:text-4xl text-navy mb-1 font-display italic">
                    <AnimatedNumber value={row.value} prefix="$" />
                  </div>
                  <p className="text-[10px] text-slate-light font-bold tracking-tight">
                    {row.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-8 py-5 text-xs leading-relaxed text-slate bg-white/70 border-b border-border/50">
              The 1-year, 10-year, and 25-year values estimate your cumulative bill reduction over each period compared with staying fully on grid power.
            </div>

            <div className="grid gap-3 px-6 py-6 sm:grid-cols-4 sm:px-8 border-b border-border/50 bg-surface/40">
              <div className="rounded-xl border border-border/60 bg-white px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate">Solar offset</p>
                <p className="text-sm font-semibold text-navy">70% typical usage</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-white px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate">Utility escalation</p>
                <p className="text-sm font-semibold text-navy">3.5% annual projection</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-white px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate">Time horizon</p>
                <p className="text-sm font-semibold text-navy">1, 10, and 25 years</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-white px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate">Estimate type</p>
                <p className="text-sm font-semibold text-navy">Planning-grade projection</p>
              </div>
            </div>

            <details className="px-8 py-5 border-b border-border/50 bg-white">
              <summary className="cursor-pointer text-sm font-semibold text-navy">Why this estimate?</summary>
              <p className="mt-3 text-xs leading-relaxed text-slate">
                This is a planning estimate generated from your monthly bill input, a typical 70% offset, and 2026 utility-rate baselines.
                Final savings depend on your roof, equipment design, utility tariffs, and installation scope.
              </p>
              <p className="mt-2 text-xs text-slate">
                This tool is not a financing offer or guaranteed performance claim.
              </p>
            </details>

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
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
