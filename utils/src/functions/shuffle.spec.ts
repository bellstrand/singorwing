import { SeedRandom } from "./seed-random"
import { shuffle } from "./shuffle"

describe("Utils: Function => Shuffle", () => {
	it("should shuffle array", () => {
		const array = [1, 2, 3, 4, 5, 6, 7]
		const result = shuffle(array, new SeedRandom(1))
		expect(result).toEqual([1, 7, 3, 4, 2, 6, 5])
	})
})
