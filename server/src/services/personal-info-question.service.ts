import { NotFoundError } from "../error/NotFoundError"
import { ValidateQuestionInterface } from "../interfaces"
import prisma from "../lib/prisma"
import { PersonalInfo } from "../types"
import { generateRandomNumber } from "../utils"

const getAll = async () => {
  return await prisma.personalInfoQuestion.findMany()
}

const findById = async (id: string) => {
  const personalInfoQuestion = await prisma.personalInfoQuestion.findFirst({
    where: { id },
  })

  if (!personalInfoQuestion) throw new NotFoundError("Question not found")

  return personalInfoQuestion
}

const validateQuestion = async (data: ValidateQuestionInterface) => {
  const personalInfoQuestion = await findById(data.id)

  const personalInfo = personalInfoQuestion.personalInfo as PersonalInfo

  const fields = {
    CPF: "cpf",
    EMAIL: "email",
    MOTHER_NAME: "motherName",
  }

  const field = fields[personalInfo]

  const user = await prisma.user.findFirst({
    where: {
      login: data.userLogin,
      [field]: {
        endsWith: data.answer,
      },
    },
  })

  if (!user) throw new NotFoundError("User not found")

  const randomNumber = generateRandomNumber()

  await prisma.validateCode.create({
    data: {
      userId: user.id,
      code: `${randomNumber}`,
    },
  })

  return { code: randomNumber, userId: user.id }
}

export const PersonalInfoQuestionService = {
  getAll,
  validateQuestion,
}
