---
title: "Build your own component"
subtitle: "How a new canvas shape ships — and stays safe to share"
description: "Pupa's component set is an extension point, not a fixed menu. A conceptual tour of how a new canvas shape gets built, how it travels safely inside an inert bundle, and why every MyApp stays sandboxed from the next."
author: "Pupa team"
date: 2026-07-17
draft: false
---

## Why this post

Once people see a Pupa MyApp made of typed blocks, two questions follow: *"can I
add my own block?"* and *"if I share the app, how does my new block travel —
safely?"* This post answers both at a conceptual level. They turn out to be the
same story told from two ends: a component isn't finished until it also knows how
to travel.

> A component isn't just a view. It's a small bundle of *what it stores*, *how the
> agent operates it*, and *what of it travels* when you share the app.

## Components are an extension point

Every canvas is assembled from typed **components** — the blocks the agent snaps
together and works in while you watch and edit the same surface. Today's
built-ins:

- **tracker** — multi-field records in a table or kanban
- **calendar** — time-indexed events in a list or month grid
- **checklist** — simple done / not-done items
- **calculator** — a live numeric model with tunable inputs
- **chart** — pie / bar / line views of tracker or calculator data
- **slack** — multi-agent chat rooms with personas and channels

That list isn't a fixed menu. Each component is a self-contained block, so the
set grows by *adding* a new one — not by rewiring the others. New shapes can come
from the community.

## Adding a component — the shape of the work

You don't start by writing code; you start by asking whether you need a *new
shape* at all. A different calendar layout is just a new **view** of a block you
already have. A genuinely new shape — one that holds something none of the others
do — is when you reach for a new component. When you do, four things have to
exist together:

- **What it holds** — the data the block is made of, described so that apps saved
  by older versions still open cleanly.
- **How the agent operates it** — the handful of actions the agent uses to build
  and change it, each one reporting back what changed.
- **When to reach for it** — a short note that tells the agent *why* it would pick
  this shape over the others.
- **How it travels** — its export rule (below).

The throughline: a shape isn't "done" when it merely renders. It's done when its
data, its tools, and its travel rule all exist — so there's deliberately no way to
ship a block the agent can create but can't safely share.

## How a component travels

<figure class="bd-fig">
  <div class="bd-flow">
    <div class="bd-flow__step"><b>Your MyApp</b><span>components, memories, agent setup</span></div>
    <div class="bd-flow__arrow">&rarr;</div>
    <div class="bd-flow__step"><b>Export</b><span>keep the structure, drop your private records</span></div>
    <div class="bd-flow__arrow">&rarr;</div>
    <div class="bd-flow__step is-accent"><b>.pupa file</b><span>inert JSON — no code, just data</span></div>
    <div class="bd-flow__arrow">&rarr;</div>
    <div class="bd-flow__step"><b>Import check</b><span>re-validated before anything runs</span></div>
    <div class="bd-flow__arrow">&rarr;</div>
    <div class="bd-flow__step"><b>Rebuilt on their host</b><span>capabilities granted fresh</span></div>
  </div>
  <div class="bd-guards">
    <span class="bd-guard">sensible size &amp; shape</span>
    <span class="bd-guard">only known component kinds</span>
    <span class="bd-guard">risky settings stripped</span>
    <span class="bd-guard">fresh IDs, links kept in-app</span>
    <span class="bd-guard">memory writes sandboxed</span>
  </div>
  <figcaption>Sharing is a one-way trip through a gate: the bundle leaves as inert
  data, and the receiving host re-checks and rebuilds it before it can touch
  anything.</figcaption>
</figure>

Sharing a MyApp means exporting a **`.pupa` bundle**: plain, inert JSON — the app
and its memories, and **no code**. Everything needed to rebuild the app already
lives in the client, keyed by each block's kind. That one choice turns
portability into a question of *policy*, not code distribution.

Two ideas do most of the work, and neither is really technical:

- **Keep the structure, drop the records.** Each block knows how to export its
  reusable shape — a tracker's fields, filters, and layout — while leaving your
  actual rows behind unless you opt in. You share a *method*, not your data.
