export type ElementType = Extract<React.ElementType, string>

export type RenderProp<
	// biome-ignore lint/suspicious/noExplicitAny: We intentionally allow any here to be able to merge props
	TProps = React.HTMLAttributes<any> & {
		// biome-ignore lint/suspicious/noExplicitAny: We intentionally allow any here to be able to merge props
		ref?: React.Ref<any>
	},
> = (props: TProps) => React.ReactNode

export type AsProp =
	| React.ReactElement<
			Record<string, unknown> & {
				ref?: React.Ref<HTMLElement> | undefined
			}
	  >
	| RenderProp
