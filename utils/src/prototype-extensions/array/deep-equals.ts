/* eslint-disable spaced-comment, @typescript-eslint/no-triple-slash-reference, no-extend-native, func-names, unicorn/no-array-instanceof, no-plusplus */
/// <reference path="./array.d.ts" />

export function arrayDeepEquals() {
	if (!Array.prototype.deepEquals) {
		Array.prototype.deepEquals = function(array) {
			if (!array || this.length !== array.length) {
				return false
			}
			for (let i = 0; i < this.length; i++) {
				if (this[i] instanceof Array && array[i] instanceof Array) {
					if (!this[i].equals(array[i])) {
						return false
					}
				} else if (this[i] !== array[i]) {
					return false
				}
			}
			return true
		}
	}

	Object.defineProperty(Array.prototype, "equals", { enumerable: false })
}
arrayDeepEquals()
