import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Request from "supertest"
import { artistRoutes } from "."
import { mockState } from "../../../setup-jest"
import { ArtistEntity, UserEntity } from "../../entities"

describe("Routes: Artist", () => {
	let app: Koa
	let user: UserEntity

	beforeEach(async () => {
		app = new Koa()
		app.use(bodyParser())
		user = await UserEntity.create({ email: "test" }).save()
		app.use(mockState({ user }))
		app.use(artistRoutes())
	})

	test("get artist", async () => {
		const artist = await ArtistEntity.create({
			name: "artist_name",
		}).save()
		const response = await Request(app.callback())
			.get(`/${artist.id}`)
			.send()

		expect(response.status).toEqual(200)
		expect(artist.id).toEqual(response.body.id)
		expect(artist.name).toEqual(response.body.name)
	})
})
