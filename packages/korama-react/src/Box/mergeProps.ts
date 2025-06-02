export function mergeProps(
	base: Record<string, unknown>,
	overrides: Record<string, unknown>,
) {
	const props = {...base}

	for (const [overrideKey, overrideValue] of Object.entries(overrides)) {
		if (typeof overrideValue === "function" && overrideKey.startsWith("on")) {
			const baseValue = props[overrideKey]
			if (typeof baseValue === "function") {
				props[overrideKey] = (...args: unknown[]) => {
					const result = overrideValue(...args)
					baseValue(...args)
					return result
				}
				continue
			}
		}

		props[overrideKey] = overrideValue
	}

	return props
}
