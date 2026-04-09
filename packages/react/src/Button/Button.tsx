import {Box} from "../Box"

export declare namespace Button {
	type Props = Box.Props<"button">
}

export function Button(props: Button.Props) {
	return <Box.button {...props} />
}
