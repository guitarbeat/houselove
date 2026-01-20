## 2024-05-22 - List Memoization in Stateful Search Components
**Learning:** Components filtering lists based on debounced search state (like `Resources`) trigger re-renders of the *entire* list on every keystroke (due to parent state update) even if the filtered list hasn't changed (due to debounce).
**Action:** Memoize the mapped list of elements (VDOM) using `useMemo` dependent on the filtered data, so that typing in the search box doesn't re-render all list items until the debounce settles. Also, ensure data items have stable IDs.
