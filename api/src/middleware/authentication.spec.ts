import jwt from "jsonwebtoken"
import sinon from "sinon"
import { AuthToken } from "types"
import { v4 } from "uuid"
import { Config } from "../config"
import { UserEntity } from "../entities"
import { authAdmin, authUser } from "./authentication"

describe("Middleware: Authentication", () => {
	test("should pass admin authentication", async () => {
		const next = sinon.spy()
		const authToken: AuthToken = { userId: v4(), administrator: true }
		const ctx: any = {
			request: { headers: { authentication: jwt.sign(authToken, Config.jwtsecret) } },
			state: {},
		}
		await authAdmin(ctx, next)
		expect(next.calledOnce).toEqual(true)
		expect(ctx.state.userId).toEqual(authToken.userId)
		expect(ctx.state.administrator).toEqual(true)
	})

	test("should pass user authentication", async () => {
		const next = sinon.spy()
		const authToken: AuthToken = { userId: v4(), administrator: false }
		const ctx: any = {
			request: { headers: { authentication: jwt.sign(authToken, Config.jwtsecret) } },
			state: {},
		}
		await authUser(ctx, next)
		expect(next.calledOnce).toEqual(true)
		expect(ctx.state.userId).toEqual(authToken.userId)
		expect(ctx.state.administrator).toEqual(false)
	})

	test("should generate 'invalid signature'(User, password)", async () => {
		const next = sinon.spy()
		const ctx: any = {
			request: { headers: { authentication: jwt.sign({ model: UserEntity.name }, "gwen-not-super-secret") } },
			state: {},
		}
		await authAdmin(ctx, next).catch((error) => {
			expect(error.name).toEqual("JsonWebTokenError")
			expect(error.message).toEqual(`invalid signature`)
		})
		expect(next.calledOnce).toEqual(false)
	})

	test("should generate 'TypeError'(User)", async () => {
		const next = sinon.spy()
		const ctx: any = { request: { headers: {} }, state: {} }
		await authAdmin(ctx, next).catch((error) => {
			expect(error.name).toEqual("TypeError")
		})
		expect(next.calledOnce).toEqual(false)
	})
})
