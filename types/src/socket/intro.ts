import { Intro } from "../intro"

export interface IntroData {
	intro: Intro
	state: "play" | "reveal"
}
