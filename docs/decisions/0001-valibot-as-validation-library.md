---
title: Use Valibot as the validation library across Korama
description: Valibot is adopted as the official runtime validation library for the Korama monorepo.
status: Accepted
tags: [dependencies, validation, architecture]
proposals: []
---

# Use Valibot as the validation library across Korama

## Context and Problem Statement

Runtime data validation is a recurring need across Korama packages: narrowing generic `unknown` values in utilities, validating prop shapes in React components, and guarding against unexpected inputs at package boundaries. Without a shared choice, each package risks introducing different approaches (hand-written type guards, multiple schema libraries, unsafe `as` casts), leading to inconsistent safety guarantees and unpredictable consumer bundle costs.

## Decision Drivers

- Bundle size matters: Korama is a component library; every KB of runtime dependency is a cost consumers cannot opt out of.
- TypeScript-first: schemas should express the same contracts as TypeScript types without duplication.
- Composability: validation logic should be declarative and easy to combine, not a collection of one-off `typeof` checks.
- Tree-shaking: unused validators must not appear in consumer bundles.

## Considered Options

- **Valibot** — functional, ~10 KB min+gzip, native tree-shaking, TypeScript-first inference.
- **Zod** — OOP/fluent, ~50 KB min+gzip, partial tree-shaking, dominant ecosystem.
- **Hand-written type guards** — zero dependencies, no composability, no declarative schema.
- **No runtime validation** — compile-time only; unsafe when handling dynamic or `unknown` data.

## Decision Outcome

Chosen: **Valibot**, because its bundle footprint (~10 KB) is appropriate for a component library, and its functional architecture provides native tree-shaking that prevents unused validators from reaching consumer bundles.

### Consequences

- **Good:** Consistent validation story across all packages.
- **Good:** Native tree-shaking keeps consumer bundle cost proportional to actual usage.
- **Good:** Type inference via `v.InferOutput<typeof Schema>` eliminates schema/type duplication.
- **Bad:** Consumers who already use Zod will have both libraries in their bundle; tree-shaking mitigates but does not eliminate this.
- **Bad:** Valibot's ecosystem (plugins, integrations) is smaller than Zod's.

## Pros and Cons of the Options

### Valibot

- Good: ~10 KB min+gzip — appropriate for a library dependency.
- Good: Functional API; every schema is a standalone function, enabling full tree-shaking.
- Good: `v.is()` for zero-cost narrowing in hot paths; `v.parse()` / `v.safeParse()` for validated parsing.
- Bad: Less familiar than Zod for developers coming from tRPC/TanStack.
- Bad: Reached v1.x stability in 2024 — mature but younger than Zod.

### Zod

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
- Use `v.is(Schema, value)` for narrowing in hot paths (no exception thrown).
- Use `v.parse(Schema, value)` at package boundaries where invalid input should be a hard error.
- Derive TypeScript types from schemas: `type Foo = v.InferOutput<typeof FooSchema>`.

**Do not:**
- Expose valibot schemas in a package's public API surface — they are an internal implementation detail.
- Use `v.parse` inside React render functions; prefer `v.is` or move parsing to the call site.
- Add valibot to validate public React props — rely on TypeScript at compile time instead.
