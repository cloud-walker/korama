import {describe, expect, test, vi} from "vitest"

import {mergeProps} from "./mergeProps"

describe("plain props", () => {
	test("props only in a are preserved", () => {
		const result = mergeProps({a: 1, b: 2}, {})
		expect(result).toEqual({a: 1, b: 2})
	})

	test("props only in b are added", () => {
		const result = mergeProps({}, {a: 1, b: 2})
		expect(result).toEqual({a: 1, b: 2})
	})

	test("b overrides a for the same key", () => {
		const result = mergeProps({x: "old"}, {x: "new"})
		expect(result).toEqual({x: "new"})
	})

	test("non-conflicting props from a and b are merged", () => {
		const result = mergeProps({a: 1}, {b: 2})
		expect(result).toEqual({a: 1, b: 2})
	})

	test("does not mutate the original a object", () => {
		const a = {x: 1}
		mergeProps(a, {x: 2, y: 3})
		expect(a).toEqual({x: 1})
	})

	test("null value in b overrides a", () => {
		const result = mergeProps({x: "value"}, {x: null})
		expect(result).toEqual({x: null})
	})
})

describe("event handlers (on* keys)", () => {
	test("when only b has a handler, b is used directly", () => {
		const handler = vi.fn().mockReturnValue("result")
		const result = mergeProps({}, {onClick: handler})
		const merged = result.onClick as (...args: unknown[]) => unknown
		const ret = merged("arg")
		expect(handler).toHaveBeenCalledWith("arg")
		expect(ret).toBe("result")
	})

	test("when only a has a handler, it is preserved unchanged", () => {
		const handler = vi.fn()
		const result = mergeProps({onClick: handler}, {})
		expect(result.onClick).toBe(handler)
	})

	test("when both have a handler, both are called", () => {
		const handlerA = vi.fn()
		const handlerB = vi.fn()
		const result = mergeProps({onClick: handlerA}, {onClick: handlerB})
		const merged = result.onClick as (...args: unknown[]) => unknown
		merged()
		expect(handlerA).toHaveBeenCalled()
		expect(handlerB).toHaveBeenCalled()
	})

	test("b is called before a", () => {
		const callOrder: string[] = []
		const handlerA = vi.fn(() => callOrder.push("a"))
		const handlerB = vi.fn(() => callOrder.push("b"))
		const result = mergeProps({onClick: handlerA}, {onClick: handlerB})
		const merged = result.onClick as (...args: unknown[]) => unknown
		merged()
		expect(callOrder).toEqual(["b", "a"])
	})

	test("the return value of b is returned", () => {
		const handlerA = vi.fn().mockReturnValue("from-a")
		const handlerB = vi.fn().mockReturnValue("from-b")
		const result = mergeProps({onClick: handlerA}, {onClick: handlerB})
		const merged = result.onClick as (...args: unknown[]) => unknown
		expect(merged()).toBe("from-b")
	})

	test("arguments are forwarded to both handlers", () => {
		const handlerA = vi.fn()
		const handlerB = vi.fn()
		const result = mergeProps({onKeyDown: handlerA}, {onKeyDown: handlerB})
		const merged = result.onKeyDown as (...args: unknown[]) => unknown
		const event = {key: "Enter"}
		merged(event)
		expect(handlerA).toHaveBeenCalledWith(event)
		expect(handlerB).toHaveBeenCalledWith(event)
	})

	test("when a.handler is falsy, b is returned directly", () => {
		const handlerB = vi.fn()
		const result = mergeProps(
			{onFocus: undefined as unknown as () => void},
			{onFocus: handlerB},
		)
		// a.onFocus is undefined (falsy): mergeEventHandlers returns parsedB directly
		const merged = result.onFocus as (...args: unknown[]) => unknown
		merged()
		expect(handlerB).toHaveBeenCalled()
	})

	test("on* key with non-function b value and no handler in a: value is set as-is", () => {
		// is(UnknownFunction, undefined) for baseValue → false, so mergeEventHandlers is not called
		const result = mergeProps({}, {onSomething: "not-a-function"})
		expect(result.onSomething).toBe("not-a-function")
	})
})

describe("className", () => {
	test("only a has className: it is preserved", () => {
		const result = mergeProps({className: "alpha"}, {})
		expect(result.className).toBe("alpha")
	})

	test("only b has className: it is used", () => {
		const result = mergeProps({}, {className: "beta"})
		expect(result.className).toBe("beta")
	})

	test("both have className: they are space-joined (a then b)", () => {
		const result = mergeProps({className: "alpha"}, {className: "beta"})
		expect(result.className).toBe("alpha beta")
	})

	test("concatenates multiple class tokens correctly", () => {
		const result = mergeProps({className: "a b"}, {className: "c d"})
		expect(result.className).toBe("a b c d")
	})

	test("empty string in a is falsy: result is only b", () => {
		const result = mergeProps({className: ""}, {className: "beta"})
		// "" is falsy → mergeClassNames returns only parsedB
		expect(result.className).toBe("beta")
	})
})

describe("style", () => {
	test("only a has style: it is preserved", () => {
		const result = mergeProps({style: {color: "red"}}, {})
		expect(result.style).toEqual({color: "red"})
	})

	test("only b has style: it is used", () => {
		const result = mergeProps({}, {style: {color: "blue"}})
		expect(result.style).toEqual({color: "blue"})
	})

	test("b overrides a for shared style keys", () => {
		const result = mergeProps(
			{style: {color: "red", fontSize: "12px"}},
			{style: {color: "blue"}},
		)
		expect(result.style).toEqual({color: "blue", fontSize: "12px"})
	})

	test("distinct style keys are merged", () => {
		const result = mergeProps(
			{style: {color: "red"}},
			{style: {background: "blue"}},
		)
		expect(result.style).toEqual({color: "red", background: "blue"})
	})

	test("does not mutate a.style", () => {
		const styleA = {color: "red"}
		mergeProps({style: styleA}, {style: {background: "blue"}})
		expect(styleA).toEqual({color: "red"})
	})

	test("falsy a.style: only b.style is used", () => {
		const result = mergeProps(
			{style: null as unknown as object},
			{style: {color: "blue"}},
		)
		// mergeStyles: if (!a) → true → returns parsedB
		expect(result.style).toEqual({color: "blue"})
	})
})

describe("combined scenarios", () => {
	test("className, style and event handler are each merged correctly", () => {
		const handlerA = vi.fn()
		const handlerB = vi.fn()
		const result = mergeProps(
			{
				className: "alpha",
				style: {color: "red"},
				onClick: handlerA,
				id: "box",
			},
			{
				className: "beta",
				style: {background: "blue"},
				onClick: handlerB,
				"data-testid": "merged",
			},
		)

		expect(result.className).toBe("alpha beta")
		expect(result.style).toEqual({color: "red", background: "blue"})
		expect(result.id).toBe("box")
		expect(result["data-testid"]).toBe("merged")

		const merged = result.onClick as (...args: unknown[]) => unknown
		merged()
		expect(handlerA).toHaveBeenCalled()
		expect(handlerB).toHaveBeenCalled()
	})

	test("props in a not present in b are always preserved", () => {
		const result = mergeProps(
			{aria: "label", role: "button", tabIndex: 0},
			{className: "foo"},
		)
		expect(result).toMatchObject({
			aria: "label",
			role: "button",
			tabIndex: 0,
			className: "foo",
		})
	})
})
