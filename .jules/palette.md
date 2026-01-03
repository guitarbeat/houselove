## 2024-05-23 - [Form Accessibility Improvement]
**Learning:** Adding explicit labels and required attributes significantly improves accessibility and user experience, especially for screen readers and keyboard users. Using Shadcn/ui input components requires careful handling of ids and labels to ensure they are properly linked.
**Action:** Always verify that form inputs have associated labels and use standard accessibility attributes like `aria-required` (implicit with `required`) and proper `htmlFor`/`id` linkage. Use `peer-disabled` classes for better visual feedback on disabled states.
