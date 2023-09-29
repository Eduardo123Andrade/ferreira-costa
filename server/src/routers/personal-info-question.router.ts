import { FastifyInstance } from "fastify"
import { PersonalInfoQuestionController } from "../controllers"

export const personalInfoQuestionRouter = async (app: FastifyInstance) => {
  app.get("/personal-info-question", PersonalInfoQuestionController.listAll)
}
