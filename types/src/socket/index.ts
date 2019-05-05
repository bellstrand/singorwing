import { DistortionData } from "./distortion"
import { DuelData } from "./duel"
import { FindSongData } from "./find-song"
import { IntroData } from "./intro"

export type SocketDataType = "intro" | "distortion" | "find-song" | "duel"

// prettier-ignore
export interface SocketData<T extends SocketDataType> {
	type: T
	data: T extends "intro" ? IntroData
		: T extends "distortion" ? DistortionData
		: T extends "find-song" ? FindSongData
		: T extends "duel" ? DuelData
		: undefined
}
