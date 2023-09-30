import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { usePutRequest, useTheme, useUsers } from "../hooks"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { Loading } from "./Loading"

interface HomeHeaderProps {
  onOpenFilter: () => void
}

interface Variables {
  userIds: string[]
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onOpenFilter }) => {
  const [{ users, maxLength, selectedItems }, { resetState }] = useUsers()
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [{ colors }] = useTheme()

  const { mutate, isLoading } = usePutRequest<any, Variables>(
    "/users/disable",
    {
      onSuccess: () => {
        resetState()
        setLoadingDelete(false)
      },
      onError: ({ response }) => {
        console.log(response.data.message)
      },
    }
  )

  const onDeleteAll = () => {
    setLoadingDelete(true)
    const userIds = users.map((item) => item.id)
    mutate({ userIds })
  }

  const onDelete = () => {
    mutate({ userIds: selectedItems })
  }

  return (
    <View style={styles.container}>
      {!!users.length && (
        <View style={styles.headerLine}>
          <Text bold>{`Total: ${maxLength}`}</Text>
          <Icon
            color={colors.textColor}
            name="filter-list"
            onPress={onOpenFilter}
          />
        </View>
      )}

      {
        <View style={styles.headerLine}>
          <Text>Deletar todos</Text>
          {loadingDelete ? (
            <View>
              <Loading size={24} />
            </View>
          ) : (
            <Icon
              color={colors.textColor}
              name="delete"
              onPress={onDeleteAll}
            />
          )}
        </View>
      }

      {!!selectedItems.length && !loadingDelete && (
        <View style={styles.headerLine}>
          <Text>{`Selecionados: ${selectedItems.length}`}</Text>
          {isLoading ? (
            <View>
              <Loading size={24} />
            </View>
          ) : (
            <Icon color={colors.textColor} name="delete" onPress={onDelete} />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.MD,
    paddingBottom: SPACING.SM,
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.XS,
  },
})
