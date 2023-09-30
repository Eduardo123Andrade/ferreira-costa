import { BadRequestError } from "../error/BadRequestError"
import { Login } from "../interfaces"
import prisma from "../lib/prisma"
import { encoder } from "../utils"

const login = async (data: Login) => {
  const user = await prisma.user.findFirst({
    where: {
      login: { endsWith: data.login },
    },
  })

  if (!user) throw new BadRequestError("Invalid credentials")

  const validatePassword = await encoder.verifyPassword(
    data.password,
    user.password
  )

  if (!validatePassword) throw new BadRequestError("Invalid credentials")
}

export const AuthenticationService = {
  login,
}
