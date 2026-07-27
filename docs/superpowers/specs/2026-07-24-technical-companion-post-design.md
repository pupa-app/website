# Technical companion blog post — design

Approved 2026-07-24.

## Goal

Companion to the non-technical post "Keep what you build with your agent"
(`/blog/packaging-agentic-experiences`). Explains the architecture using the
two diagrams cut from that post's rewrite. Audience: developers. Technical
vocabulary lives here, not in the plain post.

## File

`src/content/blog/from-machine-to-myapp.md` → slug `/blog/from-machine-to-myapp`.
Title "From Claude on your machine to Claude in your app", subtitle
"The architecture behind MyApps — and why the arrows point both ways".
Date 2026-07-24.

## Structure

1. **Intro** — links the plain post; embeds `information-flow.png` once;
   sections walk its three panels top to bottom.
2. **Stage 1: agent on your machine** — Claude + tools/MCP/skills read/modify
   OS apps + filesystem. Max capability, zero product; setup dies with the
   machine.
3. **Stage 2: chat app in front of a backend** — one-way "report OS/chat
   data" arrow; surface is a readout, not a workspace; nothing shareable.
4. **Stage 3: app the agent operates** — two-way "read/modify MyApp data" via
   pupa-backend. MyApp anatomy: components (typed UI blocks + items/data,
   linkable) and Memories (documents, agent prompts, agent skills).
   Structure-not-pixels argument (from the cut "What we believe" section).
5. **What travels, what stays** — host-vs-app split; capabilities re-earned
   per host; `.pupa` bundle is inert JSON, no code, confirm-on-import.
   Embeds `agentic-setup.png`.
6. **Close** — components as extension point → link
   `/blog/custom-components-and-portability`; marketplace link.

## Also

- Rewrite both image captions to match the actual diagram labels
  ("Some-backend", "Pupa-backend", arrow directions).
- Add one cross-link line in the plain post's closing section pointing here.
- All work on branch `blog-technical-companion` (includes the earlier
  uncommitted plain-post rewrite + `.prose video` CSS).

## Verification

`astro build` clean; post renders with ToC, both PNGs, working links; blog
index lists three posts.
