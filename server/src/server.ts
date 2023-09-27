import fastify from "fastify"
import { userRoutes } from "./routers/user.router"
import { errorHandler } from "./error/errorHandler"

const app = fastify()

app.register(userRoutes)
app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(console.log)
