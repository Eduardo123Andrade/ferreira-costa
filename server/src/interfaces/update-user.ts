import { User } from "@prisma/client"

export interface UpdateUser
  extends Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "birthdate" | "password"
  > {
  birthdate: string
}
