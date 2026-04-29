import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-radial-glow pointer-events-none" aria-hidden />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-slate mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            New 2026 federal incentives now active
          </div>

          <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl text-navy text-balance">
            Stop Renting Your Power.
            <br />
            <span className="italic text-slate">Lock in</span> Today's Energy
            <br className="hidden sm:block" /> Rates <span className="italic">Forever.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate text-balance max-w-xl mx-auto leading-relaxed">
            See how much you'll save over 25 years with AI-optimized solar panels.
          </p>

          <div className="mt-9 flex justify-center">
            <Button
              size="lg"
              onClick={scrollToReport}
              className="h-14 px-8 text-base font-semibold bg-cta hover:bg-cta-hover text-cta-foreground shadow-cta rounded-xl group"
            >
              Get My Solar ROI Report
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-navy" /> 12,000+ homes powered</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-light" />
            <span className="inline-flex items-center gap-2"><Award className="h-4 w-4 text-navy" /> NABCEP Certified</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-light" />
            <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-navy" /> A+ BBB Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
