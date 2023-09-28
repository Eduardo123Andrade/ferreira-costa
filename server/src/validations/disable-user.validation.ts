import { z } from "zod"

export const validateDisableUserSchemaBody = (data: unknown) => {
  const bodySchema = z.object({
    userIds: z.array(z.string()),
  })

  const result = bodySchema.parse(data)

  return result
}
