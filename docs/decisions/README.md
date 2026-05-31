# Decisions (ADRs)

Architectural Decision Records capture the significant decisions made for Korama and the rationale behind them — what was decided, why, and the consequences.

To create or evolve an ADR, use the `authoring-adr` skill: it covers numbering, status transitions, and keeping the status table below up to date.

## Status

| #    | Title                                                                          | Status   |
| ---- | ------------------------------------------------------------------------------ | -------- |
| [0001](0001-zod-mini-as-validation-library.md) | Use Zod Mini as the validation library across Korama | Accepted |
| [0002](0002-esm-only-publishing.md) | Publish packages as ESM-only | Accepted |
| [0003](0003-box-and-as-prop-composition-model.md) | Polymorphic Box and the `as` prop as the component composition model | Accepted |
| [0004](0004-browser-mode-component-testing.md) | Test components in a real browser with Vitest browser mode | Accepted |
| [0005](0005-react-19-baseline.md) | Target React 19 as the baseline version | Accepted |
| [0006](0006-pandacss-as-official-styling-solution.md) | Adopt PandaCSS, wrapped by @korama/core, as the official styling solution | Accepted |

Lifecycle: `Proposed` → `Accepted` → `Retired` / `Superseded` (or `Rejected` if never adopted).

| Status | Meaning |
| ------ | ------- |
| `Proposed` | Drafted, not yet confirmed |
| `Accepted` | Confirmed and in effect |
| `Rejected` | Considered but not adopted |
| `Retired` | No longer relevant (e.g. the feature was removed) |
| `Superseded` | Replaced by a newer ADR |

## Template

New ADRs follow this structure. Copy it into `NNNN-kebab-slug.md` (next sequential number in this folder) and add a row to the status table above.

````markdown
---
title: <Short title>
description: <One-line summary of the decision — used for AI context skimming>
status: Proposed # Proposed | Accepted | Rejected | Retired | Superseded
tags: []
---

# <Title>

## Context and Problem Statement

What is the situation that forced a decision? What problem were we trying to solve?

## Decision Drivers

- Driver 1
- Driver 2

## Considered Options

- Option A
- Option B
- Option C

## Decision Outcome

Chosen: **Option A**, because <justification>.

### Consequences

- **Good:** ...
- **Bad:** ...

## Pros and Cons of the Options

### Option A

- Good: ...
- Bad: ...

### Option B

- Good: ...
- Bad: ...
````
