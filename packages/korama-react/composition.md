## `Box` component

The `Box` component is the swiss army knife of the Korama UI library. It allows you to create every kind of HTML element, but also providing a bunch of useful features on top of the basic standard HTML props.

```tsx
import { Box } from "@korama/react";

export function MyComponent() {
  return <Box.button type="button" />;
}
```

Every component in Korama, tends to expose the `Box` component props.

## The `as` prop

The `as` prop in korama borrows the name from the `as` prop from libraries like `styled-components` and `emotion`. But works more like the `render` prop from `@ariakit/react`.

This lets us elegantly solve common composition problems, where we want to render a component, but we want a different HTML element to be rendered.

```tsx
// MyButton.tsx
import { Box, type BoxProps } from "@korama/react";

export function MyButton(props: BoxProps<"button">) {
  return <Box.button className="btn" {...props} />;
}

// MyComponent.tsx
import { MyButton } from "./MyButton";

export function MyComponent() {
  return <MyButton as={<a href="/some-page" />}>Go to some page</MyButton>;
}
```

Or you can use the `as` prop as a function for more complex cases:

```tsx
// MyComponent.tsx
import { MyButton } from "./MyButton";

export function MyComponent() {
  return (
    <MyButton as={(props) => <a href="/some-page" {...props} />}>
      Go to some page
    </MyButton>
  );
}
```

p
