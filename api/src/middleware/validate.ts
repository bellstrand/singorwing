import Joi from "@hapi/joi"
import { IRouterContext } from "koa-router"
import { logger } from "../utils/logger"

export { Joi }

function validateObject(object: object = {}, label: string, schema?: Joi.SchemaLike, options?: Joi.ValidationOptions) {
	if (schema) {
		const { error } = Joi.validate(object, schema, options)
		if (error) {
			throw new Error(`Invalid ${label} - ${error.message}`)
		}
	}
}

interface ValidationObjType {
	body?: Joi.SchemaLike
	headers?: Joi.SchemaLike
	params?: Joi.SchemaLike
	query?: Joi.SchemaLike
}

export function validate(validationObj: ValidationObjType, options: Joi.ValidationOptions = {}) {
	return (ctx: IRouterContext, next: () => Promise<any>) => {
		try {
			validateObject(ctx.headers, "Headers", validationObj.headers, { ...options, allowUnknown: true })
			validateObject(ctx.params, "URL Parameters", validationObj.params, options)
			validateObject(ctx.query, "URL Query", validationObj.query, options)
			validateObject(ctx.request.body || undefined, "Request Body", validationObj.body, options)
			return next()
		} catch (error) {
			logger.warn("Validation Error:", {
				method: ctx.method,
				path: ctx.path,
				validationError: error.message,
			})
			ctx.throw(400, error.message)
			return Promise.resolve()
		}
	}
}

export function validateId() {
	return validate({ params: { id: Joi.string().uuid() } })
}
