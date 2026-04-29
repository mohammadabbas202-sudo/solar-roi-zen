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
    <section id="how" className="py-32 sm:py-40 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cta mb-6">
            Our Protocol
          </div>
          <h2 className="text-5xl sm:text-6xl text-navy text-balance leading-[1.02]">
            Three steps to energy <span className="italic font-light text-slate">ownership.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/20">
                  <s.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <span className="font-display text-4xl italic text-slate-light/20 group-hover:text-cta/40 transition-colors duration-500">
                  {s.n}
                </span>
              </div>
              <h3 className="text-2xl text-navy mb-4 font-display italic">
                {s.title}
              </h3>
              <p className="text-slate text-lg leading-relaxed font-light">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
