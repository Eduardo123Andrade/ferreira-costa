import { UserStatus } from "types"

export interface User {
  id: string
  name: string
  email: string
  login: string
  phone: string
  cpf: string
  birthdate: Date
  motherName: string
  status: UserStatus
  selected?: boolean
}