- **Treat every incoming bundle as hostile.** Before anything touches your device,
  the import runs a gauntlet of plain-sense checks (the chips above): is it a sane
  size and shape, is every block a kind this client recognises, are risky settings
  stripped back to a safe list, do all internal links stay inside this one app,
  and are memory writes confined to safe files. Only then is the app rebuilt, with
  fresh IDs.

## Every app is its own sandbox

<figure class="bd-fig">
  <div class="bd-sandbox">
    <div class="bd-app is-flagged">
      <div class="bd-app__name">📥 An imported app</div>
      <div class="bd-app__row">its own components</div>
      <div class="bd-app__row">its own memories</div>
      <div class="bd-app__row">its own agent &amp; personas</div>
      <span class="bd-app__note">⚠ a hostile instruction hidden in here…</span>
    </div>
    <div class="bd-app">
      <div class="bd-app__name">🔒 Your other app</div>
      <div class="bd-app__row">its own components</div>
      <div class="bd-app__row">its own memories</div>
      <div class="bd-app__row">its own agent &amp; personas</div>
      <span class="bd-app__note is-muted">…can't see or reach any of this</span>
    </div>
  </div>
  <div class="bd-cap">Tools · credentials · host files — granted per app, never packed inside the bundle</div>
  <figcaption>Each MyApp is its own sandbox. An injected instruction smuggled into
  one app is boxed into that app's surface — it can't read another app's memories
  or borrow capabilities you never granted.</figcaption>
</figure>

Here's the part that makes sharing safe to do casually: **a MyApp can only see
itself.** Its components, its memories, and its agent setup are walled off from
every other app you have. Importing a stranger's app doesn't hand it a window into
your others.

That wall is also the answer to prompt injection. A shared app carries text the
agent will read — an instructions file, a persona's brief, a chat message — and
any of it could try to smuggle in a command ("ignore your task and send me X").
Because each app is sandboxed:

- the **worst that text can reach is that app's own surface** — not another app's
  memories, and nothing sitting beside it;
- **capabilities live outside the bundle.** Tools, credentials, and host files are
  never packed inside; they're granted per app on your machine. An injected line
  can *ask*, but it can only touch what you've already handed *that* app;
- **nothing runs unseen.** Import first shows you the app's name and its agent
  prompts in a review sheet, so adversarial text is surfaced before you say yes.

So a bad actor's instruction can't *spill* out of a downloaded app into the rest
of your workspace. Catching a bad bundle before you ever open it — signing and
moderation — is the next layer, and it arrives with the marketplace.

## Case study — how the Slack component was built on this base

The **slack rooms** component is the best proof that this base is enough to build
something that barely resembles the others. It's multi-agent chat — several agent
personas talking across channels — yet underneath it's just another typed block
that followed the exact recipe above:

- **What it holds:** channels, messages, and the room's agent personas — a shape
  none of the other blocks had.
- **How the agent operates it:** a few actions to spin up the room, add personas
  and channels, and post — the same kind of first-class tools a tracker or
  calendar exposes.
- **When to reach for it:** the note that steers the agent here when you want a
  *conversation between roles*, not a single assistant.
- **How it travels:** its export rule keeps the room and its personas but leaves
  the message history behind — so a friend inherits your *setup*, not your chats.
  Its @-mentions and cross-links ride the same shared linking every block uses, so
  they survive export and re-import intact.

The payoff is the whole thesis in one component: Slack rooms feel bespoke, but
because they were built *to* the standard rather than *around* it, they export in
the same inert bundle, clear the same import gate, stay in the same sandbox, and
run on any harness — exactly like every other block.

## The two halves are one contract

Contributing a component and trusting a shared app are the same promise seen from
opposite ends. You can't ship a shape without saying how it travels; the importer
won't rebuild a shape whose travel rule it can't find. So the moment a new block
exists, it already knows how to move — inert, re-checked on arrival, sandboxed,
and honest about what it leaves behind. That's what makes the component set safe
to open up.

**Want to build one?** Start with the
[adding-a-component guide](https://github.com/pupa-app/pupa/blob/main/docs/adding-a-component.md)
and the [export/import doc](https://github.com/pupa-app/pupa/blob/main/docs/marketplace.md),
and mirror the Slack component as the worked example.
