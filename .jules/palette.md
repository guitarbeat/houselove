## 2024-05-23 - [Form Accessibility & Feedback]
**Learning:** Users often abandon forms that lack clear labels or feedback. Adding explicit `<label>` elements linked via `htmlFor` and providing immediate visual feedback (loading states, success messages) significantly improves the experience. In this environment, `react-scripts` v5 is incompatible with Tailwind CSS v4, requiring v3.
**Action:** Always ensure forms have `htmlFor` labels, `aria-required` (or `required`) attributes, and handle `isSubmitting` states visually.

## 2026-01-13 - [Empty State Engagement]
**Learning:** Gray placeholder boxes create dead ends and user confusion. Replacing them with "Coming Soon" empty states that include icons, descriptive text, and (even disabled) calls-to-action significantly improves perceived value and keeps users engaged.
**Action:** Replace all "TODO" or placeholder divs with designed Empty State components that explain *why* content is missing and *when* it might appear.

## 2026-01-14 - [Actionable Contact Information]
**Learning:** Plain text email addresses are passive and require user effort (copy-paste). Converting them into styled `<Button asChild>` components with `mailto:` links and descriptive `aria-label`s makes the primary interaction obvious and accessible.
**Action:** Always wrap contact methods in interactive elements with clear visual affordances (icons) and accessible names.

## 2026-01-15 - [Search Input Interaction]
**Learning:** Users searching for content often need to quickly reset their query. Standard inputs require manual deletion. Adding an absolute-positioned "Clear" button that appears conditionally provides a high-utility micro-interaction that feels polished.
**Action:** When implementing search inputs, always consider a "Clear" button that resets state and returns focus to the input.
