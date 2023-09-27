import { FastifyReply, FastifyRequest } from "fastify"
import { UserService } from "../services/user.service"
import httpStatus from "http-status"

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = request.body as any

  const user = await UserService.create(data)

  return reply.status(httpStatus.CREATED).send(user)
}

export const UserController = {
  create,
}
