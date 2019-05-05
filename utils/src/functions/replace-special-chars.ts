export function replaceSpecialChars(str: string) {
	return str
		.toLowerCase()
		.replace(/[áàäâãå]/g, "a")
		.replace(/[óòöôõ]/g, "o")
		.replace(/[éèëê]/g, "e")
		.replace(/[úùüû]/g, "u")
		.replace(/[íìïî]/g, "i")
		.replace(/[^a-z0-9]/g, "-")
		.replace(/-+/g, "-")
}
