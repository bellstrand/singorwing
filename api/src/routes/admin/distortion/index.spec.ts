import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Request from "supertest"
import { distortionRoutes } from "."
import { mockState } from "../../../../setup-jest"
import { ArtistEntity, DistortionEntity, SongEntity, UserEntity } from "../../../entities"

describe("Routes: Distortion", () => {
	let app: Koa
	let user: UserEntity

	beforeEach(async () => {
		app = new Koa()
		app.use(bodyParser())
		user = await UserEntity.create({ email: "test" }).save()
		app.use(mockState({ user }))
		app.use(distortionRoutes())
	})

	test("get distortion", async () => {
		const artist = await ArtistEntity.create({ name: "TEST_NAME" }).save()
		const song = await SongEntity.create({ artistId: artist.id, released: 1930, name: "A Name" }).save()
		const distortion = await DistortionEntity.create({
			difficulty: 3,
			distortion: "asdf",
			songId: song.id,
		}).save()

		const response = await Request(app.callback())
			.get(`/${distortion.id}`)
			.send()

		expect(response.status).toEqual(200)
		expect(distortion.id).toEqual(response.body.id)
		expect(distortion.songId).toEqual(response.body.songId)
	})
})
