import { FastifyReply, FastifyRequest } from "fastify"
import { UserService } from "../services/user.service"
import httpStatus from "http-status"
import {
  validateCreateUserSchemaBody,
  validateUpdateUserSchemaBody,
  validateDisableUserSchemaBody,
} from "../validations"
import { userView } from "../views"

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateCreateUserSchemaBody(request.body)

  const userResponse = await UserService.create(data)
  const user = userView(userResponse)

  return reply.status(httpStatus.CREATED).send(user)
}

const disable = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userIds } = validateDisableUserSchemaBody(request.body)

  await UserService.disable(userIds)

  return reply.status(httpStatus.OK).send()
}

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as any
  const data = validateUpdateUserSchemaBody(request.body)
  console.log(data, userId)
  const user = await UserService.update(userId, data)

  return reply.status(httpStatus.OK).send(user)
}

const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request.query as any
  const { count, users: userList } = await UserService.get(query)

  const users = userList.map(userView)

  return reply.status(httpStatus.OK).send({ count, users })
}

export const UserController = {
  create,
  disable,
  get,
  update,
}
