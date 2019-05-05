import { Decade } from "./decade"
import { Genre } from "./genre"
import { Language } from "./language"
import { Song } from "./song"

export interface Artist {
	id: string
	name: string
	difficulty: number
	genre: Genre
	decade: Decade
	image?: string
	language: Language
	members: string
	biography: string

	songs?: Song[]
}
