import Router from "koa-router"
import { artistRoutes } from "./artist"
import { distortionRoutes } from "./distortion"
import { songRoutes } from "./song"
import { userRoutes } from "./user"

export function adminRoutes() {
	const router = new Router()

	router.use("/artist", artistRoutes())
	router.use("/distortion", distortionRoutes())
	router.use("/song", songRoutes())
	router.use("/user", userRoutes())

	return router.routes()
}
