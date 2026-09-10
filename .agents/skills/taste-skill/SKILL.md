---
name: taste-skill
description: >-
  Anti-slop frontend engineering skill for landing pages, web interfaces, portfolios, and redesigns.
  Use this skill whenever creating or modifying UI components, styling, layout, typography, colors,
  and animations to ensure high-end, premium quality without AI-generated generic patterns.
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, brand websites, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event / artisanal brand), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. gourmet chocolate connoisseur. The audience picks the aesthetic, not generic AI defaults.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns or brand sites, these are starting material, not optional input (see Section 11).
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, premium food/craft. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: \<page kind> for \<audience>, with a \<vibe> language, leaning toward \<design system or aesthetic family>."**

Example reads:
- *"Reading this as: artisanal gourmet brand showcase for premium consumers, with a rich tactile and editorial language, leaning toward Tailwind utilities + warm organic neutrals + subtle motion."*
- *"Reading this as: B2B SaaS landing for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion."*
- *"Reading this as: solo designer portfolio for hiring managers, with an editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + custom typography."*

### 0.C If the brief is ambiguous, ask one question, do not guess
Ask exactly **one** clarifying question - never a multi-question dump - and only when the design read genuinely diverges. Example: *"Should this feel closer to tactile artisanal craft or minimalist modern elegance?"*

