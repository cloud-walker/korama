import {defineConfig as definePandaConfig} from "@pandacss/dev"

export function defineConfig() {
	return definePandaConfig({
		preflight: true,
		shorthands: false,
		strictPropertyValues: true,
		strictTokens: true,
		validation: "error",
		importMap: {
			css: "@korama/core",
			jsx: "@korama/core",
			patterns: "@korama/core",
			recipes: "@korama/core",
		},
	})
}
