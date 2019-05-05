import { RouterContext } from "koa-router"
import { AuthToken } from "types"

export interface KoaContext<State = any, Body = any, Params = any, Query = any> extends RouterContext<State> {
	body: Body | undefined
	params: Params
	query: Query
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface KoaAuthContext<Body = any, Params = any, Query = any> extends KoaContext<AuthToken, Body, Params, Query> {}

export interface KoaPaginateQuery {
	min: number
	max: number
}
