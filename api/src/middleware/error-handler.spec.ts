import sinon from "sinon"
import { errorHandler } from "./error-handler"

describe("Middleware: ErrorHandler", () => {
	test("should pass through without error", async () => {
		const next = sinon.spy()
		await errorHandler()(null as any, next)
		expect(next.calledOnce).toEqual(true)
	})

	test("should pass through without error2", async () => {
		const ctx: any = { app: { emit: sinon.spy() } }
		const next = () => {
			throw new Error("42")
		}
		await errorHandler()(ctx, next)
		expect(ctx.status).toEqual(500)
		expect(ctx.body).toEqual("42")
		expect(ctx.app.emit.calledOnce).toEqual(true)
	})
})
