import React, { createContext, useEffect, useState } from "react"
import { User } from "../interfaces/User.interface"
import { useGetRequest } from "../hooks/useGetRequest"
import { InputFilter } from "../interfaces/InputFilter.interface"
import { UserFilter } from "interfaces/UserFilter.interface"

interface UsersContextState {
  users: User[]
}

interface UsersContextActions {
  setFilter: (filter: InputFilter) => void
}

type UsersContextType = [state: UsersContextState, actions: UsersContextActions]

export const UserContext = createContext<UsersContextType>(
  {} as UsersContextType
)

interface UserProvider {
  children: React.ReactNode
}

interface UserResponse {
  count: number
  users: User[]
}

function buildUrl(requestParams: UserFilter) {
  let url = `/users`

  const params = Object.entries(requestParams)
    .map((paramArray) => {
      const [key, value] = paramArray
      if (!value) {
        return
      }
      return `${key}=${value}`
    })
    .filter((item) => item)
    .join("&")

  return url + (params ? `?${params}` : "")
}

const INITIAL_VALUE: UserFilter = {
  limit: 6,
}

export const UsersProvider: React.FC<UserProvider> = ({ children }) => {
  const [users, setUsers] = useState<User[]>()
  const [filter, updateFilter] = useState<UserFilter>(INITIAL_VALUE)
  const [offset, setOffset] = useState(0)

  console.log(buildUrl(filter))

  useGetRequest<UserResponse>(buildUrl(filter), {
    onSuccess: ({ data, request }) => {
      console.log(JSON.stringify({ URL: request.responseURL }, null, 2))
      setUsers(data.users)
      setOffset((prevState) => prevState + data.users.length)
    },
  })

  const setFilter = (filter: InputFilter) => {
    setOffset(0)
    updateFilter({
      ...filter,
      offset: 0,
      limit: 6,
    })
  }

  return (
    <UserContext.Provider
      children={children}
      value={[{ users }, { setFilter }]}
    />
  )
}
