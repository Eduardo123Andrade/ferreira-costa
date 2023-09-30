import { UpdatePasswordForm } from "interfaces"
import { FieldValidation } from "../validations"
import { useForm } from "./useForm"
const { string } = FieldValidation

interface UseUpdatePasswordFormProps {
  onSubmit: (data: UpdatePasswordForm) => void
}

export const USER_LOGIN_VALIDATION_SCHEMA = FieldValidation.object({
  password: string()
    .min(6)
    .required("É preciso atender a todos os requisitos")
    .label("Senha"),
})

const INITIAL_VALUES: UpdatePasswordForm = {
  password: "",
}

export const useUpdatePassword = ({ onSubmit }: UseUpdatePasswordFormProps) => {
  return useForm<UpdatePasswordForm>({
    onSubmit,
    initialValues: INITIAL_VALUES,
    validationSchema: USER_LOGIN_VALIDATION_SCHEMA,
  })
}
