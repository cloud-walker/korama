import {Box} from "../Box"

export namespace Anchor {
	export type Props = Box.Props<"a">
}

export function Anchor(props: Anchor.Props) {
	return <Box.a {...props} />
}
