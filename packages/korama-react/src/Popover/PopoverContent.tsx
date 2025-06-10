import {Box} from "../Box"
import {usePopoverContext} from "./PopoverContext"

export function PopoverContent(props: Box.Props<"div">) {
	const {popoverRef} = usePopoverContext()
	return <Box.div {...props} ref={popoverRef} />
}
