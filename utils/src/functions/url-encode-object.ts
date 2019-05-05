export function urlEncodeObject(obj: { [key: string]: string }) {
	return Object.keys(obj)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join("&")
}
