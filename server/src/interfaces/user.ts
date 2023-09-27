import { UserStatus } from "../types"

export interface User {
  id: string
  name: string
  login: string
  password: string
  email: string
  phone: string
  cpf: string
  birthdate: Date
  motherName: string
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}
