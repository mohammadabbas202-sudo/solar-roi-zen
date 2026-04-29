# Implementation Plan: Visual Upgrade (Premium Boutique Experience)

This plan outlines the visual and structural refinements to elevate **Solar ROI Zen** to a premium, high-trust "Solar Fintech" brand.

## 1. Typography & Personality
- [ ] **Serif Headings:** Integrate *Cormorant Garamond* (or similar Google Font) for all `h1`, `h2`, and `h3` tags to evoke luxury and stability.
- [ ] **Geometric Sans UI:** Use *Inter* or *Manrope* for all UI elements, inputs, and body text.
- [ ] **Type Polish:** Apply `tracking-tighter` and `leading-[1.05]` to headings. Use "Display Italic" for key emphasis words.

## 2. Depth & Glassmorphism
- [ ] **Ambient Shadows:** Update `index.css` with multi-layered shadows (`shadow-elevated`).
- [ ] **Frosted Glass:** Apply `backdrop-blur-xl` and semi-transparent backgrounds to the ROI Calculator, Nav, and Live Feed.
- [ ] **Film Grain:** Add a subtle noise texture overlay to the entire page to remove "flatness."

## 3. Data Visualization (ROI Calculator)
- [ ] **Savings Curve:** Replace the static breakdown with a dynamic SVG or Recharts-based "Savings Curve" that updates as the slider moves.
- [ ] **Cost vs. Savings Comparison:** Visual bar chart showing "Grid Costs" (rising) vs. "Solar Investment" (fixed).

## 4. Color Palette Polish
- [ ] **Solar Glow Gradients:** Define new `bg-solar-glow` (Amber to Gold) for primary CTAs.
- [ ] **Midnight Indigo:** Shift the Navy base to a deeper, more modern Indigo (`hsl(224 71% 4%)`).
- [ ] **Emerald Accents:** Use deep emerald for success states and "Eco-Impact" metrics.

## 5. Trust Signals & Badges
- [ ] **Metallic Badges:** Redesign BBB and NABCEP markers as high-fidelity "Physical Badges" with silver/gold gradients and embossed effects.
- [ ] **Enhanced Live Feed:** Add tiny user avatars/icons to the live notification popups.

## 6. Layout Rhythm & White Space
- [ ] **Asymmetrical Hero:** Shift the Hero layout to be slightly asymmetrical for a more custom, non-template feel.
- [ ] **Breathing Room:** Increase vertical section padding (`py-20` -> `py-32`) to signal premium quality.

---

## 7. Excluded (As per user request)
- [ ] Interactive Refinement (Magnetic buttons, slider haptics, etc.)
