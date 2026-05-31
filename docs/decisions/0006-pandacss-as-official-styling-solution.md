---
title: Adopt PandaCSS, wrapped by @korama/core, as the official styling solution
description: PandaCSS is Korama's styling engine, but it is an implementation detail hidden behind an opinionated @korama/core API rather than exposed directly.
status: Accepted
tags: [architecture, styling, css]
---

# Adopt PandaCSS, wrapped by `@korama/core`, as the official styling solution

## Context and Problem Statement

Korama has no official styling story at the package level. Today only the docs app uses a styling engine, and it uses PandaCSS *directly* (`apps/docs/panda.config.ts`, `css()` from a generated `styled-system`). The published packages are style-agnostic: `@korama/react`'s `Box` only understands `className` and `style` (see `packages/react/src/Box/mergeProps.ts`), and `@korama/core` is an empty placeholder.

We need a first-class, type-safe, build-time styling foundation that every Korama package can build on, and that powers a new `css` prop on `Box` — pairing with the `as` prop ([0003](0003-box-and-as-prop-composition-model.md)) as a core piece of the composition model. The open question is not only *which* engine, but *how much of it we expose*: do consumers configure the engine directly, or do we wrap it behind our own opinionated surface?

## Decision Drivers

- **Type safety and theming.** Styles and tokens should be statically typed end to end.
- **Zero-runtime.** Styling should be extracted at build time, consistent with Korama's forward-looking, lean foundation (`docs/VISION.md`).
- **Opinionated, curated surface.** Korama prefers a small, conventional API over raw flexibility (`docs/VISION.md`); the underlying tool should not leak into the public API.
- **Composition.** The solution must enable a typed `css` prop on `Box` that composes with `as`.

## Considered Options

- **PandaCSS, wrapped by `@korama/core`** — Panda powers styling but is hidden behind a Korama API.
- **PandaCSS used directly** — consumers write a `panda.config.ts` and import from Panda's `styled-system`.
- **Runtime CSS-in-JS** (emotion / styled-components / stitches).
- **Tailwind CSS.**
- **vanilla-extract / CSS Modules.**

## Decision Outcome

Chosen: **PandaCSS, wrapped by `@korama/core`**, because it gives us a type-safe, zero-runtime atomic-CSS engine while letting us keep an opinionated, curated public surface — Panda becomes an implementation detail, not part of Korama's API.

Concretely:

- **Panda is an implementation detail.** It is never re-exported wholesale. Korama is deliberately *more opinionated* than Panda: it curates a subset of Panda's surface and adds its own utilities instead of exposing everything Panda allows.
- **`@korama/core` is the styling boundary.** Its public surface is:
  - `@korama/core` (main): runtime styling primitives/utilities — some passthrough from Panda (e.g. `css`, `cx`), some Korama-defined.
  - `@korama/core/dev`: a `defineConfig` for authoring Korama's styling configuration.
- **Consumers configure styling via a `korama.config.ts`** (not a `panda.config.ts`), using `@korama/core/dev`'s `defineConfig`.
- **This enables a `css` prop on `Box`** ([0003](0003-box-and-as-prop-composition-model.md)), resolved through `@korama/core`'s utilities and composable with `as`. The detailed `css` prop API is left to a follow-up decision.

This pairs with ESM-only publishing ([0002](0002-esm-only-publishing.md)) and the React 19 baseline ([0005](0005-react-19-baseline.md)).

### Consequences

- **Good:** Type-safe, zero-runtime styling with a single, opinionated entry point; Panda can be tuned or replaced behind `@korama/core` without breaking consumers.
- **Good:** A consistent foundation for a `css` prop shared across components.
- **Bad:** Build-time extraction means consumers must run Korama's codegen (which wraps Panda's); the `css` prop relies on Panda's *static* extraction at build time, since Panda generates no CSS at runtime.
- **Bad:** Wrapping Panda is ongoing work — every part of Panda's surface we want to support must be curated and re-exposed through `@korama/core`.

## Pros and Cons of the Options

### PandaCSS, wrapped by `@korama/core`

- Good: Type-safe, zero-runtime atomic CSS; opinionated curated API; Panda hidden as an implementation detail and swappable.
- Bad: Curation/maintenance cost; consumers depend on a build-time codegen step.

### PandaCSS used directly

- Good: Less code for us; full Panda power available to consumers.
- Bad: Leaks the implementation detail, couples consumers to Panda's entire configuration space, and is less opinionated — contrary to Korama's vision.

### Runtime CSS-in-JS (emotion / styled-components / stitches)

- Good: Ergonomic, dynamic styling.
- Bad: Runtime cost, contrary to the zero-runtime, forward-looking foundation; stitches is unmaintained.

### Tailwind CSS

- Good: Popular, mature, build-time.
- Bad: Considered, but its theming system is weaker than Panda's and it is not type-safe; class-string ergonomics integrate poorly with a typed `css` prop and tokens.

### vanilla-extract / CSS Modules

- Good: Type-safe (vanilla-extract), zero-runtime.
- Bad: Less ergonomic for a polymorphic `css` prop and for the opinionated token/utility model we want.
