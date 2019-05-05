/* eslint-disable global-require, prefer-destructuring */
describe("utils/logger", () => {
	test("should create and return the same logger", async () => {
		const logger1 = require("./logger").logger
		const logger2 = require("./logger").logger
		expect(logger1).toEqual(logger2)
	})

	test("should log", async () => {
		const logger = require("./logger").logger
		logger.trace("trace", "trace")
		logger.debug("debug", "debug")
		logger.info("info", "info")
		logger.warn("warn", "warn")
		logger.error("error", "error")
		logger.fatal("fatal", "fatal")
	})
})

export type FUCKING_THING_I_HAVE_TO_EXPORT_TO_EXCLUDE_SHIT = "asd"
