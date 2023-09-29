import { FastifyReply, FastifyRequest } from "fastify"
import { validateCodeValidationSchemaBody } from "../validations"
import { CodeValidationService } from "../services"
import httpStatus from "http-status"

const validate = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateCodeValidationSchemaBody(request.params)

  await CodeValidationService.validate(data)

  return reply.status(httpStatus.OK).send()
}

export const CodeValidationController = { validate }
