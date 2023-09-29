import { z } from "zod"

export const validateCodeValidationSchemaBody = (data: unknown) => {
  const bodySchema = z.object({
    code: z.string(),
    userLogin: z.string(),
  })

  const result = bodySchema.parse(data)

  return result
}
