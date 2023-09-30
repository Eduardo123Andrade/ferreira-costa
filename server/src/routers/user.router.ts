import { FastifyInstance } from "fastify"
import { UserController } from "../controllers/user.controller"

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/user/create", UserController.create)

  app.put("/users/disable", UserController.disable)

  app.put("/user/:userId", UserController.update)

  app.get("/users", UserController.get)
}
