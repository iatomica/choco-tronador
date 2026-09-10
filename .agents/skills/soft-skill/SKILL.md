---
name: soft-skill
description: >-
  High-end visual design and motion choreography skill for luxury, gourmet, and agency-tier interfaces.
  Defines nested bezel card structures, refined micro-aesthetics, subtle grain, and fluid spring physics.
  Ideal for premium consumer brands like artisanal chocolates and boutique experiences.
---

# Soft Skill: High-End Visual Design & Micro-Aesthetics

## 1. Core Directives
Deliver an experience that feels handcrafted, calm, and unmistakably premium. Every element should feel physical and tactile rather than digital and flat.

## 2. Strict Anti-Patterns
- **No generic fonts:** Avoid browser default fonts and generic Inter. Use characterful typography (`Geist`, `Cabinet Grotesk`, `PP Editorial New`, `Cormorant Garamond`, `Satoshi`).
- **No harsh black shadows:** Use soft, diffused shadows tinted to the background hue.
- **No linear easing:** Use spring physics or custom cubic-beziers (`cubic-bezier(0.32, 0.72, 0, 1)`).
- **No flat zero-depth cards:** Apply depth, micro-borders, or nested enclosures.

## 3. Micro-Aesthetics & Component Mastery

### A. The "Double-Bezel" (Nested Architecture)
Rather than placing a card flatly on the background:
- **Outer Shell:** Wrapper element with subtle background (`bg-black/5` or `bg-white/5`), a hairline outer border (`border border-black/5 dark:border-white/10`), padding (`p-2`), and a generous radius (`rounded-3xl` or `rounded-[2rem]`).
- **Inner Core:** The actual card content with its own background, subtle inner highlight (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`), and a concentric inner radius (`rounded-[calc(2rem-0.5rem)]`).

### B. Nested "Island" Button Architecture
- Primary CTA buttons should be comfortable pills (`rounded-full px-6 py-3.5`).
- Trailing icons or arrows should be nested in their own circular badge (`w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center`).

### C. Generous Whitespace
- Sections must breathe heavily: use `py-24` to `py-36` on desktop.
- Let imagery and fine typography take center stage.

## 4. Performance & Mobile Rules
- Animate exclusively using `transform` and `opacity`.
- Below `768px`, collapse asymmetric layouts cleanly to single columns (`w-full`, `px-4`, `py-8`).
- Never use `h-screen`; always use `min-h-[100dvh]`.
