import { IRouterContext } from "koa-router"
import { AuthToken } from "types"
import { SpotifyTokenEntity } from "../entities/spotify-token"

export interface SpotifyAuthContext extends IRouterContext {
	state: AuthToken & { spotifyToken: string }
}

export const spotifyToken = () => async (ctx: SpotifyAuthContext, next: () => Promise<any>) => {
	const token = await SpotifyTokenEntity.findOne(ctx.state.userId, { order: { createdAt: "ASC" } })
	if (token) {
		// check if token has run out
		// refresh token
		// return new token
		ctx.state.spotifyToken = token.access_token

		await next()
	} else {
		ctx.status = 403
	}
}
