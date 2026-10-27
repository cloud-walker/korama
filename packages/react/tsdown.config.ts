import {defineConfig} from "tsdown"

export default defineConfig({
	entry: ["src/main.ts"],
	format: ["esm"],
	dts: true,
	publint: {strict: true, level: "error"},
	attw: {profile: "esm-only", level: "error"},
})
