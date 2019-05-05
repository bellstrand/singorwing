import Router from "koa-router"
import { authAdmin, authUser } from "../middleware/authentication"
import { adminRoutes } from "./admin"
import { introRoutes } from "./intro"
import { spotifyRoutes } from "./spotify"

export function routes() {
	const router = new Router({ prefix: "/api" })

	router.use("/intro", authUser, introRoutes())
	router.use("/spotify", authUser, spotifyRoutes())

	router.use("/admin", authAdmin, adminRoutes())

	return router.routes()
}
