import { ApiContext } from "../providers/ApiProvider"
import { useContext } from "react"

export const useAPI = () => {
  const context = useContext(ApiContext)

  if (!context) {
    throw new Error("This hook must be wrapped by APIProvider context")
  }

  return context
}
