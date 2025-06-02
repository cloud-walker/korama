import {expect, test} from "vitest"
import {render} from "vitest-browser-react"

import {Box} from "."

test("works properly",() => {
	const screen = render(<Box.button type="button">Click me</Box.button>)

	expect(screen.getByRole("button", {name: "Click me"})).toBeInTheDocument()
})

test('render div as a button', async () => {
	const screen = render(<Box.div data-testid="div-as-button" as={<button data-testid="overridden" type="button" />}>Div as a button</Box.div>)

	screen.debug()

	expect(screen.getByRole('button', {name: 'Div as a button'})).toBeInTheDocument()
	expect(screen.getByTestId('overridden')).toBeInTheDocument()
})
