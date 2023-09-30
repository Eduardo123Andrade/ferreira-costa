import { UserValidationForm } from "interfaces"
import { useForm } from "./useForm"
import { FieldValidation } from "../validations"
import {
  USER_CREATE_VALIDATION_SCHEMA,
  USER_UPDATE_VALIDATION_SCHEMA,
} from "../validations/schemas"

interface UseUserValidationFormProps {
  onSubmit: (data: UserValidationForm) => void
  initialValues?: UserValidationForm
  isEdit: boolean
}

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
  isEdit,
  onSubmit,
  initialValues = INITIAL_VALUES,
}: UseUserValidationFormProps) => {
  return useForm<UserValidationForm>({
    onSubmit,
    initialValues,
    validationSchema: isEdit
      ? USER_UPDATE_VALIDATION_SCHEMA
      : USER_CREATE_VALIDATION_SCHEMA,
  })
}
