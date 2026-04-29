import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  zip: z.string().trim().regex(/^\d{5}$/, "Enter a valid 5-digit ZIP"),
  bill: z.coerce.number({ invalid_type_error: "Enter a number" }).min(20, "Min $20").max(2000, "Max $2,000"),
  name: z.string().trim().min(2, "Enter your name").max(80, "Too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
});

type FormValues = z.infer<typeof schema>;

export function LeadForm() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { zip: "", bill: undefined as unknown as number, name: "", email: "" },
    mode: "onTouched",
  });

  const onSubmit = (values: FormValues) => {
    setSubmitted(values);
  };

  return (
    <section id="report" className="relative py-32 sm:py-40 bg-gradient-navy overflow-hidden noise-overlay">
      <div className="absolute inset-0 opacity-[0.08] bg-grid pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-radial-glow pointer-events-none opacity-20" aria-hidden />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl text-white text-balance leading-[1.02]">
            Secure your <span className="italic font-light text-slate-light">25-year</span> savings report.
          </h2>
          <p className="mt-6 text-slate-light text-xl font-light">
            Free, no-obligation audit. Delivered in under 60 seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl"
        >
          <div className="rounded-3xl bg-white shadow-elevated border border-white/20 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-solar-glow opacity-50" />
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-3xl text-navy mb-4">
                  Report processing...
                </h3>
                <p className="text-slate text-lg">
                  Our AI is calculating your savings. We'll send the PDF to{" "}
                  <span className="font-bold text-navy">{submitted.email}</span> shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="text-xs font-bold uppercase tracking-widest text-slate">ZIP Code</Label>
                    <Input
                      id="zip"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="78701"
                      {...form.register("zip")}
                      className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                    />
                    {form.formState.errors.zip && (
                      <p className="text-[10px] font-bold text-destructive uppercase tracking-tight">{form.formState.errors.zip.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bill" className="text-xs font-bold uppercase tracking-widest text-slate">Monthly Bill</Label>
                    <Input
                      id="bill"
                      type="number"
                      inputMode="numeric"
                      placeholder="$250"
                      {...form.register("bill")}
                      className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                    />
                    {form.formState.errors.bill && (
                      <p className="text-[10px] font-bold text-destructive uppercase tracking-tight">{form.formState.errors.bill.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jordan Rivera"
                    autoComplete="name"
                    {...form.register("name")}
                    className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                  />
                  {form.formState.errors.name && (
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-tight">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jordan@email.com"
                    autoComplete="email"
                    {...form.register("email")}
                    className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                  />
                  {form.formState.errors.email && (
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-tight">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-16 py-4 text-lg font-bold bg-solar-glow hover:bg-cta-hover text-cta-foreground cta-glow rounded-2xl group mt-4 transition-all active:scale-[0.98]"
                >
                  Generate My ROI Report
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-light pt-2">
                  <Lock className="h-3 w-3" /> Encrypted & Private
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
