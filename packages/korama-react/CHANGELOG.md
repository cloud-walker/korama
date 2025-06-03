# @korama/react

## 0.1.1

### Patch Changes

- 7768cda: Expose dist folder

## 0.1.0

### Minor Changes

- 1d39fb5: Add Box component with polymorphic `as` prop

  The Box component provides a flexible way to render any HTML element with the ability to override the element type using the `as` prop. This enables powerful composition patterns while maintaining type safety.

  Features:

  - Dynamic element creation via proxy (e.g., `Box.div`, `Box.button`, etc.)
  - Polymorphic `as` prop accepting React elements or render functions

  Usage examples:

  ```tsx
  // Basic usage
  <Box.button type="button">Click me</Box.button>

  // Override element type
  <Box.div as={<button type="button" />}>Div as button</Box.div>

  // Render prop pattern
  <Box.div as={(props) => <button {...props} type="button" />}>
    Custom button
  </Box.div>
  ```
