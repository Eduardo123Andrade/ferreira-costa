import React, { createContext, useEffect, useState } from "react"
import { User } from "../interfaces/User.interface"
import { useGetRequest } from "../hooks/useGetRequest"
import { InputFilter } from "../interfaces/InputFilter.interface"
import { UserFilter } from "interfaces/UserFilter.interface"

interface UsersContextState {
  isLoading: boolean
  maxLength: number
  selectedItems: string[]
  selectedUser: User
  users: User[]
}

interface UsersContextActions {
  onNextPage: () => void
  onSelectItem: (id: string) => void
  onSelectUser: (user: User) => void
  resetState: () => void
  setFilter: (filter: InputFilter) => void
  unselectItem: (id: string) => void
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
  status: "ACTIVE",
}

export const UsersProvider: React.FC<UserProvider> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])
  const [maxLength, setMaxLength] = useState(Number.MAX_SAFE_INTEGER)
  const [filter, updateFilter] = useState<UserFilter>(INITIAL_VALUE)
  const [offset, setOffset] = useState(0)
  const [selectedItems, setSelectedItem] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()

  const { isLoading, refetch } = useGetRequest<UserResponse>(buildUrl(filter), {
    onSuccess: ({ data }) => {
      setMaxLength(data.count)
      if (!offset) {
        setUsers(data.users)
        setOffset(data.users.length)
        return
      }
      setUsers((prevState) => [...prevState, ...data.users])
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

  const onNextPage = () => {
    if (users.length < maxLength) {
      updateFilter({
        ...filter,
        offset,
      })
    }
  }

  const onSelectItem = (id: string) => {
    setSelectedItem((prevState) => [...prevState, id])
  }

  const unselectItem = (id: string) => {
    setSelectedItem((prevState) => prevState.filter((item) => item !== id))
  }

  const resetState = () => {
    setSelectedItem([])
    setOffset(0)
    updateFilter({
      ...INITIAL_VALUE,
      offset: 0,
    })
    refetch()
  }

  const onSelectUser = (user: User) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    const updatedUsers = users.map((item) => {
      return {
        ...item,
        selected: selectedItems.includes(item.id),
      }
    })
    setUsers(updatedUsers)
  }, [selectedItems])

  return (
    <UserContext.Provider
      children={children}
      value={[
        {
          isLoading,
          maxLength,
          selectedItems,
          selectedUser,
          users,
        },
        {
          onNextPage,
          onSelectItem,
          onSelectUser,
          resetState,
          setFilter,
          unselectItem,
        },
      ]}
    />
  )
}
