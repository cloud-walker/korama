import {cloneElement, createElement, isValidElement} from "react"

import {mergeProps} from "./mergeProps"
import {getRefFromAsProp, mergeRefs} from "./mergeRefs"
import type {AsProp, ElementType} from "./types"

function makeElementComponent<TElementType extends ElementType>(
	element: TElementType,
) {
	const Component = ({as, ...props}: Box.Props<TElementType>) => {
		if (as == null) {
			return createElement(element, props)
		}
		if (isValidElement(as)) {
			const asRef = getRefFromAsProp(as)
			const mergedRef = mergeRefs(props.ref, asRef)
			return cloneElement(as, mergeProps(props, {...as.props, ref: mergedRef}))
		}
		return as(props)
	}
	Component.displayName = `Box.${element}`
	return Component
}

type ElementComponents = {
	[K in ElementType]: ReturnType<typeof makeElementComponent<K>>
}

const componentsCache: Partial<ElementComponents> = {}

export declare namespace Box {
	type Props<TElementType extends ElementType> =
		React.ComponentPropsWithRef<TElementType> & {
			as?: AsProp
		}
}
export const Box = new Proxy<ElementComponents>({} as ElementComponents, {
	get(_, elementType: ElementType) {
		componentsCache[elementType] ??= makeElementComponent(elementType)
		return componentsCache[elementType]
	},
})
