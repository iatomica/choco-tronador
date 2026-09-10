---
name: redesign-skill
description: >-
  Upgrades existing websites, apps, and UI components to premium quality. Audits current design,
  identifies generic AI patterns, and applies high-end design standards without breaking functionality.
  Use this skill when auditing, refactoring, or polishing existing UI code.
---

# Redesign Skill: Frontend & UI Quality Audit

## Workflow

1. **Scan**: Inspect the codebase, styling system (Tailwind, Vanilla CSS, etc.), and existing component patterns.
2. **Diagnose**: Run through the checklist below to flag generic AI tells, weak typography, inconsistent spacing, or missing states.
3. **Fix**: Apply targeted, high-impact improvements without rewriting from scratch.

## Design Audit Checklist

### Typography
- **Default fonts:** Replace browser defaults or generic Inter with distinctive type (`Geist`, `Cabinet Grotesk`, `Satoshi`, `Outfit`, or premium serif for artisanal brands like `Cormorant Garamond` or `Playfair`).
- **Headlines:** Give headlines presence with tighter tracking and deliberate leading.
- **Body width:** Restrict body text to max `65ch` with generous line-height (`leading-relaxed`).
- **Orphan prevention:** Use `text-wrap: balance` or `text-wrap: pretty`.

### Color & Surfaces
- **No pure `#000000`:** Use off-black, deep charcoal, or tinted dark tones (`#0a0a0a`, `#121212`, rich cacao darks).
- **Single accent color:** Pick one primary accent color and use it consistently.
- **Shadows:** Tint shadows to the background hue instead of pure black drop shadows.
- **Surface depth:** Add subtle background imagery, ambient gradients, or fine micro-textures to prevent flat, sterile voids.

### Layout & Alignment
- **Anti-symmetry:** Break cookie-cutter 3-column cards with asymmetrical grids, 50/50 splits, or horizontal scroll moments.
- **Mobile stability:** Use `min-h-[100dvh]` instead of `h-screen`.
- **Vertical baseline alignment:** In side-by-side cards, align titles, descriptions, and pin CTA buttons to the bottom so buttons form a clean horizontal line.

### Interactive States & Polish
- **Full state cycles:** Every interactive element must have hover (`scale-[1.02]`, color shift), active/pressed (`scale-[0.98]`, `-translate-y-[1px]`), and focus rings for keyboard accessibility.
- **Feedback:** Add skeletal loaders and empty states instead of raw blank screens or generic circular spinners.
- **Hardware acceleration:** Animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`.

## Fix Priority Order
1. **Font & Typography swap** (highest visual lift, lowest risk)
2. **Color palette unification** (lock 1 accent, eliminate clashing grays)
3. **Hover & tactile feedback** (brings the interface alive)
4. **Layout & whitespace breathing room**
5. **Component replacements** (swap generic 3-card rows for asymmetrical/bento layouts)
