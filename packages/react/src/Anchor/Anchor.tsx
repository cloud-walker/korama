import {Box} from "../Box"

export declare namespace Anchor {
	export type Props = Box.Props<"a">
}

export function Anchor(props: Anchor.Props) {
	return <Box.a {...props} />
}
