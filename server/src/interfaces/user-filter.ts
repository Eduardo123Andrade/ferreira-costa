export interface UserFilter {
  name?: string
  cpf?: string
  status?: string
  login?: string
  createdAt?: string
  updatedAt?: string
  limit?: number
  offset?: number
  biggerThen?: number
  lessThan?: number
}
