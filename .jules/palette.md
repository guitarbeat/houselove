## 2024-05-22 - Tailwind v4 Incompatibility
**Learning:** React Scripts v5 (Create React App) is incompatible with Tailwind CSS v4 due to changes in how PostCSS plugins are handled. The build fails with "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin".
**Action:** When working with this repo, strictly use Tailwind CSS v3.x and associated PostCSS plugins (autoprefixer) until the project is migrated off React Scripts. Do not attempt to upgrade to v4.
