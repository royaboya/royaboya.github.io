import { defineConfig } from "astro/config";

// GitHub Pages setup:
//
// 1. If this repo is named "<your-username>.github.io" (a user/org site),
//    set: site: "https://<your-username>.github.io"  and remove `base` entirely.
//
// 2. If this repo has any other name (a project site, e.g. "my-portfolio"),
//    set: site: "https://<your-username>.github.io"
//    and: base: "/my-portfolio"   <-- must match the repo name exactly
//
// Getting `base` wrong is the #1 cause of CSS/links breaking on GitHub Pages
// (assets 404 because they're requested from "/" instead of "/repo-name/").

export default defineConfig({
  site: "https://royaboya.github.io",
  base: "/portfolio",
});
