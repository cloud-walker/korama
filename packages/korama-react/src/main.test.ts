import { expect, expectTypeOf, test } from "vitest";

import * as API from "./main";

test("API is respected", () => {
  const APIKeys = Object.keys(API);

  expect(APIKeys).toMatchInlineSnapshot(`
    [
      "Box",
    ]
  `);
});

test("Box component is created", () => {
  expectTypeOf<API.BoxProps<"div">>().not.toBeNullable();
});
