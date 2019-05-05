import Router from "koa-router"
import { IntroEntity } from "../entities"
import { KoaAuthContext } from "../utils/koa"

export function introRoutes() {
	const router = new Router()

	router.post("/current", async (ctx: KoaAuthContext) => {
		const intro = await IntroEntity.findOne()
	})

	router.post("/next", async (ctx: KoaAuthContext) => {})

	router.post("/previous", async (ctx: KoaAuthContext) => {})

	router.post("/reveal", async (ctx: KoaAuthContext) => {})

	router.post("/reset", async (ctx: KoaAuthContext) => {})

	return router.routes()
}
