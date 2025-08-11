/**
 * Functional way to throw an error, it's useful to be able
 * to throw errors inside expressions.
 *
 * @param error The error to raise. It can be anything, if it's a string, it will be converted to an Error object.
 */
export function raise(error: unknown): never {
	throw typeof error === "string" ? new Error(error) : error
}
