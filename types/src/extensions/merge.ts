import { Omit } from "./omit"

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
