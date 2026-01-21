## 2024-05-23 - Stable Keys in Filtered Lists
**Learning:** Using array indices as keys in filtered lists forces React to re-render items unnecessarily because the index of an item changes when the list is filtered.
**Action:** Always include a unique `id` in static list data and use it as the `key` prop to ensure efficient reconciliation during filtering or reordering.
