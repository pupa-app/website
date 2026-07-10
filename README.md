# Pupa website

The static marketing + docs site for [Pupa](https://github.com/pupa-app) — an
open-source native iOS / macOS agent app. Built with
[Astro](https://astro.build), plain CSS, and zero client-side JavaScript.

## What's here

| Route | Page |
|---|---|
| `/` | Home — hero, the four verbs (Use / Build / Share / Contribute), the `.pupa` bundle, open-source repos. |
| `/blog` | Blog index. |
| `/blog/<slug>` | A blog post (Markdown in `src/content/blog/`). |
| `/privacy` | Privacy Policy (Apple App Store requirement). |
| `/support` | Support page (Apple App Store requirement) — GitHub issues, email, FAQ. |
| `/terms` | Terms of Use. |

## Stack

- **[Astro](https://astro.build)** — static site generator, no framework runtime shipped.
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
│   ├── pages/          ← routes (index, blog, privacy, support, terms)
│   └── styles/         ← global.css
└── public/             ← static assets (favicon)
```

## License

Site content and code © 2026 Pupa. The Pupa projects themselves are MIT-licensed;
marketplace app content is CC0. See the
[pupa-app organization](https://github.com/pupa-app) for details.