If you can confidently infer from context, **do not ask**. Just declare the design read and proceed.

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials. Every layout, motion, and density decision below is gated by these.

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`. Use these unless the design read overrides them. Do not ask the user to edit this file - overrides happen conversationally.

### 1.A Dial Inference (design read → dial values)
| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / artisanal / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |
| "redesign - preserve" | match existing | +1 | match existing |
| "redesign - overhaul" | +2 | +2 | match existing |

### 1.B Use-Case Presets
| Use case | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Landing (SaaS, mainstream) | 7 | 6 | 4 |
| Landing (Agency / creative) | 9 | 8 | 3 |
| Landing (Premium consumer / artisanal brand) | 7 | 6 | 3 |
| Portfolio (Designer / studio) | 8 | 7 | 3 |
| Portfolio (Developer) | 6 | 5 | 4 |
| Editorial / Blog | 6 | 4 | 3 |
| Public-sector service | 3 | 2 | 5 |
| Redesign - preserve | match | match+1 | match |
| Redesign - overhaul | +2 | +2 | match |

### 1.C How the Dials Drive Output
Use these (or user-overridden values) as global variables. Cross-references throughout this document refer to these exact variable names - never invent aliases like `LAYOUT_VARIANCE` or `ANIM_LEVEL`.

---

## 2. BRIEF → DESIGN SYSTEM MAP

Once you have the design read (Section 0) and dials (Section 1), pick the right foundation. Do not invent CSS for things that have an official package. Do not pretend an aesthetic trend is an official system.

### 2.A When to reach for a real design system (use official packages)
| Brief reads as… | Reach for | Why |
|---|---|---|
| Microsoft / enterprise SaaS / dashboards | `@fluentui/react-components` | Official Fluent UI, accessibility done |
| Google-ish UI, Material-flavored product | `@material/web` + Material 3 tokens | Official, theme-able via Material Theming |
| IBM-style B2B / enterprise analytics | `@carbon/react` + `@carbon/styles` | Official Carbon, mature data-density patterns |
| Shopify app surfaces | `polaris.js` web components / Polaris React | Required for Shopify admin UI |
| Atlassian / Jira-style product | `@atlaskit/*` + `@atlaskit/tokens` | Official Atlassian DS |
| Modern accessible React foundation | `@radix-ui/themes` | Primitives + polished theme |
| Modern SaaS where you own the components | shadcn/ui (`npx shadcn@latest add ...`) | You own the code, easy to customise; never ship default state |
| Tailwind-based modern web / brand marketing | Tailwind v4 utilities + `dark:` variant | Default for indie, artisanal, and creative builds |

**One system per project.** Do not mix disparate design systems in the same tree.

### 2.B When the brief is an aesthetic, not a system
| Aesthetic | Honest implementation |
|---|---|
| Glassmorphism / "frosted glass" | `backdrop-filter`, layered borders, highlight overlays. Solid fallback for `prefers-reduced-transparency`. |
| Bento (Apple-style tile grids) | CSS Grid with mixed cell sizes. No single library owns this. |
| Brutalism | Native CSS, monospace, raw borders. No library. |
| Editorial / magazine / artisanal | Serif/grotesk harmony, asymmetric grid, generous whitespace. |
| Dark tech / modern minimal | Mono + singular accent, high-contrast typography. |
| Kinetic typography | Native CSS animations, scroll-driven animations, GSAP for hijacks. |

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

### 3.A Stack
* **Framework:** React or Next.js or Vanilla HTML/CSS/JS (depending on project setup). Default to Server Components (RSC) when in Next.js.
  * **INTERACTIVITY ISOLATION:** Any component using Motion, scroll listeners, or pointer physics MUST be an isolated leaf with `'use client'` at the top.
* **Styling:** **Tailwind v4** (default) or refined Vanilla CSS.
* **Animation:** **Motion** (`motion/react`) or GSAP for pinned scroll-hijacking.
* **Fonts:** Always self-host or use Google Fonts properly with `font-display: swap`. Never render browser default fonts.

### 3.B State
* Local state for isolated UI.
* **NEVER** use `useState` to track continuous values driven by user input (mouse position, scroll progress, pointer physics). Use Motion's `useMotionValue` / `useTransform` / `useScroll` or `requestAnimationFrame` outside React render loops.

### 3.C Icons
* **Allowed libraries:** `@phosphor-icons/react`, `hugeicons-react`, `@radix-ui/react-icons`, `@tabler/icons-react`.
* **Discouraged:** generic thick Lucide as default without refinement.
* **NEVER hand-roll SVG icons.** Use verified SVG libraries.
* **One family per project.** Standardize `strokeWidth` globally (e.g. `1.5` or `2.0`).

### 3.D Emoji Policy
Discouraged by default in code, markup, and visible text. Replace symbols with icon-library glyphs or deliberate graphic marks.

### 3.E Responsiveness & Layout Mechanics
* Standardize breakpoints (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).
* Contain page layouts using `max-w-[1400px] mx-auto` or `max-w-7xl`.
* **Viewport Stability:** NEVER use `h-screen` for full-height Hero sections. ALWAYS use `min-h-[100dvh]` to prevent layout jumping on mobile (iOS Safari address bar).
* **Grid over Flex-Math:** NEVER use complex flexbox percentage math (`w-[calc(33%-1rem)]`). ALWAYS use CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`).

---

## 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

LLMs default to clichés. Override these defaults proactively.

### 4.1 Typography
* **Display / Headlines:** Default `text-4xl md:text-6xl tracking-tighter leading-none`.
* **Body / Paragraphs:** Default `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
* **Sans font choice:**
  * **Discouraged as default:** `Inter`. Pick `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`, or an intentional brand font.
* **SERIF DISCIPLINE:**
  * Serif is only acceptable when the brand brief calls for it (e.g. luxury, gourmet food/chocolate, editorial heritage) AND you can articulate why this specific serif fits.
  * **BANNED as default crutches:** `Fraunces` and `Instrument_Serif` (overused AI defaults).
  * If a serif is justified for an artisanal brand: PP Editorial New, Cormorant Garamond, Playfair Display, Ogg, Recoleta, Saol Display, Canela.
  * **EMPHASIS RULE:** When emphasizing a word in a headline, use italic or bold of the **same font**. Do not inject a random serif word into a sans headline.
* **ITALIC DESCENDER CLEARANCE:** When italic is used in display type with letters `y g j p q`, use `leading-[1.1]` minimum and add `pb-1` reserve so descenders aren't clipped.

### 4.2 Color Calibration
* Max 1 accent color. Saturation < 80% by default.
* **THE LILA RULE:** The "AI Purple / Blue glow" aesthetic is banned as a default. No automatic purple button glows, no random neon gradients. Use neutral bases (warm stone, zinc, charcoal) with high-contrast singular accents (Warm Amber, Deep Cacao, Terracotta, Forest, Burnt Orange).
* **COLOR CONSISTENCY LOCK:** Once an accent color is chosen, it is used on the WHOLE page. Pick one accent, lock it.
* **PREMIUM CONSUMER PALETTE DISCIPLINE:** Do not use the tired "AI brass + beige + espresso" cliché (#f5f1ea + #b08947). For artisanal brands, seek authentic rich tones: deep bittersweet cacao, warm cream, raw paper, single saturated accents, terracotta, or forest tones.

### 4.3 Layout Diversification
* **ANTI-CENTER BIAS:** Centered Hero sections are avoided when `DESIGN_VARIANCE > 4`. Use Split Screen (50/50), Left-aligned content with right-aligned visual asset, or asymmetric negative space.

### 4.4 Materiality, Shadows, Cards
* Use cards ONLY when elevation communicates real hierarchy. Otherwise group with subtle borders or negative space.
* Tint shadows to the background hue. No pure-black drop shadows on light backgrounds.
* **SHAPE CONSISTENCY LOCK:** Pick ONE corner-radius scale for the page and stick to it (all-sharp, all-soft 12-16px, or documented hybrid).

### 4.5 Interactive UI States
Always implement full interactive cycles:
* **Loading:** Skeletal loaders matching the final layout shape.
* **Empty States:** Beautifully composed; indicate how to populate.
* **Error States:** Clear, inline error messages.
* **Tactile Feedback:** On `:active`, use `-translate-y-[1px]` or `scale-[0.98]` to simulate physical press.
* **BUTTON CONTRAST CHECK (WCAG AA):** Minimum 4.5:1 contrast for button labels.
* **CTA BUTTON WRAP BAN:** Primary CTA labels must fit on one line at desktop (1-3 words max).
* **NO DUPLICATE CTA INTENT:** Use one clear CTA label per intent across the page.

### 4.7 Layout Discipline (Hard Rules)
* **Hero MUST fit in initial viewport:** Headline max 2 lines on desktop, subtext max 20 words, CTAs visible without scroll.
* **HERO TOP PADDING CAP:** Max `pt-24` (≈6rem) at desktop.
* **HERO STACK DISCIPLINE (Max 4 text elements):** Eyebrow (optional) + Headline + Subtext + CTAs. No clutter in the hero.
* **Trust / Logo Wall lives UNDER the hero, not inside it.**
* **Navigation on a single line on desktop:** Max height 80px (default 64-72px).
* **BENTO CELL COUNT RULE:** Exact cells for exact content (no empty tiles).
* **Section-Layout-Repetition Ban:** At least 4 different layout families across a full landing page.
* **EYEBROW RESTRAINT:** Maximum 1 eyebrow per 3 sections.
* **SPLIT-HEADER BAN:** Avoid "giant left headline + floating right paragraph" as a default; stack cleanly.

### 4.8 Image & Visual Asset Strategy
* **Real visuals over text-only pages:** Use generated images (`generate_image`), curated stock, or Picsum seeds (`https://picsum.photos/seed/...`).
* **NO div-based fake screenshots:** Never build fake mockups out of styled `<div>`s.
* **Social proof:** Real SVGs (Simple Icons) or clean monograms, never plain unstyled text.

### 4.9 Content & Copy Self-Audit
* **Short headlines:** ≤ 8 words. Sub-paragraphs ≤ 25 words.
* **NO fake-precise numbers** (`99.9%`, `4.1x`) without real data.
* **NO AI buzzwords:** Banned: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Delve", "Tapestry".
* **NO generic names:** Use authentic, realistic names and content.

### 4.10 Em-Dash Ban (Hard Constraint)
* **Em-dash (`—`) is COMPLETELY BANNED.** Use hyphens `-`, colons, parentheses, or periods.

---

## 5. MOTION CHOREOGRAPHY

* **Motion claimed = motion shown:** If `MOTION_INTENSITY > 4`, the page must actually move with entrance transitions, hover physics, or scroll reveals.
* **MOTION MUST BE MOTIVATED:** Every animation must serve hierarchy, feedback, storytelling, or state transition.
* **MARQUEE MAX-ONE-PER-PAGE:** Never use multiple scrolling marquees on the same page.
* **Canonical GSAP Sticky-Stack & Horizontal-Pan:** Always use `start: "top top"`, `pin: true`, with proper cleanup (`ctx.revert()`).
* **Reduced Motion:** Always wrap animations with `useReducedMotion()` or `@media (prefers-reduced-motion: reduce)`.

---

## 6. FINAL PRE-FLIGHT CHECK

Before declaring any UI task done, verify every item:
- [ ] **Brief inference declared?**
- [ ] **Dials set with intent (`DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`)?**
- [ ] **ZERO em-dashes (`—`) anywhere in the code or text?**
- [ ] **One consistent theme (no random inverted dark/light sections)?**
- [ ] **One accent color locked across all components?**
- [ ] **One consistent corner radius scale?**
- [ ] **Button text readable (WCAG AA 4.5:1 min)?**
- [ ] **CTA buttons do not wrap to 2 lines on desktop?**
- [ ] **Hero fits in initial viewport without scroll (`min-h-[100dvh]`, top padding ≤ `pt-24`)?**
- [ ] **Eyebrows restrained (max 1 per 3 sections)?**
- [ ] **No div-based fake screenshots or fake terminal mockups?**
- [ ] **No AI copy buzzwords ("Elevate", "Seamless", "Next-Gen")?**
- [ ] **Animations honor `prefers-reduced-motion`?**
- [ ] **Icons from a single cohesive family (Phosphor, Radix, Tabler)?**
