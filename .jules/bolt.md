# BOLT'S JOURNAL

## 2024-05-22 - [First Run]
**Learning:** Initial setup of Bolt's journal.
**Action:** Always check for this file before starting.

## 2024-05-22 - [Build Repair]
**Learning:** Shadcn/ui components often use absolute imports (e.g., `src/lib/utils`) which fail in default `react-scripts` builds if paths aren't configured perfectly. Relative imports are more robust.
**Action:** Convert absolute imports to relative imports in UI components (`../../lib/utils`) to fix build failures before optimizing.

## 2024-05-22 - [Tailwind Compatibility]
**Learning:** `react-scripts` v5 is incompatible with Tailwind CSS v4.x (and its PostCSS plugins). Reverting to Tailwind v3.x and ensuring configuration matches Shadcn/ui requirements (colors, animations) is necessary.
**Action:** Downgraded tailwindcss to v3, added tailwindcss-animate, and updated `tailwind.config.js` with required theme extensions.
