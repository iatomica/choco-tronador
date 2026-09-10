# UI Design & Development Rules (Taste-Skill Enforced)

All frontend, UI component, page layout, and styling work in this repository must strictly adhere to the standards defined in `.agents/skills/taste-skill/SKILL.md`.

## Mandatory Directives for Frontend & UI:

1. **Anti-Slop Standard**:
   - Never use default AI design tropes: no AI-purple/neon glows, no generic Inter font default, no centered heroes over dark mesh, no three identical card columns, and no div-based fake screenshots.
   - For Chocolates Tronador, reflect an artisanal, premium, and warm aesthetic (rich cacao tones, warm paper/cream neutrals, elegant typography, generous whitespace).

2. **Dials & Layout**:
   - Baseline Dials: `DESIGN_VARIANCE: 7-8` (organic asymmetry), `MOTION_INTENSITY: 5-6` (fluid spring motion), `VISUAL_DENSITY: 3-4` (spacious, editorial breathing room).
   - Never use `h-screen` for hero sections; always use `min-h-[100dvh]`.
   - On mobile (`< 768px`), always provide clean single-column fallback with `w-full px-4`.

3. **Typography & Content**:
   - Headlines: max 2 lines on desktop; body text max `65ch`.
   - Zero em-dashes (`—`) in copy or markup.
   - Complete output: no placeholders (`// TODO` or `...`), deliver full production-ready code.

4. **Pre-Flight Validation**:
   - Check contrast (WCAG AA min 4.5:1 for body and buttons).
   - Ensure CTA buttons fit on a single line on desktop.
   - Verify that all animations honor `prefers-reduced-motion`.
