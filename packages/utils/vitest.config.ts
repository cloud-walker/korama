import {defineConfig} from "vitest/config"

export default defineConfig({
	test: {
		restoreMocks: true,
		coverage: {
			thresholds: {
				"100": true,
			},
		},
	},
})
