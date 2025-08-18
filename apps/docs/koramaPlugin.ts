import {createUnplugin} from "unplugin"

export const koramaPlugin = createUnplugin(function makeKoramaPlugin() {
	const cssCallRegex = /css\(\s*\{([^}]+)\}\s*\)/g
	return {
		name: "korama-plugin",
		transformInclude(id) {
			return id.endsWith(".ts") || id.endsWith(".tsx")
		},
		transform(code) {
			let match = cssCallRegex.exec(code)
			while (match !== null) {
				const cssProps = match[1].trim()
				const cssRule = cssProps
					.split(",")
					.map((p) => p.trim())
					.filter((p) => p)
					.map((p) => {
						const [key, value] = p.split(":").map((s) => s.trim())
						return {[key]: JSON.parse(value)}
					})
					.reduce((acc, val) => {
						// biome-ignore lint/performance/noAccumulatingSpread: we don't have alternatives
						return {...acc, ...val}
					}, {})
				console.log(cssRule)
				match = cssCallRegex.exec(code)
			}
			return code
		},
	}
})
