import { User } from "@prisma/client"

export const userView = (data: User) => {
  const { password, createdAt, updatedAt, ...rest } = data

  return rest
}
