import {Box} from "../Box"
import {usePopoverContext} from "./PopoverContext"

export function PopoverTrigger(props: Box.Props<"button">) {
	const {popoverRef} = usePopoverContext()
	return (
		<Box.button
			{...props}
			onClick={() => {
				popoverRef.current?.showPopover()
			}}
		/>
	)
}
