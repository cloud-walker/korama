import react from "@vitejs/plugin-react"
import {defineConfig} from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		restoreMocks: true,
		browser: {
			enabled: true,
			provider: "playwright",
			// https://vitest.dev/guide/browser/playwright
			instances: [{browser: "chromium", context: {colorScheme: "dark"}}],
		},
	},
})
