import { UserValidationForm } from "interfaces"
import { useForm } from "./useForm"
import { FieldValidation, validateLogin } from "../validations"
import { LoginValidationForm } from "interfaces/LoginValidationForm"
const { string } = FieldValidation

interface UseUserValidationFormProps {
  onSubmit: (data: LoginValidationForm) => void
}

export const USER_LOGIN_VALIDATION_SCHEMA = FieldValidation.object({
  password: string()
    .min(6)
    .required("É preciso atender a todos os requisitos")
    .label("Senha"),
  login: string()
    .label("login")
    .required("Login é obrigatório")
    .test("login", "Login inválido", validateLogin),
})

const INITIAL_VALUES: LoginValidationForm = {
  login: "",
  password: "",
}

export const useLoginValidationForm = ({
  onSubmit,
}: UseUserValidationFormProps) => {
  return useForm<LoginValidationForm>({
    onSubmit,
    initialValues: INITIAL_VALUES,
    validationSchema: USER_LOGIN_VALIDATION_SCHEMA,
  })
}
