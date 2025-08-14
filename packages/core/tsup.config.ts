import {defineConfig} from "tsup"

export default defineConfig({
	entry: {
		panda: "./src/panda/main.ts",
	},
	format: ["esm"],
	dts: true,
})
