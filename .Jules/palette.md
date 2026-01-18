## 2026-01-17 - Contact Form Accessibility and Interaction
**Learning:** Adding immediate interaction feedback (loading states, success messages) combined with strict accessibility attributes (ARIA labels, explicit `<label>`) significantly improves the perceived performance and trustworthiness of forms.
**Action:** When implementing forms, always simulate async states locally if the backend is not ready, and ensure every input has an explicit `htmlFor` label connection to satisfy both screen readers and Playwright locators.
