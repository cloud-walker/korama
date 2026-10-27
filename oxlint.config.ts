import {defineConfig} from "oxlint"

export default defineConfig({
	plugins: ["typescript", "react", "oxc"],
	categories: {
		correctness: "error",
	},
	rules: {
		"react/react-in-jsx-scope": "off",
	},
})
