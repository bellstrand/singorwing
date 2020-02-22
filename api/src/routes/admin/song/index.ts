import Router from "koa-router"
import { Song } from "types"
import { SongEntity } from "../../../entities"
import { Joi, validate } from "../../../middleware/validate"
import { KoaAuthContext } from "../../../utils/koa"

export function songRoutes() {
	const router = new Router()

	router.get("/", async (ctx: KoaAuthContext<Song[]>) => {
		ctx.body = await SongEntity.createQueryBuilder("song")
			.orderBy("name")
			.getMany()
	})

	router.get("/:id", async (ctx: KoaAuthContext<Song>) => {
		ctx.body = await SongEntity.findOne(ctx.params.id)
	})

	router.post(
		"",
		validate({
			body: {
				artistId: Joi.string()
					.uuid()
					.required(),
				name: Joi.string().required(),
				difficulty: Joi.number().optional(),
				album: Joi.string().optional(),
				released: Joi.number().optional(),
				lyrics: Joi.string().optional(),
			},
		}),
		async (ctx: KoaAuthContext<Song>) => {
			const body = ctx.request.body as Partial<Song>
			ctx.body = await SongEntity.create(body).save()
		},
	)

	router.put("/:id", async (ctx: KoaAuthContext<Song>) => {
		const body = ctx.request.body as Partial<Song>
		const song = await SongEntity.findOneOrFail(ctx.params.id)
		await SongEntity.merge(song, body)
		ctx.body = song
	})

	router.delete("/:id", async (ctx: KoaAuthContext) => {
		const song = await SongEntity.findOneOrFail(ctx.params.id)
		await song.remove()
		ctx.status = 203
	})

	return router.routes()
}
