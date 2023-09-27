import { CreateUser } from "../interfaces/create-user"
import prisma from "../lib/prisma"

const create = async (data: CreateUser) => {
  const createdUser = await prisma.user.create({ data })
  return createdUser
}

export const UserService = {
  create,
}
