import { z } from "zod"
import { validateCPF, validateEmail } from "../utils"
import { CreateUser } from "../interfaces/create-user"

function validateISODate(dateString: string) {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const validateCreateUserSchemaBody = (data: unknown): CreateUser => {
  const bodySchema = z.object({
    name: z.string(),
    login: z.string(),
    password: z.string().min(6),
    email: z.string().refine(validateEmail, "Invalid email"),
    phone: z.string().length(11),
    cpf: z.string().refine(validateCPF, "Invalid CPF"),
    birthdate: z.string().refine(validateISODate, "Invalid birthdate"),
    motherName: z.string(),
  })

  const result = bodySchema.parse(data)

  return result
}
