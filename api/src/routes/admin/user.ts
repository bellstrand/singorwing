import Router from "koa-router"
import { AuthToken, User } from "types"
import { UserEntity } from "../../entities"
import { validateId } from "../../middleware/validate"
import { KoaContext } from "../../utils/koa"

export function userRoutes() {
	const router = new Router()

	router.get("/", async (ctx: KoaContext<AuthToken, User[]>) => {
		ctx.body = await UserEntity.find()
	})

	router.get("/:id", validateId(), async (ctx: KoaContext<AuthToken, User, { id: string }>) => {
		ctx.body = await UserEntity.findOne(ctx.params.id)
	})

	router.post("/", async (ctx: KoaContext<AuthToken, User>) => {
		const body = ctx.request.body as Partial<User>
		const user = await UserEntity.create(body).save()
		await user.reload()
		ctx.body = user
	})

	router.put("/:id", validateId(), async (ctx: KoaContext<AuthToken, User, { id: string }>) => {
		const body = ctx.request.body as Partial<User>
		const user = await UserEntity.findOneOrFail(ctx.params.id)
		await UserEntity.merge(user, body)
		ctx.body = user
	})

	router.delete("/:id", validateId(), async (ctx: KoaContext<AuthToken, User, { id: string }>) => {
		const user = await UserEntity.findOneOrFail(ctx.params.id)
		await user.remove()
		ctx.status = 203
	})

	return router.routes()
}
