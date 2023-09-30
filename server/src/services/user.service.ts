import { encoder } from "./../utils/encoder"
import { NotFoundError } from "../error/NotFoundError"
import { CreateUser, UpdateUser, UserFilter } from "../interfaces/"
import prisma from "../lib/prisma"

const find = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } })

  if (!user) throw new NotFoundError("User not found")

  return user
}

const create = async (data: CreateUser) => {
  const { password: planingPassword } = data

  const password = await encoder.codify(planingPassword)

  const createdUser = await prisma.user.create({ data: { ...data, password } })

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

const filterByDate = (field: string, date?: string): Object[] => {
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

const filterByAge = (biggerThen = 0, lessThan = 0) => {
  if (!biggerThen && !lessThan) return []

  const today = new Date()
  const firstAge = new Date(today)
  firstAge.setFullYear(today.getFullYear() - biggerThen)

  const secondAge = new Date(today)
  secondAge.setFullYear(today.getFullYear() - lessThan)

  return [
    lessThan && {
      birthdate: {
        gte: secondAge.toISOString(),
      },
    },
    {
      birthdate: {
        lte: firstAge.toISOString(),
      },
    },
  ]
}

const get = async (query: UserFilter) => {
  const {
    name,
    cpf,
    status,
    login,
    createdAt,
    updatedAt,
    limit,
    offset = 0,
    biggerThen = 0,
    lessThan,
  } = query

  const where: any = {
    AND: [
      name && { name: { contains: name.replace(/"/g, "") } },
      login && { login: { contains: login.replace(/"/g, "") } },
      cpf && { cpf: { equals: cpf.replace(/"/g, "") } },
      status && { status: { equals: status.replace(/"/g, "") } },
      ...filterByDate("createdAt", createdAt),
      ...filterByDate("updatedAt", updatedAt),
      ...filterByAge(biggerThen, lessThan),
    ],
  }

  const count = await prisma.user.count({ where })

  const users = await prisma.user.findMany({
    where,
    skip: Number(offset ?? 0),
    take: limit && Number(limit),
    orderBy: { createdAt: "asc" },
  })

  return { count, users }
}

export const UserService = {
  create,
  disable,
  get,
  update,
}
