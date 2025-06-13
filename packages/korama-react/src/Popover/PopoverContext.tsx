import {createContext, use} from "react"

import {raise} from "../raise"

export const PopoverContext = createContext<
	| {
			popoverRef: React.RefObject<HTMLDivElement | null>
			targetId: string
	  }
	| undefined
>(undefined)

export function usePopoverContext() {
	return use(PopoverContext) ?? raise("Popover context is not available.")
}
