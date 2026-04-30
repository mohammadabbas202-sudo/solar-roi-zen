import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRIMARY_CTA_LABEL } from "@/lib/copy";

const schema = z.object({
  zip: z.string().trim().regex(/^\d{5}$/, "Use a 5-digit ZIP code"),
  bill: z.coerce.number({ invalid_type_error: "Enter your monthly bill" }).min(20, "Use $20 or more").max(2000, "Use $2,000 or less"),
  name: z.string().trim().max(80, "Too long").optional(),
  email: z.string().trim().email("Use a valid email address").max(255),
});

type FormValues = z.infer<typeof schema>;

interface LeadFormProps {
  initialBill: number;
}

export function LeadForm({ initialBill }: LeadFormProps) {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { zip: "", bill: initialBill, name: "", email: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    form.setValue("bill", initialBill, { shouldDirty: false, shouldValidate: true });
  }, [form, initialBill]);

  const onSubmit = (values: FormValues) => {
    setSubmitted(values);
  };

  const goToStepTwo = async () => {
    const valid = await form.trigger(["zip", "bill", "email"]);
    if (valid) setStep(2);
  };

  return (
    <section id="report" className="relative py-24 sm:py-32 bg-gradient-navy overflow-hidden noise-overlay">
      <div className="absolute inset-0 opacity-[0.08] bg-grid pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-radial-glow pointer-events-none opacity-20" aria-hidden />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <h2 id="report-heading" tabIndex={-1} className="text-4xl sm:text-5xl lg:text-6xl text-white text-balance leading-[1.05]">
            Secure your <span className="font-light text-slate-light">25-year</span> savings report.
          </h2>
          <p className="mt-6 text-slate-light text-lg sm:text-xl font-light">
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
                  Your report request is confirmed
                </h3>
                <p className="text-slate text-lg leading-relaxed">
                  Your advisor-prepared ROI report is being generated now. We will email it to{" "}
                  <span className="font-bold text-navy">{submitted.email}</span> shortly.
                </p>
                <p className="mt-3 text-sm text-slate">
                  Expect delivery in 1-3 minutes. No obligation and no spam.
                </p>
                <ul className="mt-4 space-y-1 text-xs text-slate">
                  <li>1. Check your inbox for the ROI report PDF.</li>
                  <li>2. Review assumptions and projected ranges.</li>
                  <li>3. Reply to schedule a no-pressure consult.</li>
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSubmitted(null)}
                  className="mt-6 rounded-xl"
                >
                  Correct my email
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <p className="text-xs text-slate text-center">Step {step} of 2</p>
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="zip" className="text-xs font-bold uppercase tracking-widest text-slate">ZIP Code</Label>
                        <Input
                          id="zip"
                          inputMode="numeric"
                          maxLength={5}
                          placeholder="78701"
                          aria-invalid={!!form.formState.errors.zip}
                          aria-describedby={form.formState.errors.zip ? "zip-error" : undefined}
                          {...form.register("zip")}
                          className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                        />
                        {form.formState.errors.zip && (
                          <p id="zip-error" role="alert" className="text-xs font-semibold text-destructive">{form.formState.errors.zip.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bill" className="text-xs font-bold uppercase tracking-widest text-slate">Average Monthly Bill</Label>
                        <Input
                          id="bill"
                          type="number"
                          inputMode="numeric"
                          placeholder="250"
                          aria-invalid={!!form.formState.errors.bill}
                          aria-describedby={form.formState.errors.bill ? "bill-error" : undefined}
                          {...form.register("bill")}
                          className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                        />
                        {form.formState.errors.bill && (
                          <p id="bill-error" role="alert" className="text-xs font-semibold text-destructive">{form.formState.errors.bill.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                        aria-invalid={!!form.formState.errors.email}
                        aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                        {...form.register("email")}
                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                      />
                      {form.formState.errors.email && (
                        <p id="email-error" role="alert" className="text-xs font-semibold text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={goToStepTwo}
                      className="w-full h-14 py-4 text-base font-bold bg-solar-glow hover:bg-cta-hover text-cta-foreground cta-glow rounded-2xl group"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate">Full Name (optional)</Label>
                      <Input
                        id="name"
                        placeholder="Jordan Rivera"
                        autoComplete="name"
                        aria-invalid={!!form.formState.errors.name}
                        aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                        {...form.register("name")}
                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-cta/20"
                      />
                      {form.formState.errors.name && (
                        <p id="name-error" role="alert" className="text-xs font-semibold text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 rounded-xl">
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="h-12 text-sm sm:text-base font-bold bg-solar-glow hover:bg-cta-hover text-cta-foreground cta-glow rounded-xl group transition-all active:scale-[0.98]"
                      >
                        {PRIMARY_CTA_LABEL}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </>
                )}

                <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate pt-2">
                  <Lock className="h-3 w-3" /> Encrypted and private. No obligation.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
