import { z } from "zod"

export const validateCodeValidationSchemaParams = (data: unknown) => {
  const bodySchema = z.object({
    code: z.string(),
    userId: z.string(),
  })

  const result = bodySchema.parse(data)

  return result
}
