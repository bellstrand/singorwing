import Axios from "axios"
import btoa from "btoa"
import Router from "koa-router"
import { urlEncodeObject } from "utils"
import { SpotifyAuthContext } from "../middleware/spotify-token"

const code =
	"AQDY5-4fDbHYByb2INhbEoO0JFnZcdfviKDJHDMavTRftjGxLxq99ozF_OmZWocNztWRMG9JHTcNRNfVp2fnTJIpH7NHjVsQTeIEgQArMcLegzDY-0pjoVaFbkhCJaG4ggFoUPpFV-KcE48F1czHZNHNTzZVbIqGj3pu8vaD4LsYvJGwSfJSahPn5R4cG6n6g5qacD_FPKbGvCOkMkigm69k0XrFl7k-XxH0dyVO7P22-DXvJivpYmitPkWrjtptot9xuu1EskG7F2ryU1NLnwhej25MYBrwFmkSybr9bKMq"
const redirectUri = "http://localhost:3000/"
const clientId = "dd7a6bf1da324794b739810592722887"
const clientSecret = "a2887e0b80964eccae11fc7e5df9fb54"

export function spotifyRoutes() {
	const router = new Router()

	router.post("/token/callback", async (ctx: SpotifyAuthContext) => {
		console.log(ctx.request.query)
		const body = { grant_type: "authorization_code", code, redirect_uri: redirectUri }
		const response = await Axios.post("https://accounts.spotify.com/api/token", urlEncodeObject(body), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
			},
		}).catch((error) => {
			console.error(error)
		})
		console.log(response)
	})

	return router.routes()
}
