import { UserValidationForm } from "interfaces"
import { useForm } from "./useForm"
import { FieldValidation, validateCPF, validateName } from "../validations"
import { validateLogin } from "../validations"

const { string, date } = FieldValidation

interface UseUserValidationFormProps {
  onSubmit: (data: UserValidationForm) => void
  initialValues?: UserValidationForm
}

const ACCESS_TOKEN_VALIDATION_SCHEMA = FieldValidation.object({
  name: string()
    .label("name")
    .required("Nome é obrigatório")
    .test("name", "Nome inválido", validateName),
  password: string()
    .min(6)
    .required("É preciso atender a todos os requisitos")
    .label("Senha"),
  cpf: string()
    .label("cpf")
    .required("CPF é obrigatório")
    .test("cpf", "CPF inválido", validateCPF),
  login: string()
    .label("login")
    .required("Login é obrigatório")
    .test("login", "Login inválido", validateLogin),
  motherName: string()
    .label("motherName")
    .required("Nome da mãe é obrigatório")
    .test("motherName", "Nome inválido", validateName),
  phone: string().length(11).required("Celular é obrigatório"),
  email: string().email("E-mail inválido").required("E-mail é obrigatório"),
  birthdate: date()
    .typeError("Digite uma data válida")
    .required("Data de nascimento é obrigatório"),
})

const INITIAL_VALUES: UserValidationForm = {
  name: "",
  password: "",
  cpf: "",
  login: "",
  motherName: "",
  phone: "",
  email: "",
  birthdate: undefined,
  status: "ACTIVE",
}

export const useUserValidationForm = ({
  onSubmit,
  initialValues = INITIAL_VALUES,
}: UseUserValidationFormProps) => {
  return useForm<UserValidationForm>({
    onSubmit,
    initialValues,
    validationSchema: ACCESS_TOKEN_VALIDATION_SCHEMA,
  })
}
