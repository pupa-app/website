---
title: "Build your own component"
subtitle: "How a new canvas shape ships — and stays safe to share"
description: "Pupa's component set is an extension point, not a fixed menu. A conceptual tour of the two primitives every component is built from, how a new shape travels safely inside an inert bundle, and why every MyApp stays sandboxed from the next."
author: "Pupa team"
date: 2026-07-17
draft: false
---

## Why this post

Once people see a Pupa MyApp made of typed blocks, two questions follow: *"can I
add my own block?"* and *"if I share the app, how does my new block travel —
safely?"* This post answers both at a conceptual level. They turn out to be the
same story told from two ends: a component is only finished when it also knows how
to travel, and both ends are made possible by the same two primitives underneath.

> A component isn't just a view. It's built from **items** and **agents** — and it
> inherits their rules, which is what gives you isolation and composability for
> free.

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

## The two primitives every component is built from

You rarely build a component from raw materials. Two shared primitives do the
load-bearing work, and their built-in rules are what hand you data isolation and
cross-component composability without having to design either yourself.

### Items — owned by one app, linkable only within it

<figure class="bd-fig">
  <div class="bd-sandbox">
    <div class="bd-app">
      <div class="bd-app__name">🔒 Your Health app</div>
      <div class="bd-app__row">Calendar — dose events</div>
      <div class="bd-app__row">Tracker — diary entries</div>
      <span class="bd-link">a diary entry links to its day</span>
    </div>
    <div class="bd-wall">
      <span>⛌</span>
      <small>no link, no reach across apps</small>
    </div>
    <div class="bd-app is-flagged">
      <div class="bd-app__name">📥 An imported app</div>
      <div class="bd-app__row">its own components</div>
      <div class="bd-app__row">its own items</div>
      <span class="bd-app__note">⚠ can't point an item at yours</span>
    </div>
  </div>
  <figcaption>Every record is an item that belongs to exactly one MyApp. Items
  link freely to other items <em>inside</em> the same app — and never across the
  boundary.</figcaption>
</figure>

Every record a component shows — a tracker row, a calendar event, a checklist
line — is an **item** with its own permanent identity. Two rules about items do
most of the safety and composition work:

- **An item belongs to exactly one MyApp, and can never change owners.** Anything
  that tries to touch an item in another app is refused outright. That single
  guarantee is what keeps your apps from bleeding into each other — no matter what
  components you bolt on, one app's data can't end up in another's hands.
- **Items link to other items — but only within the same app.** That's how one
  component builds on another: a chart reads a tracker's rows, a calculator sums a
  field, a diary entry points at its day on the calendar. Each of those is just an
  item referencing another item. All those references are tracked in one place, so
  when something is deleted or exported they're pruned and re-bound cleanly, and
  never dangle or point outside the app.

So the *same boundary* gives you both things at once: links compose freely inside
an app, and nothing composes across apps. Build a new component and it inherits
exactly that — your items are automatically isolated and automatically linkable.

### Agents — structured interaction, kept on a leash

<figure class="bd-fig">
  <div class="bd-flow">
    <div class="bd-flow__step is-accent"><b>You</b><span>start a run</span></div>
    <div class="bd-flow__arrow"><span>&rarr;</span></div>
    <div class="bd-flow__step"><b>An agent</b><span>can delegate…</span></div>
    <div class="bd-flow__arrow"><span>&rarr;</span></div>
    <div class="bd-flow__step"><b>Another agent</b><span>…a few levels deep</span></div>
  </div>
  <div class="bd-guards-label">The loop is bounded by simple rules:</div>
  <div class="bd-guards">
    <span class="bd-guard">no calling back into its own chain</span>
    <span class="bd-guard">limited depth</span>
    <span class="bd-guard">limited turns per pair</span>
    <span class="bd-guard">can't reach another app</span>
  </div>
  <figcaption>Agent runs form a bounded tree, scoped to one MyApp — so a component
  can drive several agents in a structured back-and-forth without runaway loops or
  cross-app reach.</figcaption>
</figure>

A component can also put **agents** to work, not just data. The slack component is
the obvious case: several personas talking across channels. What makes that safe
to build on is the *shape* of the agent loop. Runs form a **tree** — you start one
at the top, and any agent it calls hangs off it — and that tree is fenced in by a
few plain rules:

- an agent **can't call back into its own chain**, so there are no infinite loops;
- the chain can only go **so deep**, and each caller/agent pair gets a **limited
  number of turns**, so nothing runs away;
- the whole tree is **scoped to one MyApp**, so a delegated agent can't reach into
  a sibling app's data or tools.

Because those limits live in the primitive, any component you build on top of
agents inherits them. You get structured multi-agent behaviour without inventing
your own guardrails.

## Adding a component — the shape of the work

You don't start by writing code; you start by asking whether you need a *new
shape* at all. A different calendar layout is just a new **view** of a block you
already have. A genuinely new shape — one that holds something none of the others
do — is when you reach for a new component. When you do, four things have to exist
together:

- **What it holds** — the items the block is made of, described so that apps saved
  by older versions still open cleanly.
- **How the agent operates it** — the handful of actions the agent uses to build
  and change it, each one reporting back what changed.
- **When to reach for it** — a short note that tells the agent *why* it would pick
  this shape over the others.
