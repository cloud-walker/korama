import {
	defineConfig as defineCoreConfig,
	type KoramaConfig,
} from "@korama/core/config"

export function defineConfig(config: KoramaConfig) {
	return defineCoreConfig({
		...config,
		include: [
			"node_modules/@korama/react/dist/panda.buildinfo.json",
			...(config.include ?? []),
		],
	})
}
