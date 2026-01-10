## 2024-05-23 - Accessibility in Shadcn/UI Forms
**Learning:** Shadcn/UI `Input` and `Textarea` components do not include internal `label` elements. To ensure accessibility and pass audits, explicit `<label>` elements linked via `htmlFor` and `id` must be implemented manually in the parent form component. Additionally, `aria-required` and `required` attributes should be synced.
**Action:** Always wrap Shadcn inputs with a label-input pair pattern or use the `Form` component wrappers if available. When adding raw inputs, verify labels are present and correctly linked.
