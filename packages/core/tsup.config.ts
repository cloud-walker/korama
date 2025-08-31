import {defineConfig} from "tsup"

export default defineConfig({
	entry: {
		main: "./src/main.ts",
		panda: "./src/panda/main.ts",
	},
	ignoreWatch: ["./styled-system/**"],
	external: [/styled-system/],
	format: ["esm"],
	dts: true,
})
