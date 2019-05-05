import argon2 from "argon2"
import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Request from "supertest"
import { AuthToken } from "types"
import { v4 } from "uuid"
import { loginRoutes } from "."
import { UserEntity } from "../../entities"

describe("Routes => Login", () => {
	let koa: Koa

	beforeAll(async () => {
		koa = new Koa()
		koa.use(bodyParser())
		koa.use(loginRoutes())
	})

	test("should login user", async () => {
		const password = "SMP2VTNQS6KE6vsZHkAEh7BCwJGswTtK"
		const user = await UserEntity.create({ email: `${v4()}@example.com`, password: await argon2.hash(password) }).save()
		const response = await Request(koa.callback())
			.post("/")
			.send({ email: user.email, password })
		const authToken = response.body as AuthToken
		expect(authToken.userId).toEqual(user.id)
		expect(authToken.administrator).toEqual(false)
	})

	test("shold login administrator", async () => {
		const password = "rPudEc9ANsA6B388XUMVY7jy6JMuAzUp"
		const user = await UserEntity.create({ email: `${v4()}@example.com`, administrator: true, password: await argon2.hash(password) }).save()
		const response = await Request(koa.callback())
			.post("/")
			.send({ email: user.email, password })
		const authToken = response.body as AuthToken
		expect(authToken.userId).toEqual(user.id)
		expect(authToken.administrator).toEqual(true)
	})

	test("should fail login attempt", async () => {
		const user = await UserEntity.create({ email: `${v4()}@example.com`, administrator: true }).save()
		const response = await Request(koa.callback())
			.post("/")
			.send({ email: user.email, password: "wrong-password" })
		expect(response.status).toEqual(400)
	})

	test("should fail login attempt on non-existing user", async () => {
		const response = await Request(koa.callback())
			.post("/")
			.send({ username: `${v4()}@example.com`, password: "wrong-password" })
		expect(response.status).toEqual(400)
	})
})
