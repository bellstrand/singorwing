import { IRouterContext } from "koa-router"
import sinon from "sinon"
import { v4 } from "uuid"
import { logger } from "../utils/logger"
import { timeElapsed } from "./time-elapsed"

describe("Middleware: TimeElapsed", () => {
	test("should call logger with method, path, status & timeElapsedMs", async () => {
		const clock = sinon.useFakeTimers()
		const ctx = ({ ctxId: v4(), method: "m", path: "p", status: 200, timeElapsedMs: 0 } as any) as IRouterContext
		const info = sinon
			.mock(logger)
			.expects("info")
			.withArgs(ctx.ctxId, `method: ${ctx.method}, path: ${ctx.path}, status: ${ctx.status}, timeElapsedMs: ${ctx.timeElapsedMs}`)
		await timeElapsed()(ctx, () => Promise.resolve(true))
		expect(info.calledOnce).toEqual(true)
		info.reset()
		clock.restore()
	})
})
