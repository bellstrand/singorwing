import Router from "koa-router"
import { Distortion } from "types"
import { DistortionEntity } from "../../../entities"
import { Joi, validate } from "../../../middleware/validate"
import { KoaAuthContext } from "../../../utils/koa"

export function distortionRoutes() {
	const router = new Router()

	router.get("/", async (ctx: KoaAuthContext<Distortion[]>) => {
		ctx.body = await DistortionEntity.createQueryBuilder("distortion")
			.orderBy("name")
			.getMany()
	})

	router.get("/:id", async (ctx: KoaAuthContext<Distortion>) => {
		ctx.body = await DistortionEntity.findOne(ctx.params.id)
	})

	router.post(
		"",
		validate({
			body: {
				songId: Joi.string()
					.uuid()
					.required(),
				difficulty: Joi.number().required(),
				distortion: Joi.string().required(),
			},
		}),
		async (ctx: KoaAuthContext<Distortion>) => {
			const body = ctx.request.body as Pick<Distortion, "songId" | "difficulty" | "distortion">
			ctx.body = await DistortionEntity.create(body).save()
		},
	)

	router.put("/:id", async (ctx: KoaAuthContext<Distortion>) => {
		const body = ctx.request.body as Partial<Distortion>
		const distortion = await DistortionEntity.findOneOrFail(ctx.params.id)
		await DistortionEntity.merge(distortion, body)
		ctx.body = distortion
	})

	router.delete("/:id", async (ctx: KoaAuthContext) => {
		const distortion = await DistortionEntity.findOneOrFail(ctx.params.id)
		await distortion.remove()
		ctx.status = 203
	})

	return router.routes()
}
