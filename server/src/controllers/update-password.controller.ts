import { FastifyReply, FastifyRequest } from "fastify"
import { validateUpdatePasswordSchemaBody } from "../validations"
import { UpdatePasswordService } from "../services"
import httpStatus from "http-status"

const update = async (request: FastifyRequest, replay: FastifyReply) => {
  const data = validateUpdatePasswordSchemaBody(request.body)

  await UpdatePasswordService.update(data)

  return replay.status(httpStatus.OK).send()
}

export const UpdatePasswordController = {
  update,
}
