import { z } from "zod"

export const validatePersonalInfoAnswerSchemaBody = (data: unknown) => {
  const bodySchema = z.object({
    id: z.string(),
    answer: z.string(),
  })

  const result = bodySchema.parse(data)

  return result
}
