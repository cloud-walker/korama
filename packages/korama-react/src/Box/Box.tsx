import { createElement } from "react";

export function makeElementComponent<TElementType extends React.ElementType>(
  element: TElementType
) {
  const Component = (props: React.ComponentPropsWithRef<TElementType>) => {
    return createElement(element, props);
  };
  Component.displayName = `Box.${element}`;
  return Component;
}

export const Box = {};
