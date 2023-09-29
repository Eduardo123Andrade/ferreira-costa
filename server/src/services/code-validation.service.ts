import { BadRequestError } from "../error/BadRequestError"
import { NotFoundError } from "../error/NotFoundError"
import { ValidateCode } from "../interfaces"
import prisma from "../lib/prisma"

const validate = async (data: ValidateCode) => {
  const user = await prisma.user.findFirst({
    where: {
      login: {
        endsWith: data.userLogin,
      },
    },
  })

  if (!user) throw new NotFoundError("Users not found")

  const code = await prisma.validateCode.findFirst({
    where: {
      userId: user.id,
      code: data.code,
    },
  })

  if (!code) throw new BadRequestError("Invalid code")
}

export const CodeValidationService = { validate }
