import {cloneElement, createElement, isValidElement} from "react"
import {mergeProps} from "./mergeProps"

type ElementType = Extract<React.ElementType, string>

type RenderProp<
	// biome-ignore lint/suspicious/noExplicitAny: We intentionally allow any here to be able to merge props
	TProps = React.HTMLAttributes<any> & {
		// biome-ignore lint/suspicious/noExplicitAny: We intentionally allow any here to be able to merge props
		ref?: React.Ref<any>
	},
> = (props: TProps) => React.ReactNode

export type BoxProps<TElementType extends ElementType> =
	React.ComponentPropsWithRef<TElementType> & {
		as?: React.ReactElement<Record<string, unknown>> | RenderProp
	}

function makeElementComponent<TElementType extends ElementType>(
	element: TElementType,
) {
	const Component = ({as, ...props}: BoxProps<TElementType>) => {
		if (as == null) {
			return createElement(element, props)
		}

		if (isValidElement(as)) {
			return cloneElement(as, mergeProps(props, as.props))
		}

		return as(props)
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
