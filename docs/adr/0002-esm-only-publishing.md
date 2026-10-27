# Publish packages as ESM-only

Korama's published packages (`@korama/react`, `@korama/utils`) ship ECMAScript modules only: a single `./dist/main.mjs` entry with `./dist/main.d.mts` types, `"type": "module"`, and `engines.node >= 20`. Supporting `require`-only consumers is an explicit non-goal (see [VISION](../VISION.md)), and a single format avoids the dual-package hazard and halves the build and maintenance surface. The build enforces the package shape through the tsdown `publint` (strict) and `attw` (`esm-only` profile) options, both at `error` level.

## Considered options

- **Dual ESM + CJS**: broadest compatibility, but the dual-package hazard, double outputs and a larger package.
- **CJS-only**: conflicts with the forward-looking direction and tree-shakes poorly.

## Consequences

Consumers in CJS-only contexts (older Node, `require()`-only build setups) cannot consume the packages without an ESM interop layer. This is an accepted trade-off, not an oversight.
