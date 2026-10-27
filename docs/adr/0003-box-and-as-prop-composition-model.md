# Polymorphic Box and the `as` prop as the component composition model

Every Korama component is built on a single polymorphic `Box` primitive (`Box.button`, `Box.a`, …) and exposes `BoxProps` as its shared base. Composition goes through an `as` prop that borrows its name from `styled-components`/`emotion` but its behavior from `@ariakit/react`'s render prop: it accepts an element (`as={<a href="..." />}`) or a function (`as={(props) => <a {...props} />}`), and Korama merges props and refs onto it (`mergeProps`, `mergeRefs`). The usage guide lives in `packages/react/composition.md`. The model relies on React 19, where `ref` is a regular prop and `forwardRef` is unnecessary ([0005](0005-react-19-baseline.md)).

## Considered options

- **`styled-components`-style `as`**: only swaps the tag; cannot merge a consumer's element or behavior.
- **Radix `asChild` / `Slot`**: real merging, but a separate mental model that merges onto a child rather than a unified primitive.
- **Per-element wrappers + `forwardRef`**: boilerplate scales with the number of elements and there is no single composition story.

## Consequences

It is a custom abstraction to learn: `as` suggests a tag swap but behaves like a render prop. The prop/ref merging inside `Box` and the polymorphic typing add non-trivial complexity.
