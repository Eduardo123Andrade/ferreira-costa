import { BadRequestError } from "../error/BadRequestError"
import { NotFoundError } from "../error/NotFoundError"
import { ValidateCode } from "../interfaces"
import prisma from "../lib/prisma"

const validate = async (data: ValidateCode) => {
  const user = await prisma.user.findFirst({
    where: {
      id: data.userId,
    },
  })

  if (!user) throw new NotFoundError("Users not found")

  const code = await prisma.validateCode.findFirst({
    where: {
      userId: data.userId,
      code: data.code,
    },
  })

  if (!code) throw new BadRequestError("Invalid code")
}

export const CodeValidationService = { validate }
