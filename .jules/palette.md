## 2024-05-23 - [Accessible Forms & Environment Constraints]
**Learning:**
1.  shadcn/ui `Input` and `Textarea` components do not provide internal `<label>` elements. Accessible forms must manually implement separate `<label>` elements linked via `htmlFor` and `id`, along with `aria-required` for required fields.
2.  `react-scripts` v5 in this environment strictly enforces Tailwind CSS v3.x. Upgrading to v4 causes build failures due to PostCSS configuration conflicts.
3.  Absolute imports (e.g., `src/lib/utils`) fail in Jest tests within this Create React App environment unless explicitly configured in `package.json` (which is restricted). Relative imports (e.g., `../../lib/utils`) are the robust workaround for shared components.

**Action:**
1.  Always wrap `Input`/`Textarea` in a container with a visible `<label>` and ensure `id`/`htmlFor` match. Use `aria-required="true"` for required inputs.
2.  Ensure `package.json` pins `tailwindcss` to `^3.4.17` or similar v3.x versions.
3.  Use relative imports in reusable UI components to ensure they work in both build and test environments without additional config.
