import {reactRouter} from "@react-router/dev/vite"
import {defineConfig} from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import {koramaPlugin} from "./koramaPlugin"

const foo = koramaPlugin.vite()
console.log(foo)

export default defineConfig({
	plugins: [foo, reactRouter(), tsconfigPaths()],
})
