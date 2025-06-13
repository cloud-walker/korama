import {Box} from "../Box"
import {usePopoverContext} from "./PopoverContext"

export function PopoverContent(props: Box.Props<"div">) {
	const {popoverRef, targetId} = usePopoverContext()
	return (
		<Box.div
			id={targetId}
			popover="auto"
			{...props}
			ref={popoverRef}
			style={{
				positionAnchor: targetId,
				top: "anchor(top)",
				border: "1px solid",
			}}
		/>
	)
}
