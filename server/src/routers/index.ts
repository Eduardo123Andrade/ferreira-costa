import { authenticationRouter } from "./authentication.router"
import { personalInfoQuestionRouter } from "./personal-info-question.router"
import { updatePasswordRoutes } from "./update-password.router"
import { userRoutes } from "./user.router"
import { validateCodeRouter } from "./validate-code.router"

import { FastifyInstance } from "fastify"

export const registerRouter = async (app: FastifyInstance) => {
  app.register(personalInfoQuestionRouter)
  app.register(userRoutes)
  app.register(validateCodeRouter)
  app.register(updatePasswordRoutes)
  app.register(authenticationRouter)
}
