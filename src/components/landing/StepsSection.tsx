import { motion } from "framer-motion";
import { Satellite, Cpu, Wallet } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Satellite,
    title: "Instant Roof Analysis",
    body: "Our AI scans satellite imagery of your roof in 60 seconds — measuring pitch, shading, and solar potential.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "Custom Engineering",
    body: "Licensed engineers design a system tuned to your home's exact usage profile and local utility rates.",
  },
  {
    n: "03",
    icon: Wallet,
    title: "Zero-Down Installation",
    body: "$0 upfront. Financing locks in below your current bill — start saving from month one.",
  },
];

export function StepsSection() {
  return (
    <section id="how" className="py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-cta mb-4">
            The Process
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-navy text-balance leading-[1.05]">
            Three steps to <span className="italic text-slate">ownership.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center justify-between mb-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-navy-foreground">
                  <s.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="font-mono text-sm font-semibold text-slate-light tracking-widest">
                  {s.n}
                </span>
              </div>
              <h3 className="font-display text-2xl text-navy mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="text-slate leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
