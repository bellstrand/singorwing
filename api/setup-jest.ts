import { IRouterContext } from "koa-router"
import "reflect-metadata"
import { createConnection, getConnection } from "typeorm"
import { bunyan } from "./src/utils/logger"

beforeAll(async () => {
	bunyan.trace = () => true
	bunyan.debug = () => true
	bunyan.info = () => true
	bunyan.warn = () => true
	bunyan.error = () => true
	bunyan.fatal = () => true

	await createConnection({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: `password`,
		database: "unit-test",
		logging: false,
		cache: false,
		synchronize: true,
		entities: ["src/entities/index.ts"],
	})
})

beforeEach(async () => {
	/* const tables = ["user", "distortion", "duel-theme", "find-song", "intro", "song", "artist"]

	const conn = getConnection()

	const missingTables: string[] = conn.entityMetadatas.filter((meta) => !tables.includes(meta.tableName)).reduce((dbTables: string[], meta) => [...dbTables, meta.tableName], [])

	if (missingTables.length > 0) {
		throw new Error(`DB CLEANUP DOES NOT INCLUDE ALL TABLES, ADD "${missingTables.join(" & ")}" IN src/global.spec.ts`)
	} */
	/* eslint-disable no-restricted-syntax */
	// for (let i = 0; i < tables.length; i += 1) {
	/* eslint-disable no-await-in-loop */
	// await conn.query(`DELETE FROM "${tables[i]}"`)
	// }
})

afterAll(async () => {
	await getConnection().dropDatabase()
	await getConnection().close()
})

export function mockState(state: object) {
	return async (ctx: IRouterContext, next: () => Promise<any>) => {
		ctx.state = state
		await next()
	}
}

export const testErrorHandler = () => async (ctx: IRouterContext, next: () => Promise<any>) => {
	try {
		await next()
	} catch (error) {
		ctx.status = error.status || 500
		ctx.body = error.message
	}
}
