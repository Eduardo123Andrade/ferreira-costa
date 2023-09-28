import { z } from "zod"
import { validateCPF, validateEmail } from "../utils"
import { CreateUser } from "../interfaces/create-user"
import { UpdateUser } from "../interfaces/update-user"

function validateISODate(dateString: string) {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const validateUpdateUserSchemaBody = (data: unknown): UpdateUser => {
  const bodySchema = z.object({
    name: z.string(),
    login: z.string(),
    password: z.string().min(6),
    email: z.string().refine(validateEmail, "Invalid email"),
    phone: z.string().length(11),
    cpf: z.string().refine(validateCPF, "Invalid CPF"),
    birthdate: z.string().refine(validateISODate, "Invalid birthdate"),
    motherName: z.string(),
    status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]),
  })

  const result = bodySchema.parse(data)

  return result
}
