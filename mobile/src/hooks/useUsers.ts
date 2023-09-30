import { UserContext } from "../providers/UsersProvider"
import { useContext } from "react"

export const useUsers = () => {
  const context = useContext(UserContext)

  if (!context)
    throw new Error("This hook must be wrapped by UserProvider context")

  return context
}
