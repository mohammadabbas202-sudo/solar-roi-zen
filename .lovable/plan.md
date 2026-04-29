## Solar ROI Landing Page — Plan

A single-page, mobile-first landing page with a premium FinTech aesthetic. Focused entirely on financial ROI. One primary CTA repeated strategically: **Get My Solar ROI Report**.

### Design system

- **Palette** (HSL tokens in `index.css`):
  - Deep Navy `#0F172A` — background / primary
  - Slate Gray `#475569` / `#94A3B8` — secondary text, muted surfaces
  - Crisp White `#FFFFFF` — cards, contrast text
  - Vibrant Orange `#F97316` — CTA only (used sparingly for max contrast)
- **Type**: Inter (already default-friendly), tight tracking on headlines, generous line-height on body.
- **Feel**: lots of whitespace, hairline borders, subtle shadows, rounded-2xl cards. No gradients on CTAs — flat orange for trust.
- **Motion**: Framer Motion fade-in + slide-up on scroll for sections; animated number counter on ROI figures.

### Page sections

**1. Sticky top nav (minimal)**
- Small logo mark (Sun icon + "SolarLedger" wordmark or similar placeholder), single ghost link "How it works", no CTA in nav (keeps focus on hero CTA).

**2. Hero**
- Headline: *"Stop Renting Your Power. Lock in Today's Energy Rates Forever."*
- Subtext: *"See how much you'll save over 25 years with AI-optimized solar panels."*
- Centered orange CTA → smooth-scrolls to lead form.
- Trust bar below CTA: "12,000+ homes powered • NABCEP Certified • A+ BBB" with Lucide icons (ShieldCheck, Award, Star).

**3. Interactive ROI Calculator** (the centerpiece)
- shadcn `Card` with shadcn `Slider`, range $100–$800, default $250, step $10.
- Live-updating figures (animated counter, Framer Motion):
  - **Total 25-Year Savings** (large, hero number) — formula: `bill × 12 × 25 × 0.7`
  - **Year 1 Savings** — `bill × 12 × 0.7`
  - **Year 10 Cumulative** — `bill × 12 × 10 × 0.7`
  - **Year 25 Cumulative** — same as total (reinforces scale)
- Small caption: "Estimate based on current grid rates and 70% offset. Actual savings vary."
- Inline mini-CTA below: "Get My Solar ROI Report" → scrolls to form.

**4. Three Steps to Ownership**
- 3-column grid (stacks on mobile), each a card with Lucide icon + step number badge:
  - Step 1 — **Instant Roof Analysis** (Satellite icon) — "Our AI scans your roof in 60 seconds."
  - Step 2 — **Custom Engineering** (Cpu icon) — "Engineers design a system tuned to your usage."
  - Step 3 — **Zero-Down Installation** (Wallet icon) — "$0 upfront. Start saving from month one."

**5. Live Savings Feed**
- Floating toast-style card, bottom-left, fixed position, appears ~3s after page load.
- Randomly generated every 8–10s from pools of US cities + savings amounts ($800–$2,400/yr).
- Format: "Someone in **Austin, TX** just saved **$1,420/year**."
- Small green pulse dot, dismissible (X), pauses on hover, hidden on viewports < 480px to avoid covering the form.

**6. Final Conversion Zone (lead capture)**
- Centered card on navy background, white card, anchor `#report`.
- Headline: "Get Your Personalized 25-Year Savings Report"
- Subtext: "Free, no obligation. Delivered in under 60 seconds."
- 4 fields (zod-validated, inline errors): Zip Code (5 digits), Monthly Bill Amount ($), Name, Email.
- Full-width orange CTA: **Get My Solar ROI Report**.
- On submit → success state replaces the form: green check, "Your report is on its way to {email}." (frontend only, no storage.)

**7. Footer**
- Slim navy footer: copyright, tiny disclaimer about estimate accuracy, no links to distract.

### Sticky mobile CTA

- Fixed bottom bar with the orange CTA, fades in via Framer Motion **after the user scrolls past the hero**, fades out when the lead form enters the viewport (IntersectionObserver). Mobile-first, also visible on desktop below `md`.

### Technical notes

- Stack already in place: React + Vite + Tailwind + shadcn/ui + Lucide. Will add `framer-motion` and `zod` (react-hook-form already compatible via shadcn `Form`).
- Update `src/index.css` design tokens: navy background, slate text, orange `--cta` token. Update `tailwind.config.ts` with semantic colors and fade/slide keyframes.
- New components under `src/components/landing/`:
  - `Hero.tsx`, `TrustBar.tsx`, `RoiCalculator.tsx`, `AnimatedNumber.tsx`, `StepsSection.tsx`, `LiveFeed.tsx`, `LeadForm.tsx`, `StickyCta.tsx`, `Footer.tsx`.
- `src/pages/Index.tsx` composes the sections in order.
- All copy lives in component files (easy to edit later).
- Accessibility: semantic landmarks, focus rings on CTA, slider has `aria-label`, form errors announced, live feed `aria-live="polite"`.
- Lead form is frontend-only — submit shows success state, no network call.

### Out of scope (per your answers)

- No database / no email sending on form submit.
- No chart in the calculator (breakdown numbers only).
- No real-data live feed (randomly generated from curated pools).
