import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToReport = () => {
  document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.8;
      const formEl = document.getElementById("report");
      let formInView = false;
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        formInView = rect.top < window.innerHeight * 0.9;
      }
      setVisible(scrolledPastHero && !formInView);
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
            <Button
              onClick={scrollToReport}
              className="w-full h-13 py-4 text-base font-semibold bg-cta hover:bg-cta-hover text-cta-foreground shadow-cta rounded-xl group"
            >
              Get My ROI Report
              <ArrowRight className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
