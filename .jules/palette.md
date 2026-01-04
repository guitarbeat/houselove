## 2024-05-23 - [Missing Form Labels Pattern]
**Learning:** shadcn/ui Input components do not include labels by default. Developers often forget to wrap them or add `htmlFor` attributes, leading to inaccessible forms.
**Action:** Always verify shadcn/ui forms have explicit `<label>` elements linked via `id` and `htmlFor`. Use the `grid gap-2` pattern to stack them visually.
