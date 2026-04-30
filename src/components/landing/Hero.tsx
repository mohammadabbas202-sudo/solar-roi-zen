import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA_LABEL } from "@/lib/copy";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("report-heading")?.focus();
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-48 sm:pb-28 noise-overlay">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-gradient-radial-glow pointer-events-none" aria-hidden />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-semibold tracking-wide text-navy mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            New 2026 Federal Incentives Active
          </div>

          <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl text-navy text-balance mb-8">
            Cut Your Power Bill by an Estimated
            <br />
            <span className="font-light text-slate">$2,100+</span> Per Year
            <br className="hidden sm:block" /> with Home Solar.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-slate text-balance max-w-2xl mx-auto leading-relaxed font-light">
            See your personalized 25-year savings estimate in under 60 seconds using local utility rates and your current monthly bill.
          </p>
          <p className="mt-3 text-sm text-slate">Own your energy future without guesswork.</p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={scrollToReport}
              aria-label="Scroll to the ROI report form"
              className="h-16 px-10 text-lg font-bold bg-solar-glow hover:bg-cta-hover text-cta-foreground cta-glow rounded-2xl group transition-all duration-300 active:scale-95"
            >
              {PRIMARY_CTA_LABEL}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <button 
              onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              className="h-16 px-8 text-navy font-semibold hover:bg-navy/5 rounded-2xl transition-colors"
            >
              Calculate Savings
            </button>
          </div>
          <p className="mt-4 text-xs font-semibold tracking-wide text-slate">
            Free estimate. No obligation. Your details stay private.
          </p>

          <div className="mt-14 rounded-2xl border border-border/70 bg-white/75 px-5 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate/90">
              <span className="inline-flex items-center gap-2.5"><ShieldCheck className="h-5 w-5 text-navy" /> 12,400+ homeowner reports delivered</span>
              <span className="inline-flex items-center gap-2.5"><Award className="h-5 w-5 text-success" /> NABCEP-certified partner network</span>
              <span className="inline-flex items-center gap-2.5"><Star className="h-5 w-5 text-success" /> 4.8/5 customer satisfaction average</span>
            </div>
            <p className="mt-2 text-center text-xs text-slate">
              Metrics from internal reporting data (2024-2026). Certification references available upon request.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
