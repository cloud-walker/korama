---
title: Publish packages as ESM-only
description: Korama's published packages ship ECMAScript modules only, with no CommonJS output.
status: Accepted
tags: [packaging, build, distribution]
---

# Publish packages as ESM-only

## Context and Problem Statement

Korama publishes libraries (`@korama/react`, `@korama/utils`) to npm. Each package must decide which module format(s) to ship: ESM only, CommonJS only, or a dual build. The choice shapes the build pipeline, the `exports` map, the package size, and which consumer environments are supported. Shipping both formats (dual package) is the historically "safe" option but carries the well-known dual-package hazard and doubles build and maintenance surface.

## Decision Drivers

- ECMAScript modules are the standard module system; the toolchain Korama targets (modern bundlers, Node 20+) is ESM-native.
- Korama is forward-looking by design (see [VISION](../VISION.md)): supporting legacy `require`-only consumers is an explicit non-goal.
- The dual-package hazard (a package loaded as both ESM and CJS in one graph) is a real correctness risk worth avoiding entirely.
- A single output format keeps the build simple and the published package small.
- Package correctness should be enforced mechanically, not by convention.

## Considered Options

- **ESM-only** — single `.mjs` + `.d.mts` output, `"type": "module"`.
- **Dual ESM + CJS** — ship both, with conditional `exports`.
- **CJS-only** — legacy-compatible, but incompatible with the forward-looking stance.

## Decision Outcome

Chosen: **ESM-only**. Each package's `exports` map exposes a single entry (`./dist/main.mjs` with `./dist/main.d.mts` types), `"type": "module"` is set, and `engines.node` is `>=20`. Correctness is enforced in CI via `publint --strict` and `attw --profile esm-only --pack .`.

### Consequences

- **Good:** No dual-package hazard; one code path for every consumer.
- **Good:** Simpler build (single `tsdown` output) and a smaller published artifact.
- **Good:** `publint` + `attw` gate the package shape, so regressions in the `exports`/types map fail CI rather than reaching consumers.
- **Bad:** Consumers in a CJS-only context (older Node without ESM, `require()`-only build setups) cannot consume the packages without an ESM interop layer. This is an accepted trade-off, not an oversight.

## Pros and Cons of the Options

### ESM-only

- Good: Standard-aligned, simplest build, smallest output, no dual-package hazard.
- Bad: Excludes legacy CJS-only consumers.

### Dual ESM + CJS

- Good: Broadest compatibility, including legacy `require` consumers.
- Bad: Dual-package hazard; double the build outputs and maintenance; larger package.

### CJS-only

- Good: Works in the oldest environments.
- Bad: Conflicts with the project's forward-looking direction; poor tree-shaking; effectively obsolete for a new library.
