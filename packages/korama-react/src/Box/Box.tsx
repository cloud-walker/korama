import { createElement } from "react";

type ElementType = Extract<React.ElementType, string>;

function makeElementComponent<TElementType extends ElementType>(
  element: TElementType
) {
  const Component = (props: React.ComponentPropsWithRef<TElementType>) => {
    return createElement(element, props);
  };
  Component.displayName = `Box.${element}`;
  return Component;
}

const componentsCache = new Map<
  ElementType,
  ReturnType<typeof makeElementComponent>
>();

export const Box = new Proxy<{
  [K in ElementType]: ReturnType<typeof makeElementComponent<K>>;
}>(
  // @ts-expect-error - we want to create a proxy for an object with dynamic keys
  {},
  {
    get(_, elementType: ElementType) {
      const ElementComponent =
        componentsCache.get(elementType) ?? makeElementComponent(elementType);
      componentsCache.set(elementType, ElementComponent);
      return ElementComponent;
    },
  }
);
