## 2024-05-23 - [Form Accessibility Patterns]
**Learning:** Implicit labels or placeholders are insufficient for accessibility. Explicit `<label>` elements linked via `htmlFor`/`id` are required for screen readers and improve usability for all users by increasing the clickable area. Adding `required` attributes provides native browser validation feedback.
**Action:** Always ensure every form input has a corresponding visible `<label>` and uses native HTML5 validation attributes where possible. Verify with screen reader tests (or simulated tests like `getByLabelText`).

## 2024-05-23 - [Visual Feedback for Async Actions]
**Learning:** Users need immediate confirmation when an action (like form submission) completes. A silent console log or no UI change is confusing.
**Action:** Implement success/error states for all forms. Simple conditional rendering of a success message is a low-effort, high-impact pattern.
