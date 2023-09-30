import { validateLogin, validateName } from "../name"
import FieldValidation from "../FieldValidation"
import { validateCPF } from "../cpf"
const { string, date } = FieldValidation

export const USER_UPDATE_VALIDATION_SCHEMA = FieldValidation.object({
  name: string()
    .label("name")
    .required("Nome é obrigatório")
    .test("name", "Nome inválido", validateName),
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
