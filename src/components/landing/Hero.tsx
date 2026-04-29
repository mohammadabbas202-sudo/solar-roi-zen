import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-48 sm:pb-36 noise-overlay">
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

          <h1 className="text-[2.75rem] leading-[1.02] sm:text-7xl md:text-8xl text-navy text-balance mb-8">
            Stop Renting Your Power.
            <br />
            <span className="italic font-light text-slate">Lock in</span> Today's Energy
            <br className="hidden sm:block" /> Rates <span className="italic font-light">Forever.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-2xl text-slate text-balance max-w-2xl mx-auto leading-relaxed font-light">
            Empower your home with AI-optimized solar technology. See your 25-year guaranteed savings in under 60 seconds.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={scrollToReport}
              className="h-16 px-10 text-lg font-bold bg-solar-glow hover:bg-cta-hover text-cta-foreground cta-glow rounded-2xl group transition-all duration-300 active:scale-95"
            >
              Get My Solar ROI Report
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <button 
              onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              className="h-16 px-8 text-navy font-semibold hover:bg-navy/5 rounded-2xl transition-colors"
            >
              Calculate Savings
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-slate/80">
            <span className="inline-flex items-center gap-2.5"><ShieldCheck className="h-5 w-5 text-success" /> 12k+ Homes Powered</span>
            <span className="inline-flex items-center gap-2.5"><Award className="h-5 w-5 text-success" /> NABCEP Certified</span>
            <span className="inline-flex items-center gap-2.5"><Star className="h-5 w-5 text-success" /> A+ BBB Rated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
