import {createContext, use} from "react"

import {raise} from "../raise"

export const PopoverContext = createContext<
	| {
			popoverRef: React.Ref<HTMLDivElement>
	  }
	| undefined
>(undefined)

export function usePopoverContext() {
	return use(PopoverContext) ?? raise("Popover context is not available.")
}
