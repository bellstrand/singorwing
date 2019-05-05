import { SeedRandom } from "./seed-random"

/* eslint-disable no-param-reassign */
export function shuffle<T>(array: T[], math: Math | SeedRandom = Math): T[] {
	let i = array.length
	let temp: T
	let index: number
	while (i > 0) {
		index = Math.floor(math.random() * i)
		i -= 1
		temp = array[i]
		array[i] = array[index]
		array[index] = temp
	}
	return array
}
