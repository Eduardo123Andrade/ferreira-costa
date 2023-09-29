import fastify from "fastify"
import { errorHandler } from "./error/errorHandler"
import {
  personalInfoQuestionRouter,
  userRoutes,
  validateCodeRouter,
} from "./routers"

const app = fastify()

app.register(personalInfoQuestionRouter)
app.register(userRoutes)
app.register(validateCodeRouter)

app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(console.log)
