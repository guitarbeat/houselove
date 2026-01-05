## 2024-05-23 - [Form Accessibility Pattern]
**Learning:** The shadcn/ui `Input` and `Textarea` components in this repo are "headless" regarding labels. Using them without explicit `<label>` elements linked via `htmlFor` and `id` creates accessibility violations (missing accessible name) and poor UX (placeholder reliance).
**Action:** Always wrap form controls in a layout that includes a visible `<label>` with `htmlFor` matching the input's `id`, and redundant `aria-required` if needed.
