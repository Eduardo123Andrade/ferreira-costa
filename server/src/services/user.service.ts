import { NotFoundError } from "../error/NotFoundError"
import { CreateUser } from "../interfaces/create-user"
import { UpdateUser } from "../interfaces/update-user"
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

const disable = async (usersIds: string[]) => {
  const { count } = await prisma.user.updateMany({
    where: {
      id: {
        in: usersIds,
      },
    },
    data: {
      status: "INACTIVE",
    },
  })

  if (!count) throw new NotFoundError("Users not found")

  return count
}

const update = async (id: string, data: UpdateUser) => {
  await find(id)

  const user = await prisma.user.update({
    where: { id },
    data,
  })

  return user
}

export const UserService = {
  create,
  disable,
  update,
}
