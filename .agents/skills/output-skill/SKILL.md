---
name: output-skill
description: >-
  Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder
  comments like // TODO or // implement here, and delivers production-ready implementations.
  Use this skill when developing full components, pages, or files.
---

# Full-Output Enforcement Skill

## Baseline Principle
Every UI deliverable must be production-ready and fully implemented. Partial output is broken output. Never shorten code to save tokens.

## Banned Output Shortcuts
The following shortcuts are strictly forbidden:
- In code: `// ...`, `// rest of code goes here`, `// TODO`, `/* implement here */`, `// add remaining items`, `...`
- In commentary: "for brevity", "similarly for the rest", "I will leave the rest as an exercise"
- In structure: Providing an empty skeleton when asked for a functional component or page.

## Execution Rules
1. **Scope verification:** Identify all required sections, components, styles, and assets before writing code.
2. **Complete delivery:** Deliver each component with all required markup, classes, animations, and accessible attributes.
3. **No placeholders:** Write real, contextual copy and realistic data rather than generic filler words or Lorem Ipsum.
