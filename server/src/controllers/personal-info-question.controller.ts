import { FastifyReply, FastifyRequest } from "fastify"
import { PersonalInfoQuestionService } from "../services"
import { personalInfoQuestionView } from "../views"
import httpStatus from "http-status"
import { validatePersonalInfoAnswerSchemaBody } from "../validations"

const listAll = async (_: FastifyRequest, reply: FastifyReply) => {
  const list = await PersonalInfoQuestionService.getAll()
  const personalInfoQuestionList = list.map(personalInfoQuestionView)

  return reply.status(httpStatus.OK).send(personalInfoQuestionList)
}

const validateQuestion = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = validatePersonalInfoAnswerSchemaBody(request.body)

  const code = await PersonalInfoQuestionService.validateQuestion(body)

  return reply.status(httpStatus.OK).send({ code })
}

export const PersonalInfoQuestionController = {
  listAll,
  validateQuestion,
}
