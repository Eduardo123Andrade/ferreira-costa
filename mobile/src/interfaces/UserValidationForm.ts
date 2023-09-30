import { User } from "./User.interface"

export interface UserValidationForm extends Omit<User, "id" | "selected"> {
  password?: string
}
