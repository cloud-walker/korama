import react from "@vitejs/plugin-react"
import {playwright} from "@vitest/browser-playwright"
import {defineConfig} from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		restoreMocks: true,
		browser: {
			enabled: true,
			provider: playwright({
				contextOptions: {colorScheme: "dark"},
				// GitHub-hosted runners ship Google Chrome, so CI skips `playwright install`.
				launchOptions: process.env.CI ? {channel: "chrome"} : {},
			}),
			// https://vitest.dev/guide/browser/playwright
			instances: [{browser: "chromium"}],
		},
	},
})
