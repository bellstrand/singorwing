export class SeedRandom {
	seed: number

	constructor(seed: number) {
		this.seed = seed
	}

	random() {
		const x = Math.sin((this.seed += 1)) * 10000
		return x - Math.floor(x)
	}

	shuffle(array: any[]) {
		for (let j: number, i: number = array.length - 1; i > 0; i -= 1) {
			j = Math.floor(this.random() * (i + 1))
			/* eslint-disable no-param-reassign */
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}
}
