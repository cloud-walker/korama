import {defineConfig} from "tsup"

export default defineConfig({
	entry: {
		main: "./src/main.ts",
		panda: "./src/panda/main.ts",
	},
	format: ["esm"],
	dts: true,
})
