---
title: Target React 19 as the baseline version
description: Korama's React package requires React 19 as its minimum supported (peer) version.
status: Accepted
tags: [react, dependencies, architecture]
---

# Target React 19 as the baseline version

## Context and Problem Statement

`@korama/react` must declare which React versions it supports via its peer dependency range. A wider range (React 18 or 17 and up) reaches more consumers but constrains the library to the lowest common denominator of the API. A narrower range (React 19+) unlocks newer React capabilities but excludes consumers on older majors. The chosen range also interacts directly with Korama's composition model.

## Decision Drivers

- **Leverage React 19 APIs:** React 19 makes `ref` a regular prop and removes the need for `forwardRef`, which directly simplifies the `Box` / `as` composition model ([0003](0003-box-and-as-prop-composition-model.md)) and its ref merging.
- **Forward-looking by design:** supporting legacy React majors is an explicit non-goal — see [VISION](../VISION.md), consistent with the ESM-only stance ([0002](0002-esm-only-publishing.md)).
- **Smaller compatibility matrix:** one supported major means less conditional code and a simpler test surface.
- **Ecosystem alignment:** the workspace apps already run on React 19 (with React Router v7).

## Considered Options

- **React 19+ only** — peer dependency `^19.1`.
- **React 18+** — broader reach, but no ref-as-prop; `forwardRef` still required.
- **React 17+** — widest reach, oldest API constraints.

## Decision Outcome

Chosen: **React 19+ only**. `@korama/react` declares `peerDependencies.react: "^19.1"` and develops against React 19.2. This lets components treat `ref` as an ordinary prop (no `forwardRef`), which is foundational to the `Box`/`as` model.

### Consequences

- **Good:** Cleaner component code — `ref` flows as a normal prop, no `forwardRef` wrappers.
- **Good:** Access to React 19 APIs and a single-major test/compatibility surface.
- **Good:** Matches the React version already used across the workspace apps.
- **Bad:** Consumers on React 18 or earlier cannot use the library without upgrading.

## Pros and Cons of the Options

### React 19+ only

- Good: Ref-as-prop simplifies composition; modern APIs; small compatibility matrix.
- Bad: Excludes React 18-and-earlier consumers.

### React 18+

- Good: Broader adoption reach.
- Bad: No ref-as-prop; `forwardRef` boilerplate; wider matrix to support.

### React 17+

- Good: Widest reach.
- Bad: Oldest API constraints; least aligned with a forward-looking library.
