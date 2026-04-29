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
    <section id="report" className="relative py-20 sm:py-28 bg-gradient-navy overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-grid pointer-events-none" aria-hidden />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-10"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-navy-foreground text-balance leading-[1.05]">
            Get your personalized <span className="italic text-slate-light">25-year</span> savings report.
          </h2>
          <p className="mt-4 text-slate-light text-lg">
            Free, no obligation. Delivered in under 60 seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl"
        >
          <div className="rounded-2xl bg-card shadow-elevated border border-border p-7 sm:p-9">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success mb-5">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl text-navy mb-2">
                  Your report is on its way.
                </h3>
                <p className="text-slate">
                  We're calculating your personalized savings and will send it to{" "}
                  <span className="font-semibold text-navy">{submitted.email}</span> in under 60 seconds.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="zip" className="text-sm font-medium text-navy">ZIP Code</Label>
                    <Input
                      id="zip"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="78701"
                      {...form.register("zip")}
                      className="h-11 rounded-lg"
                    />
                    {form.formState.errors.zip && (
                      <p className="text-xs text-destructive">{form.formState.errors.zip.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bill" className="text-sm font-medium text-navy">Monthly Bill ($)</Label>
                    <Input
                      id="bill"
                      type="number"
                      inputMode="numeric"
                      placeholder="250"
                      {...form.register("bill")}
                      className="h-11 rounded-lg"
                    />
                    {form.formState.errors.bill && (
                      <p className="text-xs text-destructive">{form.formState.errors.bill.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-navy">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jordan Rivera"
                    autoComplete="name"
                    {...form.register("name")}
                    className="h-11 rounded-lg"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-navy">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jordan@email.com"
                    autoComplete="email"
                    {...form.register("email")}
                    className="h-11 rounded-lg"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-13 py-4 text-base font-semibold bg-cta hover:bg-cta-hover text-cta-foreground shadow-cta rounded-xl group mt-2"
                >
                  Get My Solar ROI Report
                  <ArrowRight className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-light pt-1">
                  <Lock className="h-3 w-3" /> Your info is encrypted. We never sell data.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
