import { PersonalInfoQuestion } from "@prisma/client"

export const personalInfoQuestionView = (data: PersonalInfoQuestion) => {
  const { createdAt, updatedAt, ...rest } = data

  return rest
}
