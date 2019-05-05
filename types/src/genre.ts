import { enumToKeyArray } from "utils"

export enum GenreEnum {
	"anime",
	"blues/jazz",
	"comedy",
	"country",
	"dance",
	"disney",
	"folk",
	"hard rock",
	"hip-hop/rap",
	"metal",
	"pop",
	"punk",
	"reggae",
	"rock",
	"world",
}

export type Genre = keyof typeof GenreEnum
export const Genres = [...enumToKeyArray<Genre>(GenreEnum)]
