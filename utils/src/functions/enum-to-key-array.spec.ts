import { enumToKeyArray } from "./enum-to-key-array"

describe("Utils: EnumToKeyArray", () => {
	test("should transform enum to array", async () => {
		enum ActionTypeEnum {
			"Test",
			"Test2",
		}

		const enumTypes = enumToKeyArray(ActionTypeEnum)
		expect(enumTypes).toEqual(["Test", "Test2"])
	})
})
