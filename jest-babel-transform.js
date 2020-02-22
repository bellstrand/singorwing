/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const babelJest = require("babel-jest")

module.exports = babelJest.createTransformer({ rootMode: "upward" })
