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

interface Test {
  name: string
}

const filterByDate = (field: string, date: string): Object[] => {
  if (!date) return []
  return [
    {
      [field]: {
        gte: new Date(date), // Data de início do dia
      },
    },
    {
      [field]: {
        lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    },
  ]
}

const get = async (query: any) => {
  const {
    name,
    cpf,
    status,
    login,
    createdAt,
    updatedAt,
    limit,
    offset = 0,
  } = query
  console.log(new Date(query.createdAt))
  console.log(...filterByDate("updatedAt", updatedAt))
  const users = await prisma.user.findMany({
    where: {
      AND: [
        name && { name: { contains: name.replace(/"/g, "") } },
        login && { login: { contains: login.replace(/"/g, "") } },
        cpf && { cpf: { equals: cpf.replace(/"/g, "") } },
        status && { status: { equals: status.replace(/"/g, "") } },
        ...filterByDate("createdAt", createdAt),
        ...filterByDate("updatedAt", updatedAt),
      ],
    },
    skip: Number(offset),
    take: Number(limit),
  })

  return users
}

export const UserService = {
  create,
  disable,
  get,
  update,
}
