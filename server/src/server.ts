import fastify from "fastify"
import { errorHandler } from "./error/errorHandler"
import { registerRouter } from "./routers"

const app = fastify()

app.register(registerRouter)

app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(console.log)
