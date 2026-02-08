# Bolt's Journal

## 2024-05-23 - Initial Setup
**Learning:** Initial journal creation.
**Action:** Use this file to log critical performance learnings.

## 2024-05-23 - React Scripts 5 and Test Environment Complexity
**Learning:** `react-scripts` v5 is notoriously difficult to configure for testing when the default setup is broken or when newer libraries (like `react-router-dom` v7 or `tailwindcss` v4) are introduced. Attempting to force configuration overrides via `jest.config.js` or `package.json` often conflicts with the locked-down environment.
**Action:** When facing persistent test environment issues in a legacy `react-scripts` project, prioritize verification via `pnpm build` (to check compilation) and end-to-end/integration tests (like Playwright or manual verification) over fighting the unit test runner configuration, unless ejecting is a viable option. For dependencies, stick to versions known to be compatible with the CRA ecosystem (e.g., `react-router-dom` v6, `tailwindcss` v3).

## 2026-05-23 - Resolving Unrelated History Merges
**Learning:** Merging feature branches created from diverged or unrelated histories requires `git merge --allow-unrelated-histories`. Resolving these conflicts often involves identifying the source (PR) and target (Main) structures, porting the feature logic manually to the new structure, and cleaning up obsolete files/directories.
**Action:** When facing "unrelated histories", always check the file structure differences first (e.g., `src/components` vs `src/features`), favor the target branch's structure (`origin/main`), and manually reintegrate the feature logic.
