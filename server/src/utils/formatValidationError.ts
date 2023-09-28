import { ZodIssue } from "zod";

interface CustomError {
  [key: string]: string
}

export const formatValidationError = (error: ZodIssue[]) => {
  const errors: CustomError = {};

  error
    .filter((err: ZodIssue) => !!err.path.length)
    .map((err: ZodIssue) => errors[err.path[0]] = err.message)

  return errors
}