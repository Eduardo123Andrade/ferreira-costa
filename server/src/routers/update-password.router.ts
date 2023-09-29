import { FastifyInstance } from "fastify"
import { UpdatePasswordController } from "../controllers"

export const updatePasswordRoutes = async (app: FastifyInstance) => {
  app.put("/update-password", UpdatePasswordController.update)
}
