import {describe, expect, test, vi} from "vitest"
import {render} from "vitest-browser-react"

import {Box} from "."

test("works properly", async () => {
	const screen = await render(<Box.button type="button">Click me</Box.button>)

	expect(screen.getByRole("button", {name: "Click me"})).toBeInTheDocument()
})

describe("as prop", () => {
	test("render div as a button", async () => {
		const screen = await render(
			<Box.div as={<button type="button" />}>Div as a button</Box.div>,
		)

		expect(
			screen.getByRole("button", {name: "Div as a button"}),
		).toBeInTheDocument()
	})

	test("overrides props of the default element", async () => {
		const screen = await render(
			<Box.div
				data-testid="default"
				as={<button data-testid="overidden" type="button" />}
			>
				Div as a button
			</Box.div>,
		)

		expect(screen.getByTestId("overidden")).toBeInTheDocument()
	})

	test("event handlers override", async () => {
		const handleDivClick = vi.fn()
		const handleButtonClick = vi.fn()
		const screen = await render(
			<Box.div
				onClick={handleDivClick}
				as={<button type="button" onClick={handleButtonClick} />}
			>
				Click me
			</Box.div>,
		)

		const button = screen.getByRole("button", {name: "Click me"})

		await button.click()

		expect.soft(handleDivClick).toHaveBeenCalled()
		expect.soft(handleButtonClick).toHaveBeenCalled()
	})

	test("merge style props", async () => {
		const screen = await render(
			<Box.div
				style={{color: "rgb(0, 255, 0)", backgroundColor: "rgb(0, 0, 255)"}}
				as={<button type="button" style={{color: "rgb(255, 0, 0)"}} />}
			>
				Click me
			</Box.div>,
		)

		const button = screen.getByRole("button", {name: "Click me"})
		await expect.element(button).toBeInTheDocument()
		await expect
			.element(button)
			.toHaveStyle({color: "rgb(255, 0, 0)", backgroundColor: "rgb(0, 0, 255)"})
	})

	test("merge className props", async () => {
		const screen = await render(
			<Box.div className="alpha" as={<button type="button" className="beta" />}>
				Click me
			</Box.div>,
		)

		const button = screen.getByRole("button", {name: "Click me"})
		await expect.element(button).toBeInTheDocument()
		await expect.element(button).toHaveClass("alpha beta")
	})

	test("pass className and style props to the as prop element", async () => {
		const screen = await render(
			<Box.div
				as={
					<button
						type="button"
						className="alpha"
						style={{color: "rgb(0, 255, 0)"}}
					/>
				}
			>
				Click me
			</Box.div>,
		)

		const button = screen.getByRole("button", {name: "Click me"})
		expect(button).toHaveClass("alpha")
		expect(button).toHaveStyle({color: "rgb(0, 255, 0)"})
	})

	test("render prop", async () => {
		const screen = await render(
			<Box.div as={(props) => <button {...props} type="button" />}>
				Render prop button
			</Box.div>,
		)

		expect(
			screen.getByRole("button", {name: "Render prop button"}),
		).toBeInTheDocument()
	})
})

describe("ref handling", () => {
	test("should forward ref to the underlying element", async () => {
		const ref = vi.fn()
		await render(<Box.div ref={ref}>Test</Box.div>)

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
	})

	test("should forward ref to the as prop element", async () => {
		const ref = vi.fn()
		await render(
			<Box.div as={<button type="button" ref={ref} />}>Test</Box.div>,
		)

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
	})

	test("should forward ref to the render prop element", async () => {
		const ref = vi.fn()
		await render(
			<Box.div as={(props) => <button {...props} type="button" ref={ref} />}>
				Render prop button with ref
			</Box.div>,
		)

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
	})

	test("should forward ref on both <Box.div> and <button>", async () => {
		const buttonRef = vi.fn()
		const divRef = vi.fn()
		await render(
			<Box.div ref={divRef} as={<button type="button" ref={buttonRef} />}>
				Test
			</Box.div>,
		)

		expect.soft(divRef).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
		expect.soft(buttonRef).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
	})
})
