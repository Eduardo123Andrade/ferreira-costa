import { FastifyReply, FastifyRequest } from "fastify"
import { UserService } from "../services/user.service"
import httpStatus from "http-status"
import {
  validateCreateUserSchemaBody,
  validateUpdateUserSchemaBody,
} from "../validations"

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateCreateUserSchemaBody(request.body)

  const user = await UserService.create(data)

  return reply.status(httpStatus.CREATED).send(user)
}

const disable = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as any

  await UserService.disable(userId)

  return reply.status(httpStatus.OK).send()
}

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as any
  const data = validateUpdateUserSchemaBody(request.body)
  const user = await UserService.update(userId, data)

  return reply.status(httpStatus.OK).send(user)
}

export const UserController = {
  create,
  disable,
  update,
}
