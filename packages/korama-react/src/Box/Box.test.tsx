import {describe, expect, test} from "vitest"
import {render} from "vitest-browser-react"

import {Box} from "."

test("works properly", () => {
	const screen = render(<Box.button type="button">Click me</Box.button>)

	expect(screen.getByRole("button", {name: "Click me"})).toBeInTheDocument()
})

describe("as prop", () => {
	test("render div as a button", async () => {
		const screen = render(
			<Box.div as={<button type="button" />}>Div as a button</Box.div>,
		)

		expect(
			screen.getByRole("button", {name: "Div as a button"}),
		).toBeInTheDocument()
	})

	test("overrides props of the default element", () => {
		const screen = render(
			<Box.div
				data-testid="default"
				as={<button data-testid="overidden" type="button" />}
			>
				Div as a button
			</Box.div>,
		)

		expect(screen.getByTestId("overidden")).toBeInTheDocument()
	})
})
