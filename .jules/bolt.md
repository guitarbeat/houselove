## 2026-01-25 - Isolate Controlled Inputs
**Learning:** In React components that render large lists or expensive children, keeping controlled input state (like search terms) in the same component causes the entire tree to re-render on every keystroke.
**Action:** Extract the input into a separate component that manages its own local state and only propagates changes to the parent after a debounce or blur event. This keeps the high-frequency re-renders isolated to the small input component.
