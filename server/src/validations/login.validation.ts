import { z } from "zod"

export const validateLoginSchemaBody = (data: unknown) => {
  const bodySchema = z.object({
    login: z.string(),
    password: z.string().min(6),
  })

  return bodySchema.parse(data)
}
