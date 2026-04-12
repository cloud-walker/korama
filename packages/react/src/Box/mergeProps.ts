import {z} from "zod/mini"

const UnknownFunction = z.function({input: z.array(z.unknown())})
type UnknownFunction = z.output<typeof UnknownFunction>
const UnknownRecord = z.record(z.string(), z.unknown())
type UnknownRecord = z.output<typeof UnknownRecord>

function is<T extends z.ZodMiniType>(
	schema: T,
	value: unknown,
): value is z.output<T> {
	return schema.safeParse(value).success
}

export function mergeProps(a: UnknownRecord, b: UnknownRecord): UnknownRecord {
	const props = {...a}

	for (const [bKey, bValue] of Object.entries(b)) {
		if (is(UnknownFunction, bValue) && bKey.startsWith("on")) {
			const aValue = props[bKey]
			if (is(UnknownFunction, aValue)) {
				props[bKey] = mergeEventHandlers(aValue, bValue)
				continue
			}
		}

		if (bKey === "style") {
			props.style = mergeStyles(a.style, b.style)
			continue
		}

		if (bKey === "className") {
			props.className = mergeClassNames(a.className, b.className)
			continue
		}

		props[bKey] = bValue
	}

	return props
}

function mergeEventHandlers(a: unknown, b: unknown): UnknownFunction {
	const parsedB = UnknownFunction.parse(b)
	if (!a) {
		return parsedB
	}
	const parsedA = UnknownFunction.parse(a)
	return (...args: unknown[]) => {
		const result = parsedB(...args)
		parsedA(...args)
		return result
	}
}

function mergeClassNames(a: unknown, b: unknown): string {
	const parsedB = z.string().parse(b)
	if (!a) {
		return `${parsedB}`
	}
	return `${z.string().parse(a)} ${parsedB}`
}

function mergeStyles(a: unknown, b: unknown): UnknownRecord {
	const parsedB = UnknownRecord.parse(b)
	if (!a) {
		return parsedB
	}
	return {...UnknownRecord.parse(a), ...parsedB}
}
