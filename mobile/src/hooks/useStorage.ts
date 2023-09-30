import { StorageProviderContext } from "../providers"
import { useContext } from "react"

export const useStorage = () => {
  const context = useContext(StorageProviderContext)

  if (!context)
    throw new Error("This hooks needs be wrapped by StorageProvider")

  return context
}
