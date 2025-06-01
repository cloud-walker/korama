import {expect, test} from "vitest"
import {render} from "vitest-browser-react"

import {Box} from "."

test("works properly", () => {
	const screen = render(<Box.button type="button">Click me</Box.button>)

	expect(screen.getByRole("button", {name: "Click me"})).toBeDefined()
})
