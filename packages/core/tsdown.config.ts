import {defineConfig} from "tsdown"

export default defineConfig({
	entry: {main: "src/main.ts", panda: "panda/main.ts"},
	format: ["esm"],
	dts: true,
})
