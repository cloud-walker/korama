import {defineConfig} from "oxfmt"

export default defineConfig({
	useTabs: true,
	tabWidth: 2,
	printWidth: 80,
	singleQuote: false,
	jsxSingleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
	semi: false,
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: false,
	sortImports: {},
	ignorePatterns: ["**/*.{md,json,jsonc,yaml,yml,css,html}"],
})
