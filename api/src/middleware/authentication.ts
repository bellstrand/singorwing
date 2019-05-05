import jwt from "jsonwebtoken"
import { IRouterContext } from "koa-router"
import { AuthToken, PartialExcept } from "types"
import { Config } from "../config"

type Context = PartialExcept<IRouterContext, "state" | "status" | "request">

export interface AuthContext extends IRouterContext {
	state: AuthToken
}

export async function authUser(ctx: Context, next: () => Promise<void>): Promise<void> {
	return authenticate(false, ctx, next)
}

export function authAdmin(ctx: Context, next: () => Promise<void>): Promise<void> {
	return authenticate(true, ctx, next)
}

async function authenticate(administrator: boolean, ctx: Context, next: () => Promise<void>): Promise<void> {
	const token = ctx.request.headers.authentication
	if (token) {
		const authToken: Partial<AuthToken> = jwt.verify(token, Config.jwtsecret) as Partial<AuthToken>
		if (authToken.userId && (!administrator || authToken.administrator)) {
			ctx.state = authToken
			await next()
		} else {
			ctx.status = 403
		}
	} else {
		ctx.status = 401
	}
}
