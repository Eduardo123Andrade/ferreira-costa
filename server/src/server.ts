import fastify from "fastify"
import { userRoutes } from "./routers/user.router"

const app = fastify()

app.register(userRoutes)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(console.log)
