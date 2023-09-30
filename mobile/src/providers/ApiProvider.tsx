import React, { createContext, useMemo } from "react"
import Axios, { AxiosInstance } from "axios"

interface ApiContextType {
  API: AxiosInstance
}

export const ApiContext = createContext<ApiContextType>({} as ApiContextType)

interface ApiProvider {
  children: React.ReactNode
}

export const ApiProvider: React.FC<ApiProvider> = ({ children }) => {
  // const [{ user }] = useUser()
  const API = useMemo(
    () =>
      Axios.create({
        baseURL: "http://192.168.1.13:3333",
      }),
    []
  )

  // if (user?.token)
  // API.interceptors.request.use((config) => {
  // return config
  //   if (config.url !== "/auth/login" && config.url !== "/auth/sign-up") {
  //     config.headers["Authorization"] = `Bearer ${user.token}`
  //   }
  //   return config
  // })

  return <ApiContext.Provider children={children} value={{ API }} />
}
