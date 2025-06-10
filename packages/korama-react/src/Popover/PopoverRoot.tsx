import {useRef} from "react"

import {PopoverContext} from "./PopoverContext"

export function PopoverRoot({children}: {children: React.ReactNode}) {
	const popoverRef = useRef<HTMLDivElement>(null)
	return <PopoverContext value={{popoverRef}}>{children}</PopoverContext>
}
