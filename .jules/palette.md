## 2026-01-01 - [Shadcn UI & CRA Path Aliases]
**Learning:** Create React App (CRA) via `react-scripts` v5 does not automatically respect path aliases (like `@/lib/utils` or `src/lib/utils`) defined in `jsconfig.json` for compilation or testing, unlike modern frameworks like Next.js or Vite. This causes breaks when using `shadcn/ui` components which default to these aliases.
**Action:** When working in this specific CRA environment, manually convert absolute imports in UI components (e.g., `src/components/ui/button.jsx`) to relative imports (e.g., `../../lib/utils`) to ensure both the build and tests pass without requiring complex webpack overrides or package ejections.

## 2026-01-01 - [Tailwind CSS v4 Incompatibility]
**Learning:** Tailwind CSS v4 is not compatible with `react-scripts` v5 out of the box due to PostCSS dependencies and configuration structure. Attempts to use `@tailwindcss/postcss` fail.
**Action:** Stick to Tailwind CSS v3 (specifically v3.4.17) for this project. Ensure `postcss.config.js` is NOT present, as it conflicts with CRA's internal configuration. Configure `tailwind.config.js` with specific `darkMode: ["class"]` and `theme.extend.colors` mapping to CSS variables to support shadcn/ui theming correctly.
