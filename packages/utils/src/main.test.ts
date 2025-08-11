import {expect, test} from "vitest"

import * as stuff from "./main"

test("contract is respected", () => {
	expect(stuff).toMatchInlineSnapshot(`
		{
		  "raise": [Function],
		}
	`)
})
