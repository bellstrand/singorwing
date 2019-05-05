import fs from "fs-extra"
import Router from "koa-router"
import { Artist } from "types"
import { Config } from "../../../config"
import { ArtistEntity } from "../../../entities"
import { Joi, validate } from "../../../middleware/validate"
import { KoaAuthContext } from "../../../utils/koa"

export function artistRoutes() {
	const router = new Router()

	router.get("/", async (ctx: KoaAuthContext<Artist[]>) => {
		ctx.body = await ArtistEntity.createQueryBuilder("artist")
			.orderBy("name")
			.getMany()
	})

	router.get("/:id", async (ctx: KoaAuthContext<Artist>) => {
		ctx.body = await ArtistEntity.findOne(ctx.params.id)
	})

	router.post("", async (ctx: KoaAuthContext<Artist>) => {
		const body = ctx.request.body as Partial<Artist>
		ctx.body = await ArtistEntity.create(body).save()
	})

	router.post(
		"/:id/image",
		validate({
			body: {
				name: Joi.string().required(),
				base64Image: Joi.string()
					.base64()
					.required(),
			},
		}),
		async (ctx: KoaAuthContext) => {
			const body = ctx.request.body as { base64Image: string; name: string }
			const artist = await ArtistEntity.findOneOrFail(ctx.params.id)

			const matches = body.base64Image.match(/^data:image\/([A-Za-z]+);base64,(.+)$/) as string[]
			const filename = `${replaceSpecialChars(body.name)}-${Date.now()}.${matches[1]}`
			if (artist.image) {
				await removeFile(artist.image)
			}
			await saveImage(`artists/${filename}`, matches[2])
			artist.image = `artists/${filename}`
			await artist.save()
		},
	)

	router.put("/:id", async (ctx: KoaAuthContext<Artist>) => {
		const body = ctx.request.body as Partial<Artist>
		const artist = await ArtistEntity.findOneOrFail(ctx.params.id)
		await ArtistEntity.merge(artist, body)
		ctx.body = artist
	})

	router.delete("/:id", async (ctx: KoaAuthContext) => {
		const artist = await ArtistEntity.findOneOrFail(ctx.params.id)
		await artist.remove()
		ctx.status = 203
	})

	return router.routes()
}

function saveImage(filename: string, data: string) {
	return fs.outputFile(`${Config.storage}/${filename}`, data, "base64")
}

function removeFile(url: string) {
	return fs.remove(`${Config.storage}/${url}`)
}

function replaceSpecialChars(string: string) {
	return string
		.toLowerCase()
		.replace(/[áàäâãå]/g, "a")
		.replace(/[óòöôõ]/g, "o")
		.replace(/[éèëê]/g, "e")
		.replace(/[úùüû]/g, "u")
		.replace(/[íìïî]/g, "i")
		.replace(/[^a-z0-9]/g, "-")
		.replace(/-+/g, "-")
}
