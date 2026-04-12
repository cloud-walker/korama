import { z } from "zod/v4-mini"

const UnknownFunction = z.function({ input: z.array(z.unknown()) })
const UnknownRecord = z.record(z.string(), z.unknown())
type UnknownRecord = z.output<typeof UnknownRecord>

function is<T extends z.ZodMiniType>(schema: T) {
	return (value: unknown): value is z.output<T> =>
		schema.safeParse(value).success
}

export function mergeProps(
	base: UnknownRecord,
	overrides: UnknownRecord,
): UnknownRecord {
	const props = {...base}

	for (const [overrideKey, overrideValue] of Object.entries(overrides)) {
		if (is(UnknownFunction)(overrideValue) && overrideKey.startsWith("on")) {
			const baseValue = props[overrideKey]
			if (is(UnknownFunction)(baseValue)) {
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
	const override = UnknownFunction.parse(rawOverride)
	if (!rawBase) {
		return override
	}
	const base = UnknownFunction.parse(rawBase)
	return (...args: unknown[]) => {
		const result = override(...args)
		base(...args)
		return result
	}
}

function mergeClassNames(rawBase: unknown, rawOverride: unknown): string {
	const override = z.string().parse(rawOverride)
	if (!rawBase) {
		return `${override}`
	}
	return `${z.string().parse(rawBase)} ${override}`
}

function mergeStyles(rawBase: unknown, rawOverride: unknown): UnknownRecord {
	const override = UnknownRecord.parse(rawOverride)
	if (!rawBase) {
		return override
	}
	return {...UnknownRecord.parse(rawBase), ...override}
}
