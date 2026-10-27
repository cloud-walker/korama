# Adopt PandaCSS, wrapped by `@korama/core`, as the official styling solution

Korama needs a type-safe, zero-runtime styling foundation that every package can build on and that powers a typed `css` prop on `Box`, pairing with the `as` prop ([0003](0003-box-and-as-prop-composition-model.md)). We adopt PandaCSS, but as an implementation detail hidden behind `@korama/core`: Korama is deliberately more opinionated than Panda, so it curates a subset of Panda's surface and adds its own utilities rather than re-exporting everything.

- `@korama/core` (main) exposes runtime styling primitives: some Panda passthrough (e.g. `css`, `cx`), some Korama-defined.
- `@korama/core/dev` exposes a `defineConfig` for authoring Korama's styling configuration.
- Consumers configure styling in a `korama.config.ts`, not a `panda.config.ts`.
- The `css` prop on `Box` resolves through `@korama/core`'s utilities and composes with `as`. Its detailed API is left to a follow-up decision.

This pairs with ESM-only publishing ([0002](0002-esm-only-publishing.md)) and the React 19 baseline ([0005](0005-react-19-baseline.md)).

## Considered options

- **PandaCSS used directly**: less code for us, but it leaks the engine into the public API and couples consumers to Panda's whole configuration space, contrary to [VISION](../VISION.md).
- **Runtime CSS-in-JS** (emotion, styled-components, stitches): runtime cost; stitches is unmaintained.
- **Tailwind CSS**: weaker theming than Panda and not type-safe; class strings integrate poorly with a typed `css` prop and tokens.
- **vanilla-extract / CSS Modules**: less ergonomic for a polymorphic `css` prop and an opinionated token/utility model.

## Consequences

Consumers must run Korama's codegen (which wraps Panda's), and the `css` prop relies on Panda's static extraction since nothing is generated at runtime. Wrapping Panda is ongoing work: every part of its surface we want to support must be curated and re-exposed through `@korama/core`.
