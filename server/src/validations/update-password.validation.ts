import { z } from "zod"

export const validateUpdatePasswordSchemaBody = (data: unknown) => {
  const bodySchema = z.object({
    userId: z.string(),
    password: z.string().min(6),
  })

  const result = bodySchema.parse(data)

  return result
}
