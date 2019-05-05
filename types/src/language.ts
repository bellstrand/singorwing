import { enumToKeyArray } from "utils"

export enum LanguageEnum {
	"sv",
	"en",
}

export type Language = keyof typeof LanguageEnum
export const Languages: Language[] = [...enumToKeyArray<Language>(LanguageEnum)]