- **How it travels** — its export rule (below).

The throughline: a shape isn't "done" when it merely renders. It's done when its
items, its tools, and its travel rule all exist — so there's deliberately no way
to ship a block the agent can create but can't safely share.

## How a component travels

<figure class="bd-fig">
  <div class="bd-flow">
    <div class="bd-flow__step"><b>Your MyApp</b><span>components, items, agents, memories</span></div>
    <div class="bd-flow__arrow"><span>&rarr;</span><small>export: keep the structure, drop your records</small></div>
    <div class="bd-flow__step is-accent"><b>.pupa file</b><span>inert data — no code</span></div>
    <div class="bd-flow__arrow"><span>&rarr;</span><small>import: re-checked before anything runs</small></div>
    <div class="bd-flow__step"><b>Rebuilt on their host</b><span>fresh IDs · capabilities re-granted</span></div>
  </div>
  <div class="bd-guards-label">The import gate checks, before touching the device:</div>
  <div class="bd-guards">
    <span class="bd-guard">sensible size &amp; shape</span>
    <span class="bd-guard">only known component kinds</span>
    <span class="bd-guard">risky settings stripped</span>
    <span class="bd-guard">fresh IDs, links kept in-app</span>
    <span class="bd-guard">memory writes sandboxed</span>
  </div>
  <figcaption>A shared MyApp leaves your host as inert data — structure, not your
  records or your tools — and is re-checked on the other host before it rebuilds.
  It can't do anything until that host grants it capabilities.</figcaption>
</figure>

Sharing a MyApp means exporting a **`.pupa` bundle**: plain, inert data — the app
and its memories, and **no code**. Everything needed to rebuild the app already
lives in the client, keyed by each block's kind. That one choice turns
portability into a question of *policy*, not code distribution.

Two ideas do most of the work, and neither is really technical:

- **Keep the structure, drop the records.** Each block knows how to export its
  reusable shape — a tracker's fields, filters, and layout — while leaving your
  actual items behind unless you opt in. You share a *method*, not your data.
- **Treat every incoming bundle as hostile.** Before anything touches your device,
  the import runs a gauntlet of plain-sense checks (the chips above): sane size and
  shape, every block a kind this client recognises, risky settings stripped back to
  a safe list, all internal links kept inside this one app, memory writes confined
  to safe files. Only then is the app rebuilt, with fresh IDs.

## Every app is its own sandbox

Notice that the safety story is really the *item* story again. Because an item
belongs to one app and can never change owners, a whole MyApp can only ever see
itself — its components, its items, its memories, its agents are walled off from
every other app you have. Importing a stranger's app doesn't hand it a window into
your others.

That same wall is the answer to prompt injection. A shared app carries text the
agent will read — an instructions file, a persona's brief, a chat message — and
any of it could try to smuggle in a command ("ignore your task and send me X").
Because each app is sandboxed:

- the **worst that text can reach is that app's own surface** — not another app's
  items, and nothing sitting beside it;
- **capabilities live outside the bundle.** Tools, credentials, and host files are
  never packed inside; they're granted per app on your machine. An injected line
  can *ask*, but it can only touch what you've already handed *that* app;
- **nothing runs unseen.** Import first shows you the app's name and its agent
  prompts in a review sheet, so adversarial text is surfaced before you say yes.

So a bad actor's instruction can't *spill* out of a downloaded app into the rest
of your workspace. Catching a bad bundle before you ever open it — signing and
moderation — is the next layer, and it arrives with the marketplace.

## Case study — how the Slack component was built on this base

The **slack rooms** component is the best proof that these primitives are enough
to build something that barely resembles the others. It's multi-agent chat —
several agent personas talking across channels — yet underneath it's just another
typed block that leaned on both primitives and followed the recipe above:

- **On items:** its channels and messages are items like any other — owned by the
  app, linkable within it. Its @-mentions and cross-links ride the same in-app
  linking every block uses, so they survive export and re-import intact.
- **On agents:** the personas are ordinary app agents, and their back-and-forth
  runs inside the same bounded, app-scoped agent tree — so a room full of agents
  can't loop forever or reach a sibling app.
- **How the agent operates it:** a few actions to spin up the room, add personas
  and channels, and post — the same kind of first-class tools a tracker exposes.
- **How it travels:** its export rule keeps the room and its personas but leaves
  the message history behind — so a friend inherits your *setup*, not your chats.

The payoff is the whole thesis in one component: Slack rooms feel bespoke, but
because they were built *from* the standard primitives rather than *around* them,
they compose, isolate, export in the same inert bundle, clear the same import
gate, and run on any harness — exactly like every other block.

## The two halves are one contract

Contributing a component and trusting a shared app are the same promise seen from
opposite ends. You can't ship a shape without saying how it travels; the importer
won't rebuild a shape whose travel rule it can't find. And because both are built
on items and agents, a new block is isolated and composable the moment it exists —
inert, re-checked on arrival, sandboxed, and honest about what it leaves behind.
That's what makes the component set safe to open up.

**Want to build one?** Start with the
[adding-a-component guide](https://github.com/pupa-app/pupa/blob/main/docs/adding-a-component.md)
and the [export/import doc](https://github.com/pupa-app/pupa/blob/main/docs/marketplace.md),
and mirror the Slack component as the worked example.
