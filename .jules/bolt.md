## 2026-01-14 - [Stable Keys and Debouncing]
**Learning:** Using array indices as keys in filtered lists is a performance anti-pattern that forces React to re-render more DOM elements than necessary. Stable IDs are crucial for efficient list reconciliation. Also, debouncing search inputs prevents expensive filtering operations on every keystroke.
**Action:** Always use unique IDs for list items, especially when the list can be filtered or sorted. Implement debouncing for all search inputs to optimize rendering performance.
