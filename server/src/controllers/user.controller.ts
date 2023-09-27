import { FastifyReply, FastifyRequest } from "fastify"
import { UserService } from "../services/user.service"
import httpStatus from "http-status"
import { validateCreateUserSchemaBody } from "../validations"

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

export const UserController = {
  create,
  disable,
}
