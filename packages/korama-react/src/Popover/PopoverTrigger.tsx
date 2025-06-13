import {Box} from "../Box"
import {usePopoverContext} from "./PopoverContext"

export function PopoverTrigger(props: Box.Props<"button">) {
	const {popoverRef, targetId} = usePopoverContext()
	return (
		<Box.button
			{...props}
			popoverTarget={targetId}
			style={{
				anchorName: targetId,
				border: "1px solid",
			}}
			// onClick={() => {
			// 	const popoverEl = popoverRef.current
			// 	if (popoverEl == null) {
			// 		throw new Error("Popover reference is not set.")
			// 	}
			// 	popoverEl.togglePopover()
			// }}
		/>
	)
}
