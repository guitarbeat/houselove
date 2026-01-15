## 2024-05-23 - [Form Accessibility & Feedback]
**Learning:** Users often abandon forms that lack clear labels or feedback. Adding explicit `<label>` elements linked via `htmlFor` and providing immediate visual feedback (loading states, success messages) significantly improves the experience. In this environment, `react-scripts` v5 is incompatible with Tailwind CSS v4, requiring v3.
**Action:** Always ensure forms have `htmlFor` labels, `aria-required` (or `required`) attributes, and handle `isSubmitting` states visually.

## 2024-05-24 - [Interactive Contact Information]
**Learning:** Static text for contact details (like emails) creates friction. Using the `Button` component with `asChild` allows for consistent, accessible, and touch-friendly links without new styles.
**Action:** Audit list views for static contact info and upgrade to `mailto:` or `tel:` links using the system's `Button` component.
