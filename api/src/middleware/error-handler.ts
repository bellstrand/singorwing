import Router from "koa-router"

export const errorHandler = () => async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
	try {
		await next()
	} catch (error) {
		ctx.status = error.status || 500
		ctx.body = error.message
		ctx.app.emit("error", error, ctx)
	}
}
