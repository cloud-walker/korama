# Target React 19 as the baseline version

`@korama/react` declares `peerDependencies.react: "^19.1"` and develops against React 19.2. React 19 makes `ref` a regular prop and removes `forwardRef`, which directly simplifies the `Box` / `as` composition model and its ref merging ([0003](0003-box-and-as-prop-composition-model.md)). Supporting legacy React majors is an explicit non-goal (see [VISION](../VISION.md)), consistent with ESM-only publishing ([0002](0002-esm-only-publishing.md)), and a single supported major keeps the compatibility matrix small. The workspace apps already run on React 19.

## Considered options

- **React 18+**: broader reach, but no ref-as-prop, `forwardRef` boilerplate and a wider matrix.
- **React 17+**: widest reach and the oldest API constraints.

## Consequences

Consumers on React 18 or earlier cannot use the library without upgrading.
