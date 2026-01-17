## 2024-05-23 - [Filtered List Keys & Debounce]
**Learning:** Using array indices as keys in filtered lists is a performance anti-pattern because filtering changes the index-to-item mapping, causing unnecessary DOM updates. Also, immediate state updates on search inputs for filtering can cause excessive re-renders.
**Action:** Always use stable, unique IDs for list items, especially when the list can be filtered or reordered. Implement debouncing for search inputs to decouple user typing from expensive filter operations.
