import { SeedRandom } from "./seed-random"

describe("Utils: SeedRandom", () => {
	it("should seed same number every time", async () => {
		const initValue = Math.floor(Math.random() * 10000)
		const seed1 = new SeedRandom(initValue)
		const seed2 = new SeedRandom(initValue)
		for (let i = 0; i < 100; i += 1) {
			expect(seed1.random()).toEqual(seed2.random())
		}
	})

	it("should seed numbers between 0-1", async () => {
		const seed = new SeedRandom(Math.floor(Math.random() * 10000))
		for (let i = 0; i < 100; i += 1) {
			const value = seed.random()
			expect(value).toBeLessThanOrEqual(1)
			expect(value).toBeGreaterThanOrEqual(0)
		}
	})

	it("should random array with seeded numbers", async () => {
		const array = [1, 2, 3, 4, 5]
		for (let i = 0; i < 100; i += 1) {
			const initValue = Math.floor(Math.random() * 10000)
			const seed1 = new SeedRandom(initValue)
			const seed2 = new SeedRandom(initValue)
			expect(seed1.shuffle(array)).toEqual(seed2.shuffle(array))
		}
	})
})
