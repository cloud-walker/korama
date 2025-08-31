import {defineConfig as definePandaConfig} from "@pandacss/dev"

export type KoramaConfig = {include?: string[]}

export function defineConfig(props: KoramaConfig = {}) {
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
