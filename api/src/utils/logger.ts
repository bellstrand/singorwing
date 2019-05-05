import { createLogger } from "bunyan"

export const bunyan = createLogger({ name: `${process.env.npm_package_name}:${process.env.npm_package_version}` })

export const logger = {
	/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
	trace: (ctxId: string, obj: Object, ...params: any[]) => bunyan.trace(`CtxId: ${ctxId},`, obj, ...params),
	debug: (ctxId: string, obj: Object, ...params: any[]) => bunyan.debug(`CtxId: ${ctxId},`, obj, ...params),
	info: (ctxId: string, obj: Object, ...params: any[]) => bunyan.info(`CtxId: ${ctxId},`, obj, ...params),
	warn: (ctxId: string, obj: Object, ...params: any[]) => bunyan.warn(`CtxId: ${ctxId},`, obj, ...params),
	error: (ctxId: string, obj: Object, ...params: any[]) => bunyan.error(`CtxId: ${ctxId},`, obj, ...params),
	fatal: (ctxId: string, obj: Object, ...params: any[]) => bunyan.fatal(`CtxId: ${ctxId},`, obj, ...params),
}
