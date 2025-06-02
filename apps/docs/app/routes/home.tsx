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
			<Box.button>aho</Box.button>
		</>
	)
}
