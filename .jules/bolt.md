## 2025-12-18 - Broken Test Environment & Shadcn Imports
**Learning:** `react-scripts` v5 in this repo fails to parse JSX in test files (`.test.jsx`), making `npm test` unusable out of the box. Also, shadcn/ui components using absolute imports (`src/lib/utils`) break the build; relative imports are required.
**Action:** Use `pnpm build` for verification when tests are broken. Enforce relative imports for internal UI components.
