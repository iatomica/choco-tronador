# Chocolates Tronador Web: Agent Guidelines & Standards

This project represents the web presence for **Chocolates Tronador**, an artisanal chocolate brand. All AI coding agents operating in this workspace must deliver agency-grade, premium UI/UX implementations.

## Design Framework: Taste Skill Integration

This repository is powered by the **Taste Skill** framework (`.agents/skills/taste-skill/SKILL.md`). When generating or modifying any UI component, page, or style:

1. **Activate Taste Skill**:
   - Refer to [.agents/skills/taste-skill/SKILL.md](.agents/skills/taste-skill/SKILL.md) for full design directives, layout patterns, and pre-flight checklists.
   - For UI refactoring and audits, follow [.agents/skills/redesign-skill/SKILL.md](.agents/skills/redesign-skill/SKILL.md).
   - For luxury/gourmet micro-aesthetics and double-bezel card structures, apply [.agents/skills/soft-skill/SKILL.md](.agents/skills/soft-skill/SKILL.md).
   - Enforce complete code generation without placeholders using [.agents/skills/output-skill/SKILL.md](.agents/skills/output-skill/SKILL.md).

2. **Core Visual Rules for Chocolates Tronador**:
   - **Vibe & Aesthetic**: Warm, tactile, artisanal luxury. Deep bittersweet cacao tones, warm natural papers, refined typography, and subtle organic textures.
   - **Typography**: Expressive editorial headings (`Cormorant Garamond`, `Playfair Display`, `Cabinet Grotesk`, `PP Editorial New`, or `Geist`). Never default blindly to unstyled Inter or system fonts.
   - **Spacing**: Generous macro-whitespace (`py-24` to `py-36` on desktop sections).
   - **Layout**: Asymmetrical rhythms, 50/50 split heroes, and bento grids with exact cell counts.
   - **Mobile Stability**: Always use `min-h-[100dvh]` rather than `h-screen`.
   - **Zero Tolerance for AI Slop**:
     - No generic AI-purple/neon glows.
     - No 3 identical card columns.
     - No div-based fake screenshots.
     - No em-dashes (`—`) in copy or labels.
     - No truncated or placeholder code (`// TODO`).

3. **Pre-Flight Check**:
   - Before completing any frontend task, run the Section 14 Pre-Flight Checklist in `taste-skill`.
