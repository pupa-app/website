# Contributing

Technical notes for working on this repo. See [README.md](README.md) for what
the site is.

## Stack

- [Astro](https://astro.build) — static site, no framework runtime shipped.
- **Content collections** — the blog is a typed content collection (`src/content.config.ts`).
- **Plain CSS** — one global stylesheet (`src/styles/global.css`), dark-friendly, respects `prefers-color-scheme`. No Tailwind, no React, no client JS.

## Develop

Requires Node.js 20+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:4321)
npm run build    # build the static site to dist/
npm run preview  # preview the production build locally
```

## Adding a blog post

Drop a Markdown file into `src/content/blog/`. Frontmatter:

```markdown
---
title: "Your post title"
description: "One-line summary shown in the index and meta tags."
author: "Pupa team"
date: 2026-07-10
draft: false        # true = hidden from the production build, visible in dev
---

Your post body in Markdown.
```

The slug is the filename (e.g. `my-post.md` → `/blog/my-post`). Drafts show in
`npm run dev` but are filtered out of `npm run build`.

## Structure

```
website/
├── astro.config.mjs
├── package.json
├── src/
│   ├── components/     ← Logo, Header, Footer
│   ├── content/blog/   ← Markdown blog posts
│   ├── content.config.ts
│   ├── layouts/        ← BaseLayout (shared shell)
│   ├── pages/          ← routes (index, blog, releases, privacy, support, terms)
│   └── styles/         ← global.css
└── public/             ← static assets (favicon)
```
