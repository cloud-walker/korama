---
title: Use Zod Mini as the validation library across Korama
description: Zod Mini (zod/v4-mini) is adopted as the official runtime validation library for the Korama monorepo.
status: Accepted
tags: [dependencies, validation, architecture]
proposals: []
---

# Use Zod Mini as the validation library across Korama

## Context and Problem Statement

Runtime data validation is a recurring need across Korama packages: narrowing generic `unknown` values in utilities, validating prop shapes in React components, and guarding against unexpected inputs at package boundaries. Without a shared choice, each package risks introducing different approaches (hand-written type guards, multiple schema libraries, unsafe `as` casts), leading to inconsistent safety guarantees and unpredictable consumer bundle costs.

## Decision Drivers

- Bundle size matters: Korama is a component library; every KB of runtime dependency is a cost consumers cannot opt out of.
- TypeScript-first: schemas should express the same contracts as TypeScript types without duplication.
- Composability: validation logic should be declarative and easy to combine, not a collection of one-off `typeof` checks.
- Tree-shaking: unused validators must not appear in consumer bundles.
- Ecosystem fit: the chosen library should be familiar to developers already using adjacent tools in the React ecosystem.

## Considered Options

- **Zod Mini** (`zod/v4-mini`) — functional subset of Zod v4, ~10–12 KB min+gzip, native tree-shaking, TypeScript-first inference, wide ecosystem.
- **Valibot** — functional, ~10 KB min+gzip, native tree-shaking, TypeScript-first inference, smaller ecosystem.
- **Zod** (full) — OOP/fluent, ~50 KB min+gzip, partial tree-shaking, dominant ecosystem.
- **Hand-written type guards** — zero dependencies, no composability, no declarative schema.
- **No runtime validation** — compile-time only; unsafe when handling dynamic or `unknown` data.

## Decision Outcome

Chosen: **Zod Mini** (`zod/v4-mini`), because its bundle footprint (~10–12 KB) is comparable to Valibot while offering the significantly broader Zod ecosystem. Consumers who already use Zod (tRPC, TanStack Form, react-hook-form, etc.) pay no additional bundle cost, and developers familiar with Zod's API need no context switch.

### Consequences

- **Good:** Consistent validation story across all packages.
- **Good:** Native tree-shaking keeps consumer bundle cost proportional to actual usage.
- **Good:** Type inference via `z.output<typeof Schema>` eliminates schema/type duplication.
- **Good:** Consumers already using Zod (very common in the React ecosystem) share the dependency at zero marginal cost.
- **Good:** Zod v4-mini API is a strict subset of Zod v4 full — upgrading to full Zod is a one-line import change.
- **Bad:** Slightly larger footprint than Valibot in isolation (~10–12 KB vs ~10 KB); negligible in practice.

## Pros and Cons of the Options

### Zod Mini (`zod/v4-mini`)

- Good: ~10–12 KB min+gzip — appropriate for a library dependency.
- Good: Functional API subset; every schema is a standalone function, enabling full tree-shaking.
- Good: `.safeParse()` for zero-throw narrowing in hot paths; `.parse()` for validated parsing with exceptions.
- Good: Dominant ecosystem — Zod is the de-facto validation standard in the React/TypeScript ecosystem.
- Good: Familiar API for developers coming from tRPC, TanStack Form, react-hook-form, etc.

### Valibot

- Good: ~10 KB min+gzip — slightly smaller than Zod Mini.
- Good: Functional API; every schema is a standalone function, enabling full tree-shaking.
- Bad: Smaller ecosystem (plugins, integrations) compared to Zod.
- Bad: Less familiar for developers coming from tRPC/TanStack.

### Zod (full)

- Good: Dominant ecosystem, widely known fluent API, extensive integrations.
- Bad: ~50 KB min+gzip — disproportionate for a component library where consumers have no choice.
- Bad: OOP/fluent design limits tree-shaking effectiveness.

### Hand-written type guards

- Good: Zero runtime dependencies.
- Bad: No composability; each guard must be written and tested individually.
- Bad: Inferred types are less precise than schema-derived types.

### No runtime validation

- Good: Zero cost.
- Bad: Unsafe for `unknown` inputs, dynamic data, and unconstrained generics that TypeScript cannot verify at runtime.

---

## Usage guidelines

**Do:**
- Import from `"zod/v4-mini"`: `import { z } from "zod/v4-mini"`.
- Use a local `is(schema)(value)` higher-order helper for narrowing in hot paths (no exception thrown).
- Use `Schema.parse(value)` at package boundaries where invalid input should be a hard error.
- Derive TypeScript types from schemas: `type Foo = z.output<typeof FooSchema>`.

**Do not:**
- Expose Zod schemas in a package's public API surface — they are an internal implementation detail.
- Use `Schema.parse` inside React render functions; prefer the `is` helper or move parsing to the call site.
- Add Zod validation to public React props — rely on TypeScript at compile time instead.
- Import from `"zod"` (full build) — always use `"zod/v4-mini"` to keep the bundle minimal.
