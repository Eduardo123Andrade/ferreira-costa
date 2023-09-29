import { FastifyReply, FastifyRequest } from "fastify"
import { PersonalInfoQuestionService } from "../services"
import { personalInfoQuestionView } from "../views"
import httpStatus from "http-status"

const listAll = async (_: FastifyRequest, reply: FastifyReply) => {
  const list = await PersonalInfoQuestionService.getAll()
  const personalInfoQuestionList = list.map(personalInfoQuestionView)

  return reply.status(httpStatus.OK).send(personalInfoQuestionList)
}

export const PersonalInfoQuestionController = {
  listAll,
}
