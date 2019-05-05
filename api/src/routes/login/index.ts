import argon2 from "argon2"
import jsonwebtoken from "jsonwebtoken"
import Router from "koa-router"
import { AuthToken } from "types"
import { Config } from "../../config"
import { UserEntity } from "../../entities"
import { Joi, validate } from "../../middleware/validate"
import { KoaContext } from "../../utils/koa"

export function loginRoutes() {
	const router = new Router()

	router.post(
		"/",
		validate({
			body: {
				email: Joi.string()
					.email()
					.required(),
				password: Joi.string().required(),
			},
		}),
		async (ctx: KoaContext<undefined, AuthToken & { token: string }>) => {
			const { email, password } = ctx.request.body as { [key: string]: string }
			const user = await UserEntity.findOne({
				select: ["id", "email", "password", "administrator"],
				where: { email },
			})
			if (user && user.password && (await argon2.verify(user.password, password))) {
				ctx.status = 201
				const authToken: AuthToken = { userId: user.id, administrator: user.administrator }
				const token = jsonwebtoken.sign(authToken, Config.jwtsecret, { expiresIn: 86400 })

				ctx.body = { ...authToken, token }
			} else {
				ctx.status = 400
			}
		},
	)

	return router.routes()
}
