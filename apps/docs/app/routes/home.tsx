import {Box} from "@korama/react"
import {css} from "styled-system/css"

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
		</>
	)
}
