import prisma from "../lib/prisma"

const getAll = async () => {
  return await prisma.personalInfoQuestion.findMany()
}

export const PersonalInfoQuestionService = {
  getAll,
}
