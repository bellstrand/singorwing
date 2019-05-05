export type PartialExcept<T, U extends keyof T> = Pick<T, U> & Partial<Pick<T, Exclude<keyof T, U>>>
