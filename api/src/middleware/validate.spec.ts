import { IRouterContext } from "koa-router"
import sinon from "sinon"
import { Joi, validate } from "./validate"

describe("Middleware: Validate", () => {
	test("should pass validation", async () => {
		const next = sinon.spy()
		validate({
			body: {
				test: Joi.string().required(),
			},
		})(({ request: { body: { test: "asdf" } } } as any) as IRouterContext, next)
		expect(next.calledOnce).toEqual(true)
	})

	test("should fail validation", async () => {
		const next = sinon.spy()
		const throwSpy = sinon.spy()
		validate({
			body: {
				test: Joi.string().required(),
			},
		})(({ request: { body: { test: 1 } }, throw: throwSpy } as any) as IRouterContext, next)
		expect(next.notCalled).toEqual(true)
		expect(throwSpy.calledWith(400)).toEqual(true)
	})

	test("should fail validation no body", async () => {
		const next = sinon.spy()
		const throwSpy = sinon.spy()
		validate({
			body: {
				test: Joi.string().required(),
			},
		})(({ throw: throwSpy } as any) as IRouterContext, next)
		expect(next.notCalled).toEqual(true)
		expect(throwSpy.calledWith(400)).toEqual(true)
	})
})
