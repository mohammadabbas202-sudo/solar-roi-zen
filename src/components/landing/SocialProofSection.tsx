import { Quote } from "lucide-react";

const proofCards = [
  {
    quote: "Our estimate came in fast and the final design landed within 8% of the projected first-year savings.",
    context: "A. Morales, Phoenix, AZ",
    metric: "Projected savings: $2,240/yr",
  },
  {
    quote: "Clear assumptions and no pressure. The report helped us compare solar vs staying fully on-grid with confidence.",
    context: "J. Carter, Austin, TX",
    metric: "Projected savings: $1,980/yr",
  },
  {
    quote: "The timeline and pricing breakdown felt realistic, and the utility-rate assumptions were easy to verify.",
    context: "N. Patel, Orlando, FL",
    metric: "Projected savings: $2,610/yr",
  },
];

export function SocialProofSection() {
  return (
    <section aria-label="Customer proof highlights" className="py-14 sm:py-20 bg-surface/40">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-navy mb-3">Homeowner Results</p>
          <h2 className="text-3xl sm:text-4xl text-navy">Realistic outcomes from recent report users</h2>
          <p className="mt-3 text-sm sm:text-base text-slate">
            These anonymized snapshots reflect planning estimates and customer-reported outcomes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {proofCards.map((card) => (
            <article key={card.context} className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <Quote className="h-5 w-5 text-cta mb-3" aria-hidden />
              <p className="text-sm text-slate leading-relaxed">{card.quote}</p>
              <p className="mt-4 text-xs font-semibold text-navy">{card.context}</p>
              <p className="mt-1 text-xs text-slate">{card.metric}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
