import { FastifyReply, FastifyRequest } from "fastify"
import { validateLoginSchemaBody } from "../validations"
import { AuthenticationService } from "../services"
import httpStatus from "http-status"

const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateLoginSchemaBody(request.body)

  await AuthenticationService.login(data)

  return reply.status(httpStatus.OK).send()
}

export const AuthenticationController = {
  login,
}
