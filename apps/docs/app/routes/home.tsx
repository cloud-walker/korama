import {Box, Popover} from "@korama/react"
import {css} from "styled-system/css"
import {styled} from "styled-system/jsx"

export default function Home() {
	return (
		<>
			<h1
				className={css({
					color: "red.700",
				})}
			>
				Hello, Korama!
			</h1>
			<Box.div
				as={(p) => (
					<button
						{...p}
						type="button"
						onClick={() => {
							console.log("Button clicked")
						}}
					/>
				)}
			>
				aho
			</Box.div>

			<Popover.Root>
				<Popover.Trigger>Click me</Popover.Trigger>
				<Popover.Content>asdsdsadsad</Popover.Content>
			</Popover.Root>
		</>
	)
}
