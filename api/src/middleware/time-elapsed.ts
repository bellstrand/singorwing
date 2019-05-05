import Router from "koa-router"
import { logger } from "../utils/logger"

export const timeElapsed = () => async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
	const time = Date.now()
	await next()
	logger.info(ctx.ctxId, `method: ${ctx.method}, path: ${ctx.path}, status: ${ctx.status}, timeElapsedMs: ${Date.now() - time}`)
}
