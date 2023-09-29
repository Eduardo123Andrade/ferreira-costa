import fastify from "fastify"
import { errorHandler } from "./error/errorHandler"
import {
  authenticationRouter,
  personalInfoQuestionRouter,
  updatePasswordRoutes,
  userRoutes,
  validateCodeRouter,
} from "./routers"

const app = fastify()

app.register(personalInfoQuestionRouter)
app.register(userRoutes)
app.register(validateCodeRouter)
app.register(updatePasswordRoutes)
app.register(authenticationRouter)

app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(console.log)
