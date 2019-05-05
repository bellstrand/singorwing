export function enumToKeyArray<T extends string>(e: any) {
	return Object.keys(e).filter((key) => typeof e[key] === "number") as T[]
}
