import { enumToKeyArray } from "utils"

export enum DecadeEnum {
	"1940s",
	"1950s",
	"1960s",
	"1970s",
	"1980s",
	"1990s",
	"2000s",
	"2010s",
}

export type Decade = keyof typeof DecadeEnum
export const Decades = [...enumToKeyArray<Decade>(DecadeEnum)]
