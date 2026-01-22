## 2024-05-23 - [Form Accessibility & Feedback]
**Learning:** Users often abandon forms that lack clear labels or feedback. Adding explicit `<label>` elements linked via `htmlFor` and providing immediate visual feedback (loading states, success messages) significantly improves the experience. In this environment, `react-scripts` v5 is incompatible with Tailwind CSS v4, requiring v3.
**Action:** Always ensure forms have `htmlFor` labels, `aria-required` (or `required`) attributes, and handle `isSubmitting` states visually.

## 2026-01-13 - [Empty State Engagement]
**Learning:** Gray placeholder boxes create dead ends and user confusion. Replacing them with "Coming Soon" empty states that include icons, descriptive text, and (even disabled) calls-to-action significantly improves perceived value and keeps users engaged.
**Action:** Replace all "TODO" or placeholder divs with designed Empty State components that explain *why* content is missing and *when* it might appear.

## 2026-05-20 - [Interactive Search Patterns]
**Learning:** A search input without immediate feedback or control feels static. Adding an inline "Clear" button that appears on type not only provides a quick exit from a failed search but also delights users with responsiveness.
**Action:** When implementing filtering inputs, always wrap them to include a conditional "Clear" button that resets state and restores focus to the input.
