import type {AsProp} from "./types"

export function getRefFromAsProp(as?: AsProp) {
	if (as == null || typeof as === "function") {
		return
	}
	return as.props.ref
}

export function mergeRefs(
	...refs: readonly (React.Ref<unknown> | undefined)[]
) {
	if (refs.every((r) => r == null)) {
		return
	}
	return (value: unknown) => {
		for (const ref of refs) {
			if (typeof ref === "function") {
				ref(value)
				continue
			}
			if (ref != null) {
				ref.current = value
			}
		}
	}
}
