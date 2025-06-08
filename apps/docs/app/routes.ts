import {type RouteConfig, index, route} from "@react-router/dev/routes"

export default [
	index("routes/home.tsx"),
	route("box", "routes/box-module.tsx"),
] satisfies RouteConfig
