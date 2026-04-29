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

  return (
    <section id="calculator" className="relative py-20 sm:py-28 bg-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-cta mb-4">
            <TrendingUp className="h-3.5 w-3.5" /> Savings Calculator
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-navy text-balance leading-[1.05]">
            See your 25-year savings <span className="italic text-slate">in real time.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-2xl bg-card shadow-elevated border border-border overflow-hidden">
            {/* Hero number — navy panel */}
            <div className="bg-gradient-navy px-6 sm:px-10 py-10 sm:py-12 text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-light mb-3">
                Total 25-Year Savings
              </p>
              <div className="font-display text-[3.5rem] sm:text-7xl text-navy-foreground leading-none tracking-tight">
                <AnimatedNumber value={total25} prefix="$" />
              </div>
              <p className="mt-4 text-sm text-slate-light">
                Based on a ${bill}/month current electric bill
              </p>
            </div>

            {/* Slider */}
            <div className="px-6 sm:px-10 py-8 border-b border-border">
              <div className="flex items-baseline justify-between mb-5">
                <label htmlFor="bill-slider" className="text-sm font-medium text-slate">
                  Your current monthly electric bill
                </label>
                <div className="font-mono text-2xl font-semibold text-navy tabular-nums">
                  ${bill}
                </div>
              </div>
              <Slider
                id="bill-slider"
                aria-label="Monthly electric bill"
                min={100}
                max={800}
                step={10}
                value={[bill]}
                onValueChange={(v) => setBill(v[0])}
                className="my-3"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-light font-mono">
                <span>$100</span>
                <span>$800</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { label: "Year 1", value: year1 },
                { label: "Year 10", value: year10 },
                { label: "Year 25", value: total25 },
              ].map((row) => (
                <div key={row.label} className="px-3 sm:px-6 py-6 text-center">
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-light mb-2">
                    {row.label}
                  </p>
                  <div className="font-display text-xl sm:text-3xl text-navy tabular-nums">
                    <AnimatedNumber value={row.value} prefix="$" />
                  </div>
                </div>
              ))}
            </div>

            {/* Inline CTA */}
            <div className="px-6 sm:px-10 py-7 bg-surface flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
              <p className="text-sm text-slate text-center sm:text-left">
                Estimate based on current grid rates and 70% offset. Actual savings vary.
              </p>
              <Button
                onClick={scrollToReport}
                className="bg-cta hover:bg-cta-hover text-cta-foreground font-semibold shadow-cta rounded-xl h-11 px-5 group whitespace-nowrap"
              >
                Get My Solar ROI Report
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
