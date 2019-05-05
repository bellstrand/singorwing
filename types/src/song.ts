import { Artist } from "./artist"
import { Distortion } from "./distortion"
import { FindSong } from "./find-song"
import { Intro } from "./intro"

export interface Song {
	id: string
	artistId: string
	artist?: Artist

	name: string
	difficulty: number
	album: string
	released: number
	lyrics: string

	distortions?: Distortion[]
	intros?: Intro[]
	findSongs?: FindSong[]
}
