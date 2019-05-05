import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Request from "supertest"
import { User } from "types"
import { v4 } from "uuid"
import { UserEntity } from "../entities"
import { userRoutes } from "./user"

describe("Routes => User", () => {
	let koa: Koa

	beforeAll(async () => {
		koa = new Koa()
		koa.use(bodyParser())
		koa.use(userRoutes())
	})

	test("should get a list of users", async () => {
		await Promise.all([UserEntity.create({ email: `${v4()}@example.com` }).save(), UserEntity.create({ email: `${v4()}@example.com` }).save()])
		const response = await Request(koa.callback())
			.get("/")
			.send()
		const responseUsers = response.body as User[]
		expect(responseUsers.length).toBeGreaterThanOrEqual(2)
		expect(responseUsers[0].password).toBeUndefined()
	})

	test("should get a user by id", async () => {
		const user = await UserEntity.create({ email: `${v4()}@example.com` }).save()
		const response = await Request(koa.callback())
			.get(`/${user.id}`)
			.send()
		const responseUser = response.body as User
		expect(responseUser.id).toEqual(user.id)
		expect(responseUser.password).toBeUndefined()
	})

	test("should create user", async () => {
		const user: Partial<User> = { name: "test", email: `${v4()}@example.com` }
		const response = await Request(koa.callback())
			.post("/")
			.send(user)
		const responseUser = response.body as User
		expect(responseUser.email).toEqual(user.email)
		expect(responseUser.name).toEqual(user.name)
		expect(responseUser.id).toBeDefined()
		expect(responseUser.password).toBeUndefined()
		const newUser = (await UserEntity.findOne(responseUser.id)) as UserEntity
		expect(newUser.id).toEqual(responseUser.id)
		expect(newUser.administrator).toBeFalsy()
		expect(newUser.email).toEqual(responseUser.email)
	})

	test("should update a user", async () => {
		const user = await UserEntity.create({ email: `${v4()}@example.com` }).save()
		const response = await Request(koa.callback())
			.put(`/${user.id}`)
			.send({ name: "test-name" })
		const responseUser = response.body as User
		expect(responseUser.id).toEqual(user.id)
		expect(responseUser.name).toEqual("test-name")
	})

	test("should remove a user", async () => {
		const user = await UserEntity.create({ email: `${v4()}@example.com` }).save()
		const response = await Request(koa.callback())
			.delete(`/${user.id}`)
			.send()
		expect(response.status).toEqual(203)
		const removedUser = await UserEntity.findOne(user.id)
		expect(removedUser).toBeUndefined()
	})
})
