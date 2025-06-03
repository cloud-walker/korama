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

		if (overrideKey === "style") {
			props.style = base.style
				? {...base.style, ...(overrides.style as Record<string, unknown>)}
				: overrides.style
			continue
		}

		if (overrideKey === "className") {
			props.className = base.className
				? `${base.className} ${overrideValue}`
				: overrideValue
			continue
		}

		props[overrideKey] = overrideValue
	}

	return props
}
