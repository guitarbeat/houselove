# Bolt's Journal

## 2026-01-19 - Using Stable Keys in Filtered Lists
**Learning:** Using `index` as a key in a filtered list (`filteredResources.map`) is a performance anti-pattern because React cannot track items correctly when the filter changes (items shift positions).
**Action:** Always ensure data sources have unique IDs (e.g., UUIDs or static strings) and use them as keys, even for static data arrays.
