## 2024-05-23 - Create React App and Tailwind CSS v4 Incompatibility
**Learning:** `react-scripts` v5 is fundamentally incompatible with Tailwind CSS v4 because it hardcodes PostCSS configuration internally and does not support the new `@tailwindcss/postcss` plugin architecture. Attempts to use `postcss.config.js` or standard PostCSS setup instructions will result in build failures.
**Action:** Stick to Tailwind CSS v3.x (e.g., `^3.4.1`) for Create React App projects. Do not attempt to upgrade to v4.

## 2024-05-23 - Absolute Imports in CRA
**Learning:** Default Create React App configuration (without `craco` or `react-app-rewired`) does not robustly support absolute imports (e.g., `src/lib/utils`) in all contexts (specifically Jest and some build steps), even if `jsconfig.json` is present.
**Action:** Use relative imports (e.g., `../../lib/utils`) in shared UI components to ensure stability across build and test environments.

## 2024-05-23 - Tailwind Config for Shadcn UI without Plugins
**Learning:** When standard Tailwind plugins like `tailwindcss-animate` cannot be easily added or configured due to CRA limitations, manual configuration of `theme.extend.colors` and `darkMode: ["class"]` in `tailwind.config.js` is required to make shadcn/ui components render correctly with CSS variables.
**Action:** Maintain a manual mapping of CSS variables to Tailwind colors in `tailwind.config.js`.
