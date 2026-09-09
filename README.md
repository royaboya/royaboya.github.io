# Portfolio

A static portfolio built with [Astro](https://astro.build): about, projects,
blog, and CTF writeups, plus a small interactive terminal on the homepage.

## Structure

```
src/
  layouts/
    Base.astro          shared header/nav/footer + fonts, used by every page
                         except the homepage (which has its own full-screen look)
  pages/
    index.astro          homepage with the interactive terminal
    about.astro
    projects.astro       edit the `projects` array directly in this file
    contact.astro
    blog/
      index.astro         lists all posts from src/content/blog
      [...slug].astro     renders a single post
    writeups/
      index.astro         lists all writeups from src/content/writeups
      [...slug].astro     renders a single writeup
  content/
    config.ts             schema for blog posts and writeups (frontmatter shape)
    blog/*.md              one file per blog post
    writeups/*.md          one file per CTF writeup
```

## Adding content

**Blog post** — add a new file to `src/content/blog/`, e.g. `my-post.md`:

```md
---
title: "My post title"
description: "One sentence for the listing page."
pubDate: 2026-03-01
tags: ["optional", "tags"]
---

Body content in markdown goes here.
```

**CTF writeup** — add a new file to `src/content/writeups/`, e.g. `chall-name.md`:

```md
---
title: "chall-name (category, difficulty)"
description: "One sentence for the listing page."
pubDate: 2026-03-01
event: "someCTF 2026"
category: "web"        # web | pwn | crypto | reverse | forensics | misc
difficulty: "easy"     # easy | medium | hard (optional)
tags: ["optional"]
---

Body content in markdown goes here.
```

**Projects** — edit the `projects` array in `src/pages/projects.astro` directly.
No content collection needed for something this small.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

## Deploying to GitHub Pages

1. **Set `site` and `base` in `astro.config.mjs`.** Read the comment at the
   top of that file — this depends on whether your repo is named
   `<username>.github.io` or something else.

2. **Push this repo to GitHub.**

3. **Enable Pages via Actions:** in the repo, go to
   Settings → Pages → Build and deployment → Source → select
   **"GitHub Actions."**

4. **Push to `main`.** The included workflow
   (`.github/workflows/deploy.yml`) builds the site and deploys it
   automatically. Check the Actions tab for progress; the deployed URL shows
   up there and under Settings → Pages once it succeeds.

Every subsequent push to `main` redeploys automatically — no manual build
step needed.
