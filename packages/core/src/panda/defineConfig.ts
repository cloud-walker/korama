import {defineConfig as definePandaConfig} from "@pandacss/dev"

export function defineConfig(props: {include?: string[]} = {}) {
	return definePandaConfig({
		...props,
		preflight: true,
		shorthands: false,
		strictPropertyValues: true,
		strictTokens: true,
		validation: "error",
		outExtension: "js",
		importMap: {
			css: "@korama/core",
			jsx: "@korama/core",
			patterns: "@korama/core",
			recipes: "@korama/core",
		},
	})
}
