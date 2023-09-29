import { FastifyInstance } from "fastify"
import { AuthenticationController } from "../controllers"

export const authenticationRouter = async (app: FastifyInstance) => {
  app.post("/login", AuthenticationController.login)
}
