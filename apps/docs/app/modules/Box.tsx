import { createElement } from "react";

export namespace Box {
  export interface Props extends React.ComponentPropsWithRef<"div"> {
    as?: unknown;
    css?: unknown;
  }
}
export function Box(props: Box.Props) {
  return createElement("div", props);
}
