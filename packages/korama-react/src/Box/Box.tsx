import {cloneElement, createElement} from "react"

type ElementType = Extract<React.ElementType, string>

export type BoxProps<TElementType extends ElementType> =
	React.ComponentPropsWithRef<TElementType> & {
		as?: React.ReactElement
	}

function makeElementComponent<TElementType extends ElementType>(
	element: TElementType,
) {
	const Component = ({as, ...props}: BoxProps<TElementType>) => {
		if (as == null) {
			return createElement(element, props)
		}

		return cloneElement(as, {...props, ...as.props})
	}
	Component.displayName = `Box.${element}`
	return Component
}

const componentsCache = new Map<
	ElementType,
	ReturnType<typeof makeElementComponent>
>()

export const Box = new Proxy<{
	[K in ElementType]: ReturnType<typeof makeElementComponent<K>>
}>(
	// @ts-expect-error - we want to create a proxy for an object with dynamic keys
	{},
	{
		get(_, elementType: ElementType) {
			const ElementComponent =
				componentsCache.get(elementType) ?? makeElementComponent(elementType)
			componentsCache.set(elementType, ElementComponent)
			return ElementComponent
		},
	},
)
