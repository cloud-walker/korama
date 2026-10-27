export type ElementType = Extract<React.ElementType, string>

/**
 * @public
 */
export type RenderProp<
	// oxlint-disable-next-line typescript/no-explicit-any -- We intentionally allow any here to be able to merge props
	TProps = React.HTMLAttributes<any> & {
		// oxlint-disable-next-line typescript/no-explicit-any -- We intentionally allow any here to be able to merge props
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
