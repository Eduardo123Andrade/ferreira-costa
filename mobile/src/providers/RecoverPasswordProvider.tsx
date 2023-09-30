import React, { createContext, useState } from "react"

interface RecoverPasswordProviderState {
  code: number
  userId: string
}

interface RecoverPasswordProviderActions {
  setData: (data: RecoverPasswordProviderState) => void
}

type RecoverPasswordProviderData = [
  state: RecoverPasswordProviderState,
  actions: RecoverPasswordProviderActions
]

export const RecoverPasswordContext =
  createContext<RecoverPasswordProviderData>({} as RecoverPasswordProviderData)

interface RecoverPasswordProviderProps {
  children: React.ReactNode
}

export const RecoverPasswordProvider: React.FC<
  RecoverPasswordProviderProps
> = ({ children }) => {
  const [data, updateData] = useState<RecoverPasswordProviderState>()

  const setData = (data: RecoverPasswordProviderState) => {
    updateData(data)
  }

  return (
    <RecoverPasswordContext.Provider
      children={children}
      value={[
        {
          code: data?.code,
          userId: data?.userId,
        },
        { setData },
      ]}
    />
  )
}
