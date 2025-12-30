## 2024-05-23 - [Form Accessibility Patterns]
**Learning:** shadcn/ui Input and Textarea components do not include labels by default.
**Action:** Always wrap these components in a container (like `div.grid`) and add a dedicated `<label>` element with `htmlFor` matching the input's `id` to ensure accessibility.
