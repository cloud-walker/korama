---
title: Polymorphic Box and the `as` prop as the component composition model
description: Korama components are built on a single polymorphic Box primitive and compose via an `as` prop with render-prop semantics.
status: Accepted
tags: [architecture, react, api-design]
---

# Polymorphic Box and the `as` prop as the component composition model

## Context and Problem Statement

A component library must answer two recurring questions: how does a component render as a different underlying element when needed (e.g. a button that should be a link), and how do consumers compose their own components on top of the library's? Common React patterns each have trade-offs — per-element wrapper components proliferate boilerplate, the `styled-components`/`emotion` `as` prop only swaps the tag (it cannot merge behavior), and Radix's `asChild`/`Slot` solves merging but adds its own mental model. Korama needs one consistent answer shared by every component.

## Decision Drivers

- **Polymorphism without proliferation:** a single primitive should produce any HTML element rather than requiring a wrapper component per tag.
- **Real composition, not just tag swapping:** consumers must be able to render their component *as* an arbitrary element while the library merges props and refs onto it.
- **API consistency:** every Korama component should expose the same `Box` props as its base, so learning one component teaches them all.

## Considered Options

- **Polymorphic `Box` + `as` prop (render-prop semantics)** — one primitive; `as` accepts an element or a function and merges props/refs onto it, behaving like `@ariakit/react`'s render prop.
- **`styled-components`-style `as`** — `as` only changes the rendered tag; no prop/ref merging.
- **Radix `asChild` / `Slot`** — composition via a `Slot` that merges onto a single child.
- **Per-element wrapper components + `forwardRef`** — explicit components for each element.

## Decision Outcome

Chosen: **Polymorphic `Box` + `as` prop**. `Box` is the foundational primitive (`Box.button`, `Box.a`, …) and every component exposes `BoxProps`. The `as` prop borrows its *name* from `styled-components`/`emotion` but its *behavior* from `@ariakit/react`'s render prop: it accepts either an element (`as={<a href="..." />}`) or a function (`as={(props) => <a {...props} />}`), and Korama merges props and refs onto it (`mergeProps`, `mergeRefs`). The usage guide lives in `packages/react/composition.md`. This model pairs with React 19 as the baseline ([0005](0005-react-19-baseline.md)), where `ref` is a regular prop and `forwardRef` is unnecessary.

### Consequences

- **Good:** One primitive covers every element; no wrapper-per-tag boilerplate.
- **Good:** Consumers compose freely, with library behavior (props/refs) merged onto their element.
- **Good:** Uniform API — `BoxProps` is the shared base across all components.
- **Bad:** It is a custom abstraction contributors and consumers must learn (the `as` name implies tag-swap but behaves like a render prop).
- **Bad:** Prop- and ref-merging logic inside `Box` is non-trivial, and typing the polymorphic `as` prop adds TypeScript complexity.

## Pros and Cons of the Options

### Polymorphic `Box` + `as` prop

- Good: Polymorphic, composable, consistent; leverages React 19 ref-as-prop.
- Bad: Custom model to learn; internal merging and generic typing complexity.

### `styled-components`-style `as`

- Good: Familiar, trivial to implement.
- Bad: Only swaps the tag; cannot merge a consumer's element/behavior.

### Radix `asChild` / `Slot`

- Good: Real merging composition, proven pattern.
- Bad: Separate mental model; merges onto a child rather than a unified polymorphic primitive.

### Per-element wrappers + `forwardRef`

- Good: Explicit and simple per component.
- Bad: Boilerplate scales with the number of elements; no single composition story.
