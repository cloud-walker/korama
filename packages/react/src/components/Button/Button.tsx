import {Box} from "../Box"

export namespace Button {
	export type Props = Box.Props<"button">
}

export function Button(props: Button.Props) {
	return <Box.button {...props} />
}
