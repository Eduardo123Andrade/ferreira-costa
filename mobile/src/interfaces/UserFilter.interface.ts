import { UserStatus } from "types"

export interface UserFilter {
  name?: string
  cpf?: string
  status: UserStatus
  login?: string
  createdAt?: string
  updatedAt?: string
  limit?: number
  offset?: number
  biggerThan?: number
  lessThan?: number
}
