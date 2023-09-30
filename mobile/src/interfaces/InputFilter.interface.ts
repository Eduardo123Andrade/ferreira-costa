import { UserFilter } from "./UserFilter.interface"

export interface InputFilter extends Omit<UserFilter, "limit" | "offset"> {}
