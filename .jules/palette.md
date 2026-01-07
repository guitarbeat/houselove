## 2024-05-24 - Form Feedback and Accessibility

**Learning:** When adding micro-interactions like loading states and success messages, ensure they are announced to screen readers. For example, the success message should have `role="alert"` so it is immediately perceived.
Also, simple `required` attributes and `<label>` elements provide massive accessibility wins with zero dependencies.

**Action:** Always wrap form inputs in explicit `<label>` or use `htmlFor`. Always provide immediate visual and programmatic feedback for form submissions.
