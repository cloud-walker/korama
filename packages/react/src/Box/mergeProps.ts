import * as v from "valibot"

const UnknownFunction = v.function()
const UnknownRecord = v.record(v.string(), v.unknown())
type UnknownRecord = v.InferOutput<typeof UnknownRecord>

export function mergeProps(
	base: UnknownRecord,
	overrides: UnknownRecord,
): UnknownRecord {
	const props = {...base}

	for (const [overrideKey, overrideValue] of Object.entries(overrides)) {
		if (v.is(UnknownFunction, overrideValue) && overrideKey.startsWith("on")) {
			const baseValue = props[overrideKey]
			if (v.is(UnknownFunction, baseValue)) {
				props[overrideKey] = mergeEventHandlers(baseValue, overrideValue)
				continue
			}
		}

		if (overrideKey === "style") {
			props.style = mergeStyles(base.style, overrides.style)
			continue
		}

		if (overrideKey === "className") {
			props.className = mergeClassNames(base.className, overrides.className)
			continue
		}

		props[overrideKey] = overrideValue
	}

	return props
}

function mergeEventHandlers(
	rawBase: unknown,
	rawOverride: unknown,
): (...args: unknown[]) => unknown {
	const override = v.parse(UnknownFunction, rawOverride)
	if (!rawBase) {
		return override
	}
	const base = v.parse(UnknownFunction, rawBase)
	return (...args: unknown[]) => {
		const result = override(...args)
		base(...args)
		return result
	}
}

function mergeClassNames(rawBase: unknown, rawOverride: unknown): string {
	const override = v.parse(v.string(), rawOverride)
	if (!rawBase) {
		return `${override}`
	}
	return `${v.parse(v.string(), rawBase)} ${override}`
}

function mergeStyles(rawBase: unknown, rawOverride: unknown): UnknownRecord {
	const override = v.parse(UnknownRecord, rawOverride)
	if (!rawBase) {
		return override
	}
	return {...v.parse(UnknownRecord, rawBase), ...override}
}
