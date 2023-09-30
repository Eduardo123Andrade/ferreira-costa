import { RecoverPasswordContext } from "./../providers"
import { useContext } from "react"

export const useRecoverPassword = () => {
  const context = useContext(RecoverPasswordContext)

  if (!context) {
    throw new Error(
      "This hook must be wrapped by RecoverPasswordContext context"
    )
  }

  return context
}
