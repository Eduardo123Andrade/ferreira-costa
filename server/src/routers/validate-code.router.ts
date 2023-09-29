import { FastifyInstance } from "fastify"
import { CodeValidationController } from "../controllers"

export const validateCodeRouter = async (app: FastifyInstance) => {
  app.get("/validate/:code/:userLogin", CodeValidationController.validate)
}
