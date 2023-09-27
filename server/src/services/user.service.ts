import { NotFoundError } from "../error/NotFoundError"
import { CreateUser } from "../interfaces/create-user"
import prisma from "../lib/prisma"

const find = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } })

  if (!user) throw new NotFoundError("User not found")

  return user
}

const create = async (data: CreateUser) => {
  const createdUser = await prisma.user.create({ data })
  return createdUser
}

const disable = async (id: string) => {
  await find(id)

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      status: "INACTIVE",
    },
  })

  return updatedUser
}

export const UserService = {
  create,
  disable,
}
