import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA_LABEL } from "@/lib/copy";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("report-heading")?.focus();
};

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrolledPastHero = window.scrollY > window.innerHeight * 0.8;
        const formEl = document.getElementById("report");
        let formInView = false;
        if (formEl) {
          const rect = formEl.getBoundingClientRect();
          formInView = rect.top < window.innerHeight * 0.9;
        }
        setVisible(scrolledPastHero && !formInView);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(env(safe-area-inset-bottom),12px)] bg-gradient-to-t from-background via-background/95 to-background/0"
        >
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <Button
                onClick={scrollToReport}
                className="w-full h-13 py-4 text-base font-semibold bg-cta hover:bg-cta-hover text-cta-foreground shadow-cta rounded-xl group"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <p className="mt-2 text-center text-[11px] font-semibold text-slate">
                Free report. No obligation. Private details.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
