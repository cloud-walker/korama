import {expect, test} from "vitest"
import {raise} from "./raise"

test("as a string", () => {
	expect(() => raise("error message")).toThrowError("error message")
})

test("as an error", () => {
	expect(() => raise(new Error("error message"))).toThrowError("error message")
})

test("destructuring assignment", () => {
	function myFunc(props: {a: number; b?: number}) {
		const {a, b = raise("b is required")} = props

		return a + b
	}

	expect(() => myFunc({a: 1})).toThrowError("b is required")
})
