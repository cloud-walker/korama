import type {Config} from "@pandacss/dev"

export function defineConfig(): Config {
	return {
		shorthands: false,
		syntax: "object-literal",
		strictTokens: true,
		strictPropertyValues: true,
		eject: true,
		validation: "error",
		preflight: true,
	}
}
